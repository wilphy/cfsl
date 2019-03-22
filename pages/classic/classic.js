import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classicModel.getLatest((res) => {
      this.setData({
        classic: res
      })
    })
  },

  onLike: function(event) {
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id,
      this.data.classic.type)
  },

  onNext: function(event) {
    this._updateClassic('next')
  },

  onPrevious: function(event) {
    this._updateClassic('previous')
  },

  _updateClassic: function(nextOrPrevious) {
    const index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
      console.log(this.data.latest)
      console.log(this.data.first)
    })
  }
})