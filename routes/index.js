/*
 * @Author: your name
 * @Date: 2021-03-15 08:53:00
 * @LastEditTime: 2021-03-18 16:00:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blogend/routes/index.js
 */
var express = require("express");
var router = express.Router();
const { blogList, select } = require("../utils/blogsdb");
const { messageList,messageAddList } = require("../utils/messagedb");
const { userList, userInsert, userUpdate, userSelect,userSelectWhere } = require("../utils/userdb");

var fs=require("fs");
var path = require("path")

function successMsg(result, msg, ok = true) {
  return {
    data: result,
    code: 200,
    msg: msg || "成功",
    ok: ok,
  };
}
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// 下载简历接口
router.get('/download', function (req, res, next) {
  var name = 'hbx.pdf';
  console.log(path.join(__dirname, '../public','pdf',name))
  var path1 = path.join(__dirname, '../public','pdf',name)
  var size = fs.statSync(path1).size;
  var f = fs.createReadStream(path1);
  res.writeHead(200, {
    'Content-Type': 'application/force-download',
    'Content-Disposition': 'attachment; filename=' + name,
    'Content-Length': size
  });
  f.pipe(res);
});
// 获取博客列表数据
router.get("/blogList", async (req, res, next) => {
  try {
    let result = await blogList();
    res.send(successMsg(result));
  } catch (e) {
    res.send(e);
  }
});
// 获取博客单条数据
router.get("/blogDetail", async (req, res, next) => {
  const { id } = req.query;
  try {
    let result = await select("id", id);
    res.send(successMsg(result[0]));
  } catch (e) {
    res.send(e);
  }
});
// 获取博客列表数据
router.post("/userDetail", async (req, res, next) => {
  const { email } = req.body;
  console.log(req.body);
  try {
    let result = await userSelect("email", email);
    if (result.length >= 1) {
      res.send(successMsg({}, "邮箱已被注册！", false));
    } else {
      res.send(successMsg({}, "尚未注册，可以使用！", true));
    }
  } catch (e) {
    res.send(e);
  }
});
// 获取留言列表
router.get("/msgList", async (req, res, next) => {
  try {
    let result = await messageList();
      res.send(successMsg(result));
  } catch (e) {
    res.send(e);
  }
});
// 获取留言新增接口
router.post("/addMsgList", async (req, res, next) => {
  try {
    const key = Object.keys(req.body)
    const value = []
    key.forEach(item=>{
      value.push(req.body[item])
    })
    let result = await messageAddList(key,value);
      res.send(successMsg(result));
  } catch (e) {
    res.send(e);
  }
});
// 登录接口
router.post("/userLogin", async (req, res, next) => {
  try {
    // islogin如果是true即为已经注册
    if (req.body.islogin) {
      let result = await userSelectWhere(req.body)
      if(result.length>=1){
        // 说明登陆成功  更改当前的用户名以及用户信息
        let up =  await userUpdate(req.body)
        if (up.affectedRows >= 1) {
          const row = await userSelect("email", req.body.email);
          res.send(successMsg(row[0],"登录成功！",true));
        }
      }else{
        // 说明登陆失败
        res.send(successMsg({}, "邮箱或密码错误", false));
      }
    } else {
      delete req.body.islogin
      const key = Object.keys(req.body)
      const value = []
      key.forEach(item=>{
        value.push(req.body[item])
      })
      let result = await userInsert(key, value);
      if (result.affectedRows >= 1) {
        const row = await userSelect("email", req.body.email);
        console.log(row);
        res.send(successMsg(row[0]),"注册并登录成功！",true);
      }
    }
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
