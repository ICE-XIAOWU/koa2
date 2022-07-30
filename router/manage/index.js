const Router = require("koa-router")
const router = new Router()

router.get("/", async (ctx) => {
  ctx.body = "管理系统数据"
})

router.get("/list", ctx => {
  ctx.body = '管理系统列表数据'
})

module.exports = router