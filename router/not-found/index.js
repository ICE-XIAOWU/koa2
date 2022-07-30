const Router = require("koa-router")
const router = new Router()
const path = require('path')
const fs = require("fs")
const mime = require("mime-types")

router.get("/", async ctx => {
  // 拼接路径
  let filePath = path.join(__dirname, "../../static/images/1.png")
  // 查找文件np
  let file = fs.readFileSync(filePath)
  // 获取类型
  let mimeTypes =mime.lookup(file)
  // 设置返回类型
  ctx.set("content-type", mimeTypes)
  ctx.body = file

})

module.exports = router
