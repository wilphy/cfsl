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
      observer: '_load_more'
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
    q: ''
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
    _load_more(){
      console.log(123123)
      const length = this.data.searchResult.length
      bookModel.search(length, this.data.q).then(res => {
        const tempResult = this.data.searchResult.concat(res.books)
        this.setData({
          searchResult: tempResult
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
      this.setData({
        searching: true
      })
      
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q).then(res => {
        this.setData({
          searchResult: res.books,
          q,
        })
        keywordModel.addToHistory(q)
      })
    }
  }
})