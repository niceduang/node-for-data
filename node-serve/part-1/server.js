const http = require('http');

let server = http.createServer();
server.on('request',(req,res)=>{
    let url = req.url;
    console.log(`客户端发请求过来了,请求路径：${url}`);
    // res.write(`hi duang`);
    // res.write(`=>nodejs`);
    // res.end();
    // plain html 
    res.setHeader('Content-type','text/plain;charset=utf-8');
    console.log(req.url);
    res.end(`hi duang=>nodejs,家`);
});

server.listen(3000,()=>{
    console.log(`服务器启动成功...`);
});