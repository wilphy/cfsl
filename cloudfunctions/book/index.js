// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

const rp = require('request-promise')

const URL = "http://bl.7yue.pro/v1/"

const appkey = "RdshydjBvcYZhMZC"

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  const app = new TcbRouter({
    event
  })

  // 获取热门书籍
  app.router('getHotList', async (ctx, next) => {
    ctx.body = await rp({
      url: URL + "book/hot_list",
      qs: {
        appkey
      }
    }).then((res) => {
      return JSON.parse(res)
    })
  })

  // 
  app.router('getDetail(bid)', async (ctx, next) => {
    ctx.body = await rp({
      url: URL + `/book/${bid}/book-detail`,
      qs: {
        appkey
      }
    }).then((res) => {
      return JSON.parse(res)
    })
  })


  return app.serve()
}