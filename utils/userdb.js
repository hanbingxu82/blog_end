/*
 * @Author: your name
 * @Date: 2021-03-17 10:36:05
 * @LastEditTime: 2021-03-17 15:23:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blogend/utils/userdb.js
 */
const db = require("./mysqldb");
let userList = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from user", (err, rows) => {
      console.log(rows);
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}; //显示全部 （select*）

let userSelect = (attributename, attribute) => {
  return new Promise((resolve, reject) => {
    db.query(`select * from user where ${attributename} = '${attribute}'`, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}; //查询一行（传参)
let userSelectWhere = (attributename, attribute) => {
    console.log(`select * from user where email = '${attributename.email}' and password = '${attributename.password}'`)
  return new Promise((resolve, reject) => {
    db.query(`select * from user where email = '${attributename.email}' and password = '${attributename.password}'`, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};//多条件

let userUpdate = (updateattributename) => {
  return new Promise((resolve, reject) => {
    db.query(`update user set username = '${updateattributename.username}' where email = '${updateattributename.email}'`, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}; //修改

let userInsert = (attributenames, attributes) => {
  const sql = [];

  attributes.forEach((element) => {
    sql.push("'" + element + "'");
  });
  return new Promise((resolve, reject) => {
    console.log(`insert into user (${attributenames},createTime,updateTime) values (${sql},'${new Date()}','${new Date()}')`);
    db.query(`insert into user (${attributenames},createTime,updateTime) values (${sql},'${new Date()}','${new Date()}')`, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}; //增加

exports.userList = userList;
exports.userSelect = userSelect;
exports.userUpdate = userUpdate;
exports.userInsert = userInsert;
exports.userSelectWhere = userSelectWhere
