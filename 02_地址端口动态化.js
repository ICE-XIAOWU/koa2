const Koa = require("koa2")
const {host, port }  = require("./utils")
const app = new Koa()


// 洋葱模型-中间件
// next 方法调用下一个中间件
app.use(async (ctx, next) => {
  ctx.body = "hello world"
  console.log(1)
  await next();
  console.log(2)
})

app.listen(9000, () => {
  console.log(`Serve is running at ${host}:${port}`)
})
