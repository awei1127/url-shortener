const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const generateUrl = require('./generate_url')


const app = express()
const port = 3000

// 設定樣板引擎 setting template engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

// 使用body-parser(以在接下來能夠解析使用者送出的post request body)
app.use(express.urlencoded({ extended: true }))

// 設定每一筆請求都會先以 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 以下路由
// 首頁
app.get('/main/index', (req, res) => {
  generateUrl()
  res.render('index')
})

// 縮址請求
app.post('/main/index', (req, res) => {
  // 拿到使用者輸入的網址
  // 搜尋資料庫 如果已存在就取出隨機碼 如果不存在就產生一組隨機碼且與輸入的網址一起存入資料庫
  // 把使用者輸入的網址跟隨機碼傳入index頁面渲染
  generateUrl()
  res.render('index')
})


app.get('/:randomString', (req, res) => {
  // 去資料庫找資料 如果有就直接轉走 如果沒有就顯示沒找到的頁面
  generateUrl()
  res.render('notfound')
})


// 啟動並監聽伺服器
app.listen(port, () => {
  console.log(`App is litening on http://localhost:${port}/main/index`)
})