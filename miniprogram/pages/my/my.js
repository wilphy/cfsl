import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: true,
    userInfo: null,
    myBooksCount: 0,
    classics: []
  },

  onLoad: function (options) {
    this.getMyFavor()
    this.hasGottenUserInfo()
    this.getMyBookCount()
    // wx.getUserInfo({
    //   success:data=>{
    //     console.log(data)
    //   }
    // })
  },

  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },


  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        myBooksCount: res.count
      })
    })

  },

  hasGottenUserInfo: function () {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              this.setData({
                hasUserInfo: true,
                userInfo: res.userInfo
              })
            }
          })
        } else {
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },

  // userAuthorized() {
  //   wx.getSetting({
  //     success: data => {
  //       if (data.authSetting['scope.userInfo']) {
  //         wx.getUserInfo({
  //           success: data => {
  //             this.setData({
  //               authorized: true,
  //               userInfo: data.userInfo
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })
  // },

  onGetUserInfo: function (event) {
    let userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
  }
})