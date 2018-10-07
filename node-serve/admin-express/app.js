const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()

// 配置 .html 使用的解析引擎(官方给出的是 .art)
app.engine('html', require('express-art-template'))

// 配置视图路径 第一个参数 views 不能写错
// app.set('views', './view/')


// 配置post请求获取data,依赖中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// 开放访问
app.use('/public/', express.static('./public/'))

app.use(router)


app.listen(3000, () => {
    console.log('server start...')
})