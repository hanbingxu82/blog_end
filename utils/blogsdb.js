/*
 * @Author: your name
 * @Date: 2021-03-15 09:19:20
 * @LastEditTime: 2021-03-17 11:14:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blogend/utils/userdb.js
 */
const db = require('./mysqldb')
let blogList = () => {
  return new  Promise((resolve, reject) => {
    db.query('select * from blogs', (err, rows) => {
        console.log(rows)
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })
}//显示全部 （select*）

let select = (attributename, attribute) => {
  return new Promise((resolve, reject) => {
    db.query(`select * from blogs where ${attributename} = '${attribute}'`, (err, rows) => {
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })
}//查询一行（传参)

let update = (updateattributename, newdata,attributename,attribute) => {
  return new Promise((resolve, reject) => {
    db.query(`update blogs set ${updateattributename} = '${newdata}' where ${attributename} = '${attribute}'`,(err,rows) => {
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  }) 
}//修改

let insert = (attributenames, attributes) => {
  return new Promise((resolve, reject) => {
    db.query(`insert into blogs ${attributenames} values ${attributes}`, (err,rows) => {
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })
}//增加

exports.blogList = blogList
exports.select = select
exports.update =  update
exports.insert = insert