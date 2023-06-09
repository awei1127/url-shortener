// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入路由模組：引入 main 模組程式碼
const main = require('./modules/main')

// 引入路由模組：引入 short 模組程式碼
const short = require('./modules/short')

// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/main/index', main)

// 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組 
router.use('/', short)

// 匯出路由器
module.exports = router