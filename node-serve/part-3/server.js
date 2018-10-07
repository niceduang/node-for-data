const http = require('http');
const fs = require('fs');
const template = require('art-template');

let server = http.createServer();

server.on('request', (req, res) => {
    let url = req.url;
    console.log(`客户端发请求过来了,请求路径：${url}`);
    fs.readFile('./tpl.html', (err, data) => {
        if (err) {
            res.setHeader('Content-type', 'text/plain;charset=utf-8;');
            res.end(`请求文件失败，请稍后重试~`);
            return;
        }
        let html = template.render(data.toString(), {
            title: '学生统计',
            students: [
                {
                    name: 'A',
                    local: '河南',
                    class: 3
                },
                {
                    name: 'B',
                    local: '河北',
                    class: 5
                },
                {
                    name: 'C',
                    local: '湖北',
                    class: 6
                }
            ]
        });
        res.setHeader('Content-type', 'text/html;charset=utf-8;');
        res.end(html);
    });
});

server.listen(3000, () => {
    console.log(`服务器启动成功...`);
});