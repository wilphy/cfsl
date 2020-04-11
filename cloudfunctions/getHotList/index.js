// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const rp = require('request-promise')

const URL = "http://bl.7yue.pro/v1/book/hot_list?appkey=RdshydjBvcYZhMZC"

// 云函数入口函数
exports.main = async (event, context) => {
  const hotList = await rp(URL).then((res) => {
    return JSON.parse(res)
  })

  return hotList
  console.log(hotList)
}