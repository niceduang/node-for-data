/**
 * 处理文件读写相关
 * 操作文件中的数据，只处理业务，不关心业务
 */
const fs = require('fs')

const dbpath = './db.json'
/**
 * 获取所有列表
 */
exports.find = (callback) => {
  fs.readFile(dbpath, 'utf8', (err, data) => {
    if (err) {
      return callback && callback(err)
    }
    callback && callback(null, JSON.parse(data).students)
  })
}
/**
 * 添加保存
 */
exports.save = (student, callback) => {
  fs.readFile(dbpath, 'utf8', (err, data) => {
    if (err) {
      return callback && callback(err)
    }
    let students = JSON.parse(data).students
    student.id = students[students.length - 1].id + 1
    student.time = new Date().toLocaleString()
    students.push(student)
    let fileData = JSON.stringify({ students})
    fs.writeFile(dbpath, fileData, (err) => {
      if (err) {
        return callback && callback(err)
      }
      callback(null)
    })
  })
}
/**
 * 编辑更新
 */
exports.edit = (student, callback) => {
  fs.readFile(dbpath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students

    let findStudent = students.find((item) => {
      return item.id === student.id
    })
    Object.assign(findStudent, student)

    let fileData = JSON.stringify({students})
    fs.writeFile(dbpath, fileData, (err) => {
      if (err) {
        return callback && callback(err)
      }
      callback(null)
    })
  })
}
/**
 * 删除
 */
