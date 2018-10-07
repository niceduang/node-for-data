const http = require('http')
const fs = require('fs')
const url = require('url')
const template = require('art-template')

const contents = [
    {
        name: 'A',
        msg: 'AAA',
        time: '20080809'
    },
    {
        name: 'B',
        msg: 'BBB',
        time: '20080809'
    },
    {
        name: 'C',
        msg: 'CCC',
        time: '20080809'
    }
]

http
    .createServer((req, res) => {
        let url = req.url;
        if (url == '/') {
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
        } else if (url == '/post') {
            fs.readFile('./view/post.html', (err, data) => {
                if (err) {
                    return res.end('404 Not Found!');
                }
                res.end(data);
            });
        } else if (url.indexOf('/public/') == 0) {// 统一处理public目录下的文件
            fs.readFile('.' + url, (err, data) => {
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