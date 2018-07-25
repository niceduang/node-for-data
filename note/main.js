let fs = require('fs')


// // 阻塞代码实例
// let data = fs.readFileSync('README.md')
// console.log(data.toString())
// console.log('程序执行结束')

// // 非阻塞代码实例
// fs.readFile('README.md',(err,data) => {
// 	if (err) {
// 		console.log(error(err))
// 		return
// 	}
// 	console.log(data.toString())
// })
// console.log('程序执行结束')


let People = require('./People.js')
let people = new People('laowang')
people.say()
