// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 UrlPair model
const UrlPair = require('../../models/urlPair')

// 前往縮網址
router.get('/:randomString', (req, res) => {
  // 取得使用者輸入的短網址5碼
  const randomString = req.params.randomString
  // 去資料庫找資料
  return UrlPair.findOne({ randomString: new RegExp(`^${randomString}$`) })
    .lean()
    .then(urlPair => {
      // 如果已存在就取出長網址前往
      if (urlPair) {
        res.redirect(urlPair.url)
        // 如果不存在就顯示沒找到的頁面
      } else {
        res.render('notfound')
      }
    }).catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router