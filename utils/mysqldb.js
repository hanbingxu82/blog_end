/*
 * @Author: your name
 * @Date: 2021-03-15 09:05:47
 * @LastEditTime: 2021-03-15 09:17:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blogend/utils/mysqldb.js
 */
var mysql = require("mysql")
var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"blog"
})//数据库连接配置

function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows)
            connection.release()
        })
    })
}//对数据库进行增删改查操作的基础

exports.query = query