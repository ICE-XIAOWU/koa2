const Router = require("koa-router")
const router = new Router()
const {returnMessage, queryFn} = require("../../../utils")

router.post("/", async ctx => {
  let { username, password } = ctx.request.body
  console.log(ctx.request)
  if (username && password) {
    const sql = `SELECT * FROM user WHERE username='${username}'`
    const result = await queryFn(sql)
    
    if(result.length > 0) {
      ctx.body = returnMessage(400, '注册失败', "该用户已存在")
    } else {
      const createSql = `INSERT INTO user VALUES (null, '${username}', 
      '${password}', null, 'avatar.jpg')`
      const createResult = await queryFn(createSql)
      console.log(createResult)
      const newSql = `SELECT * FROM user WHERE id='${createResult.insertId}'`
      const newResult = await queryFn(newSql)
      ctx.body = returnMessage(200, "注册成功", newResult[0])
    }

  } else {
    ctx.body = returnMessage(401, "请求失败", "参数错误")
  }
})

module.exports = router