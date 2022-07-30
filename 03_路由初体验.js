const Koa = require("koa2")
const Router = require("koa-router")

const {host, port }  = require("./utils")
const app = new Koa()
const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = '首页数据'
})

router.get('/list', async (ctx) => {
  ctx.body = '列表数据'
})

// 添加路由与全部方法
app.use(router.routes(), router.allowedMethods());



app.listen(9000, () => {
  console.log(`Serve is running at ${host}:${port}`)
})
