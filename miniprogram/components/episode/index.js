Component({
  properties: {
    index: {
      type: String,
      observer: function(newVal, oldVal, changedPath) {
        let val = newVal < 10 ? '0' + newVal : newVal
        console.log(val)
        this.setData({
          // 直接更改index的值将造成无限递归，内存泄漏，改用_index代替
          _index: val
        })
      }
    }
  },

  data: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    year: 0,
    month: '',
    _index: ''
  },

  attached: function() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()

    this.setData({
      year,
      month: this.data.months[month]
    })
  }
})