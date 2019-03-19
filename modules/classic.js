import {HTTP} from '../util/http.js'

class ClassicModule extends HTTP{
  getLatest(sCallback){
    this.request({
      url: 'classic/latest',
      success: (res) => {
        console.log(res)
        sCallback(res)
      }
    })
  }
}

export {ClassicModule}