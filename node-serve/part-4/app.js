const http = require('http')
const fs = require('fs')
const url = require('url')
const template = require('art-template')

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

http
    .createServer((req, res) => {
        let parseUrl = url.parse(req.url, true);
        let pathName = parseUrl.pathname;
        if (pathName == '/') {
            fs.readFile('./view/index.html', (err, data) => {
                if (err) {
                    return res.end('404 Not Found!');
                }
                let htmlStr = template.render(data.toString(), {
                    title: '信息展示页',
                    contents
                });
                res.setHeader('Content-type', 'text/html;charset=utf-8;');
                res.end(htmlStr);
            });
        } else if (pathName == '/post') {
            fs.readFile('./view/post.html', (err, data) => {
                if (err) {
                    return res.end('404 Not Found!');
                }
                res.end(data);
            });
        } else if (pathName == '/discuss') {
            let content = parseUrl.query;
            content.time = new Date().toLocaleString();
            contents.push(content);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        } else if (pathName.indexOf('/public/') == 0) {// 统一处理public目录下的文件
            fs.readFile('.' + pathName, (err, data) => {
                if (err) {
                    return res.end('404 Not Found!');
                }
                res.end(data);
            });
        } else {
            fs.readFile('./view/404.html', (err, data) => {
                if (err) {
                    return res.end('404 Not Found!');
                }
                res.end(data);
            });
        }
    })
    .listen(3000, () => {
        console.log('running...');
    });