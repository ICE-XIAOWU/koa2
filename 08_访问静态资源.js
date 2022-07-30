const Koa = require("koa2")
const Router = require("koa-router")
const cors = require("koa2-cors")
const static = require("koa-static")
const path = require("path")

const app = new Koa()
const router = new Router()

const manage = require("./router/manage")
const web = require("./router/web")
const notFound = require("./router/not-found")
const {host, port }  = require("./utils")


// 添加子路由
router.use("/manage", manage.routes(), manage.allowedMethods())
router.use("/web", web.routes(), web.allowedMethods())
router.use("/404", notFound.routes(), notFound.allowedMethods())

// 路由重定向
// router.redirect('/', '/manage');

// 随意输入一个网址时，跳转到404
app.use(async (ctx, next) => {
  await next();
  // 如果状态为404，重定向到404页面
  if(parseInt(ctx.status) === 404) ctx.response.redirect("/404")
})

// 允许跨域，这里cors中间件一定要写在路由之前
app.use(cors());
// 添加路由与全部方法
app.use(router.routes(), router.allowedMethods());
// 读取静态资源 路径： http://127.0.0.1:9000/static
app.use(static(path.join(__dirname, "static")))

// 监听端口
app.listen(port, () => {
  console.log(`Serve is running at ${host}:${port}`)
})
