// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
    },
    count: {
      type: Number,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 数据绑定
    // 三元表达式
    // 封装性 开放性
    // 封装在内部 ，开放出来的
    // 非常简单的功能   非常复杂的功能
    yesSrc: 'images/like.png',
    noSrc: 'images/dislike.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function (event) {
      // 自定义事件
      let like = this.properties.like
      let count = this.properties.count

      count = like ? count - 1 : count + 1
      this.setData({
        count: count,
        like: !like
      })
    }
  }
})
