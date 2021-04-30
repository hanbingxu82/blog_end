/*
 * @Author: your name
 * @Date: 2021-03-15 08:53:00
 * @LastEditTime: 2021-03-17 11:12:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blogend/app.js
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.all('*',function(req, res, next) {//处理跨域
	res.header("Access-Control-Allow-Origin","http://localhost:3000");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials",true);
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
	next();
})


// app.use(async (ctx, next) => {
//   // 开发环境设置，生产环境谨慎使用
//   ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");
//   ctx.set("Access-Control-Allow-Headers", "X-Requested-With");
//   ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
 
//   if (ctx.method == 'OPTIONS') {
//   ctx.body = '';
//   ctx.status = 200;
//   } else {
//   await next();
//   }
//  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
