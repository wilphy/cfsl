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
    loading: false
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
      if (this.data.loading) {
        return
      }
      const length = this.data.searchResult.length
      this.data.loading = true //锁，资源已全部加载完，避免重复请求加载
      bookModel.search(length, this.data.q).then(res => {
        const tempResult = this.data.searchResult.concat(res.books)
        this.setData({
          searchResult: tempResult,
          loading: false // 解锁
        })
      })
    },

    onDelete(event) {
      this.setData({
        searching: false
      })
    },

    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },

    onConfirm(event) {
      this._showResult()
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q).then(res => {
        this.setData({
          searchResult: res.books,
          q,
        })
        keywordModel.addToHistory(q)
      })
    },

    _showResult(){
      this.setData({
        searching: true
      })
    }

  }
})