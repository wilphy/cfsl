import {
  KeywordModel
} from '../../models/keyword.js'

import {
  BookModel
} from '../../models/book.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searching: false,
    historyWord: [],
    hotWords: [],
    searchResult: [],
    q: '',
    loading: false, // 锁
    loadingCenter: false // 初始化加载
  },

  attached() {
    // const historyWords = keywordModel.getHistory()
    // const hotWords = keywordModel.getHot()
    this.setData({
      historyWords: keywordModel.getHistory()
      // historyWords
    })

    keywordModel.getHot().then((res) => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this._isLocked()) {
        return
      }
      const length = this.data.searchResult.length

      // 数据不需要更新到wxml中，所以直接赋值
      this._locked() // 上锁，资源已全部加载完，避免重复请求加载

      bookModel.search(length, this.data.q).then(res => {
        const tempResult = this.data.searchResult.concat(res.books)
        this.setData({
          searchResult: tempResult,
        })
        this._unLocked()
      }, () => {
        this._unLocked()
      })
    },

    _isLocked() {
      return this.data.loading ? true : false
    },

    _locked() {
      this.setData({
        loading: true
      })
    },

    _unLocked() {
      this.setData({
        loading: false
      })
    },

    onDelete(event) {
      this._closeResult()
    },

    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },

    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q).then(res => {
        if (res.total == 0) {
          wx.showToast({
            title: '搜索结果为空',
            icon: 'none'
          })
        }
        this.setData({
          searchResult: res.books,
          q,
        })
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }

  }
})