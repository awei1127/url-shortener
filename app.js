const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const generateUrl = require('./generate_url')
const UrlPair = require('./models/urlPair')   // 引用 UrlPair model

const app = express()
const port = 3000

require('./config/mongoose')

// 設定樣板引擎 setting template engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

// 使用body-parser(以在接下來能夠解析使用者送出的post request body)
app.use(express.urlencoded({ extended: true }))

// 設定靜態檔案資料夾
app.use(express.static('public'))

// 設定每一筆請求都會先以 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 以下路由
// 首頁
app.get('/main/index', (req, res) => {
  res.render('index')
})

// 縮址請求
app.post('/main/index', (req, res) => {
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
        res.render('index', { randomString: urlPair.randomString })
        // 如果不存在就產生一組隨機碼渲染 且與輸入的網址一起存入資料庫
      } else {
        const randomString = generateUrl()
        res.render('index', { randomString })
        return UrlPair.create({ url, randomString })
      }
    }).catch(error => console.log(error))
})

app.get('/:randomString', (req, res) => {
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

// 啟動並監聽伺服器
app.listen(port, () => {
  console.log(`App is litening on http://localhost:${port}/main/index`)
})