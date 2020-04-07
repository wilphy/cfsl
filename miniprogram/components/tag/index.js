Component({
  options: {
    multipleSlots: true, //启用插槽
  },

  externalClasses: ['tag-class'],

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