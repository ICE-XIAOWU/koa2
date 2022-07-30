const Koa = require("koa2")

const app = new Koa()

// 洋葱模型-中间件
// next 方法调用下一个中间件
app.use(async (ctx, next) => {
  ctx.body = "hello world"
  console.log(1)
  await next();
  console.log(2)
})

app.use(async (ctx, next) => {
  
  await next();
  console.log(3)
})

app.use(async (ctx, next) => {
  
  await next()
  console.log(4)
})

app.use(async (ctx, next) => {
  console.log(5)
})

// 1 5 4 3 2 

app.listen(9000, () => {
  console.log('Serve is running at Loaclhost:9000')
})
