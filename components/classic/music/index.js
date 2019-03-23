import {
  classicBeh
} from '../classic-beh.js'


Component({

  behaviors: [classicBeh],

  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },
  properties: {
    src: String
  },
  methods: {
    onPlay: function(event) {
      //切换播放/暂停图标
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
      } else {
        this.setData({
          playing: false
        })
      }
    }
  }
})