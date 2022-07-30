const Router = require("koa-router")
const router = new Router()
const login = require("./src/login")
const register = require("./src/register")
const { query } = require('../../utils')


router.get("/", async  (ctx) => {
  // let result = await new Promise((resolve, reject) => {
  //   query(`SELECT * FROM user`, (err, rows) => {
  //     if(err) reject(err)
  //     resolve(rows)
  //   })
  // })
  ctx.body = 'web信息系统'
})

router.use("/login", login.routes(), login.allowedMethods());
router.use("/register", register.routes(), register.allowedMethods());

module.exports = router