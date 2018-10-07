const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const template = require('art-template')

const app = express()

// 配置 .html 使用的解析引擎(官方给出的是 .art)
app.engine('html', require('express-art-template'))

// 配置视图路径 第一个参数 views 不能写错
app.set('views', './view/')


// 配置post请求获取data,依赖中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// 开放访问
app.use('/public/', express.static('./public/'))

const contents = [
    {
        name: 'A',
        msg: 'AAA',
        time: '2016-10-6 16:51:08'
    },
    {
        name: 'B',
        msg: 'BBB',
        time: '2016-10-6 16:51:08'
    },
    {
        name: 'C',
        msg: 'CCC',
        time: '2016-10-6 16:51:08'
    }
]

app
    .get('/login', (req, res) => {
        // express 默认会去项目中的 views 目录找
        res.render('login.html')
    })
    .post('/login', (req, res) => {
        console.log(req.body)
        res.send(`欢迎您，${req.body.uname}`)
    })
    .get('/', (req, res) => {
        // fs.readFile('./view/index.html', (err, data) => {
        //     if (err) {
        //         return res.send('404 Not Found!')
        //     }
        //     let strHtml = template.render(data.toString(), {
        //         contents
        //     })
        //     res.send(strHtml)
        // })
        res.render('index.html', { contents }, (err, data) => {
            if (err) {
                return res.send('404 Not Found!')
            }
            res.send(data)
        })
    })
    .get('/post', (req, res) => {
        res.render('post.html', {}, (err, data) => {
            if (err) {
                return res.send('404 Not Found!')
            }
            res.send(data)
        })
    })
    .get('/discuss', (req, res) => {
        console.log(req.query)
        let content = req.query;
        content.time = new Date().toLocaleString()
        contents.push(content)
        // res.statusCode = 302;
        // res.setHeader('Location', '/')
        // res.send()
        res.redirect(302, '/')
    })

    .listen(3000, () => {
        console.log('server start...')
    })