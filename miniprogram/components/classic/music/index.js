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

  attached: function (event) {
    this._recoverStatus()
    this._monitorSwitch()
  },

  detached: function (event) {
    // mMgr.stop()
  },

  properties: {
    src: String,
    title: String
  },

  methods: {
    onPlay: function (event) {
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
    },

    _recoverStatus: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})