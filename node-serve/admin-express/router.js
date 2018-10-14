// const fs = require('fs')
const express = require('express')
const router = express.Router()
// const template = require('art-template')
const dbHandle = require('./db-handle')

router.get('/', (req, res) => {
  // let students
  // fs.readFile('./db.json', 'utf8', (err, data) => {
  //     if (err) {
  //         return res.status(500).send('Server error.')
  //     }
  //     console.log(JSON.parse(data))
  //     students = JSON.parse(data).students
  //     res.render('index.html', { title: '学生后台管理', students }, (err, data) => {
  //         if (err) {
  //             return res.send('404 Not Found!')
  //         }
  //         res.send(data)
  //     })
  // })

  dbHandle.find((err, students) => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('index.html', {title: '学生后台管理', students}, (err, data) => {
      if (err) {
        return res.send('404 Not Found!')
      }
      res.send(data)
    })
  })
})
router.get('/add', (req, res) => {
  console.log(req.query)
  res.render('add.html', { title: '学生后台管理-添加成员' }, (err, data) => {
    if (err) {
      return res.send('404 Not Found!')
    }
    res.send(data)
  })
})
router.post('/add', (req, res) => {
  console.log(req.body)
  let student = req.body
  dbHandle.save(student, (err) => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    console.log('存储成功')
    res.redirect(302, '/')
  // res.send(student)
  })
})
router.post('/', (req, res) => {
  res.send('post ok')
})

module.exports = router
