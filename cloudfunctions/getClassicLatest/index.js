// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const rp = require('request-promise')

const URL = "http://bl.7yue.pro/v1/classic/latest?appkey=RdshydjBvcYZhMZC"

// 云函数入口函数
exports.main = async (event, context) => {
  const latest = await rp(URL).then((res) => {
    return JSON.parse(res)
  })

  return latest
  console.log(latest)
}