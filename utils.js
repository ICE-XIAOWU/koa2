const mysql = require('mysql')

// 开发环境
let host =  "http://127.0.0.1";
let port = 9000

// 生产环境
// let host =  "http://127.0.0.1";
// let port = 9000

const pool = mysql.createPool({
  host: 'localhost', // 连接的服务器(代码托管到线上后，需改为内网IP，而非外网)
  port: 3306, // mysql服务运行的端口
  database: 'cms', // 选择的库
  user: 'root', // 用户名
  password: '123456' // 用户密码   
})

//对数据库进行增删改查操作的基础
function query(sql,callback){
  pool.getConnection(function(err,connection){
      connection.query(sql, function (err,rows) {
          callback(err,rows)
          connection.release()
      })
  })
}

// 返回函数
const returnMessage = (code = 0, messsage = "", data = [] ) => ({code, messsage, data})

// 数据库函数封装
const queryFn = (sql) => {
  return new Promise((resolve, reject) => {
    query(sql, (err, rows) => {
      if(err) reject(err)
      resolve(rows)
    })
  })
}


module.exports = {
  host, 
  port, 
  query,
  queryFn,
  returnMessage
}