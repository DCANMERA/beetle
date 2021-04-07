/**
 * @module 服务器主入口
 * @author : 叶宏威
 * @since : 创建时间  2021-02-12
 * */

// 保存index.js的绝对路径, 方便在其他文件使用绝对路径
// global: nodejs全局变量对象
// 使用全局变量时，可以省略global
// 比如 global.a = 1 访问全局变量a时,可以这样
global.__basename = __dirname

// 导入express
let express = require('express')

// 导入body-parser
let bodyParser = require('body-parser')

// 导入config.js
global.config = require(__basename + '/config/config.js')

// 导出connect.js, 连接mysql数据库
global.sequelize = require(__basename + '/db/connect.js')

// 导入model.js ==> 所有模型, 全局挂载model，以便后面操作数据
global.model = require(__basename + '/db/model/model.js')

// 导入路由
let routes = require(__basename + '/routes/routes.js')

// 创建实例
let app = express()

// 设置静态目录
app.use(config.filePathOptions.falsePath, express.static(__basename + config.filePathOptions.imgPath))


// 解析post请求体
// 将post请求参数解析为json
// limit限制解析post请求体大小 5MB
app.use(bodyParser.json({
  limit: 5 * 1024 + 'kb'
}))

// extended：false接收任何数据格式, true接收字符串或者数组
app.use(bodyParser.urlencoded({
  extended: false,
  limit: 5 * 1024 + 'kb'
}))

// 设置CORS, 跨域处理
// CORS 跨域资源共享
// app.all(*)表示所有请求路径必须经过
app.all('*', (req, res, next) => {

  // 允许跨域地址
  // res.header('Access-Control-Allow-Origin', '跨域地址')

  // *表示允许所有域请求, 但是不允许跨域携带cookie, 在实际开发中，一般指定允许某个域请求，如上面设置
  // res.header('Access-Control-Allow-Origin', '*')

  // 动态允许域名请求，这样可以允许跨域携带cookie
  res.header('Access-Control-Allow-Origin', req.headers.origin)

  // 如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,token')

  // 该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')

  // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可
  res.header('Access-Control-Allow-Credentials', true)

  // 将请求传递给下一个中间件或者路由
  next()
})

// 加载所有路由
routes(app)

// 监听端口
app.listen(config.serverOptions.port, () => { })
