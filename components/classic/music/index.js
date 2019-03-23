import {
  classicBeh
} from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({

  behaviors: [classicBeh],

  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },
  properties: {
    src: String,
    title: String
  },
  methods: {
    onPlay: function(event) {
      //切换播放/暂停图标
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    }
  }
})