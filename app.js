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
app.get('/', (req, res) => {
  generateUrl()
  res.render('index')
})

// 啟動並監聽伺服器
app.listen(port, () => {
  console.log(`App is litening on http://localhost:${port}`)
})