# nodejs-note

### 关于版本原则
> 语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。


> - 如果只是修复bug，需要更新Z位。
> - 如果是新增了功能，但是向下兼容，需要更新Y位。
> - 如果有大变动，向下不兼容，需要更新X位。



### Node.js 回调函数
> - Node.js 异步编程的直接体现就是回调。
> - 异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了。
> - 回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数。
> - 例如，我们可以一边读取文件，一边执行其他命令，在文件读取完成后，我们将文件内容作为回调函数的参数返回。这样在执行代码时就没有阻塞或等待文件 I/O 操作。这就大大提高了 Node.js 的性能，可以处理大量的并发请求。

```
// 阻塞代码实例
let fs = require('fs')
let data = fs.readFileSync('README.md')
console.log(data.toString())
console.log('程序执行结束')


// 非阻塞代码实例
let fs = require('fs')
fs.readFile('README.md',(err,data) => {
    if (err) {
        console.log(error(err))
        return
    }
    console.log(data.toString())
})
console.log('程序执行结束')
```

> 阻塞是按顺序执行的，而非阻塞是不需要按顺序的，所以如果需要处理回调函数的参数，我们就需要写在回调函数内。

### Node.js 事件循环
> Node.js 是单进程单线程应用程序，但是因为 V8 引擎提供的异步执行回调接口，通过这些接口可以处理大量的并发，所以性能非常高。

### Node.js Buffer(缓冲区)
> JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。

> 但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。