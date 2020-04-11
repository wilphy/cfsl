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

  // 获取最新期刊
  app.router('getClassicLatest', async (ctx, next) => {
    ctx.body = await rp({
      url: URL + "classic/latest",
      qs: {
        appkey
      }
    }).then((res) => {
      return JSON.parse(res)
    })
  })


  return app.serve()

}