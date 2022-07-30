const Router = require("koa-router")
const router = new Router()
const jwt = require("jsonwebtoken")
const {queryFn, returnMessage} = require("../../../utils")

router.post("/", async ctx => {
  const { username, password } = ctx.request.body
  const token = jwt.sign(
    {username, password},
    'iuce',
    {expiresIn: '1h'}
  )

  //  判断参数是否正确
  if(username && password) {
    const selectSql = `SELECT * FROM user WHERE username='${username}'`
    const selectResult = await queryFn(selectSql)
    // 判断数据库中是否存在该用户
    if(selectResult.length > 0) {
      // 设置用户token
      const updateSal = `UPDATE user SET token='${token}' WHERE username='${username}'`
      await queryFn(updateSal);
      // 重新查询用户
      const selectResult1 = await queryFn(selectSql)
      ctx.body = returnMessage(200, "登录成功", selectResult1[0])
    } else {
      ctx.body = returnMessage(400, "用户未注册")
    }
  } else {
    ctx.body = returnMessage(401, "参数错误")
  }

})

module.exports = router