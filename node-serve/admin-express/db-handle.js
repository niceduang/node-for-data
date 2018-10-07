/**
 * 处理文件读写相关
 * 操作文件中的数据，只处理业务，不关心业务
 */
const fs = require('fs')

const dbPath = './db.json'
/**
 * 获取所有列表
 */
exports.find = (callback)=>{
    fs.readFile(dbPath,'utf8',(err,data)=>{
        if (err) {
            callback && callback(err)
        }
        callback && callback(null,JSON.parse(data).students)
    })
}
/**
 * 添加保存
 */
/**
 * 更新
 */
/**
 * 删除
 */
