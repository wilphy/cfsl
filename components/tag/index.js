Component({
  options: {
    multipleSlots: true,
  },

  properties: {
    text: String
  },

  data: {},

  methods: {
    onTap(event) {
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    }
  }
})