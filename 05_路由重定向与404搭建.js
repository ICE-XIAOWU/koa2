const Koa = require("koa2")
const Router = require("koa-router")

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
router.redirect('/', '/manage');

// 添加路由与全部方法
app.use(router.routes(), router.allowedMethods());

// 监听端口
app.listen(port, () => {
  console.log(`Serve is running at ${host}:${port}`)
})
