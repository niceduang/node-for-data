const http = require('http');
const fs = require('fs');

let server = http.createServer();
server.on('request', (req, res) => {
    let url = req.url;
    console.log(`客户端发请求过来了,请求路径：${url}`);
    if (url == '/index') {
        fs.readFile('./src/index.html', (err, data) => {
            if (err) {
                res.setHeader('Content-type', 'text/plain;charset=utf-8');
                res.end(`请求文件失败，请稍后重试~`);
                return;
            }
            res.setHeader('Content-type', 'text/html;charset=utf-8');
            // res.end(data.toString());
            res.end(data);
        });
    } else if (url == '/pic') {
        fs.readFile('./src/pic.jpg', (err, data) => {
            if (err) {
                res.setHeader('Content-type', 'text/plain;charset=utf-8');
                res.end(`请求文件失败，请稍后重试~`);
                return;
            }
            res.setHeader('Content-type', 'image/jpeg');
            res.end(data);
        });
    }
    else {
        res.setHeader('Content-type', 'text/html;charset=utf-8');
        res.end(`请求路径：${url}`);
    }
});

server.listen(3000, () => {
    console.log(`服务器启动成功...`);
});