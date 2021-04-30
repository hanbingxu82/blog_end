/*
 * @Author: your name
 * @Date: 2021-03-17 10:36:05
 * @LastEditTime: 2021-03-18 10:53:31
 * @LastEditors: Please set LastEditors
 * @Description: In message Settings Edit
 * @FilePath: /blogend/utils/messagedb.js
 */
const db = require("./mysqldb");
let messageList = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from message ORDER BY id desc", (err, rows) => {
      console.log(rows);
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}; //显示全部 （select*）

let messageSelect = (attributename, attribute) => {
  return new Promise((resolve, reject) => {
    db.query(`select * from message where ${attributename} = '${attribute}'`, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}; //查询一行（传参)
let messageSelectWhere = (attributename, attribute) => {
    console.log(`select * from message where email = '${attributename.email}' and password = '${attributename.password}'`)
  return new Promise((resolve, reject) => {
    db.query(`select * from message where email = '${attributename.email}' and password = '${attributename.password}'`, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};//多条件

let messageUpdate = (updateattributename) => {
  return new Promise((resolve, reject) => {
    db.query(`update message set messagename = '${updateattributename.messagename}' where email = '${updateattributename.email}'`, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}; //修改

let messageAddList = (attributenames, attributes) => {
  const sql = [];

  attributes.forEach((element) => {
    sql.push("'" + element + "'");
  });
  return new Promise((resolve, reject) => {
    console.log(`insert into message (${attributenames},createTime,updateTime) values (${sql},'${new Date()}','${new Date()}')`);
    db.query(`insert into message (${attributenames},createTime,updateTime) values (${sql},'${new Date()}','${new Date()}')`, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}; //增加

exports.messageList = messageList;
exports.messageSelect = messageSelect;
exports.messageUpdate = messageUpdate;
exports.messageAddList = messageAddList;
exports.messageSelectWhere = messageSelectWhere
