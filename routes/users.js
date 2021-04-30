/*
 * @Author: your name
 * @Date: 2021-03-15 08:53:00
 * @LastEditTime: 2021-03-15 09:33:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Ed
 * @FilePath: /blogend/routes/users.js
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('我是用户登录');
});

module.exports = router;
