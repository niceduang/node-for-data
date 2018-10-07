const fs = require('fs')
const template = require('art-template')
const express = require('express')

const app = express()

// 指定 .html 使用的解析引擎(官方给出的是 .art)
app.engine('html', require('express-art-template'))

// 第一个参数 views 不能写错
app.set('views', './view/')

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



// 开放访问
app.use('/public/', express.static('./public/'))


app
    .get('/login', (req, res) => {
        // express 默认会去项目中的 views 目录找
        res.render('login.html')
    })
    .get('/', (req, res) => {
        fs.readFile('./view/index.html', (err, data) => {
            if (err) {
                return res.send('404 Not Found!')
            }
            let strHtml = template.render(data.toString(), {
                contents
            })
            res.send(strHtml)
        })
    })
    .get('/post', (req, res) => {
        fs.readFile('./view/post.html', (err, data) => {
            if (err) {
                return res.send('404 Not Found!')
            }
            res.send(data.toString())
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
        res.redirect(302, '/');
    })

    .listen(3000, () => {
        console.log('server start...')
    })