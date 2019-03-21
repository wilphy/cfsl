Component({
  properties: {
    title: String,
    first: Boolean,
    lateset: Boolean
  },

  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle.dis@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  methods: {
    onLeft: function(event) {
      if (!this.properties.lateset) {
        this.triggerEvent('left', {}, {})
      }
    },

    onRight: function(event) {
      if (!this.properties.first) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
})