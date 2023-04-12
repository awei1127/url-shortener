// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 UrlPair model
const UrlPair = require('../../models/urlPair')

// 引用 generateUrl
const generateUrl = require('../../generate_url')

// 首頁
router.get('/', (req, res) => {
  res.render('index')
})

// 縮址請求
router.post('/', (req, res) => {
  // 拿到使用者輸入的網址
  const url = req.body.url
  // 第二道防線：若使用者用開發者工具把HTML的input的require屬性拿掉後按下了送出鈕，則顯示提示
  if (url.length === 0) {
    res.render('index', { errorMsg: '請不要玩開發者工具' })
    return
  }
  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓規格：輸入相同網址時，產生一樣的縮址。↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  // 搜尋資料庫 回傳找到的第一筆資料 該資料的url完全符合使用者輸入的網址
  return UrlPair.findOne({ url: new RegExp(`^${url}$`) })
    .lean()
    .then(urlPair => {
      // 如果已存在就取出隨機碼渲染
      if (urlPair) {
        res.render('index', { randomString: urlPair.randomString, url })
        // 如果不存在就產生一組隨機碼渲染 且與輸入的網址一起存入資料庫
      } else {
        const randomString = generateUrl()
        res.render('index', { randomString, url })
        return UrlPair.create({ url, randomString })
      }
    }).catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router