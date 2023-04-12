const express = require('express')
const { engine } = require('express-handlebars')
const routes = require('./routes')

const app = express()
const port = 3000

//Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數。
require('./config/mongoose')

// 設定樣板引擎 setting template engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

// 使用body-parser(以在接下來能夠解析使用者送出的post request body)(所以一定要放在路由前面)
app.use(express.urlencoded({ extended: true }))

// 引入路由
app.use(routes)

// 設定靜態檔案資料夾
app.use(express.static('public'))

// 啟動並監聽伺服器
app.listen(port, () => {
  console.log(`App is litening on http://localhost:${port}/main/index`)
})