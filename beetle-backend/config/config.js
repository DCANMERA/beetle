/**
 * @module 基础配置
 * @author : 叶宏威
 * @since : 创建时间  2021-02-12
 * */

/**
 * @description 服务器配置
 */
exports.serverOptions = {
  host: 'http://127.0.0.1', // 本地开发
  port: 10001, // 端口 10001

  // host: '服务器地址', // 阿里云服务器
  // port: 3000, // 端口 3000

  baseUrl: '/static/file/' // 伪造路径
}

/**
 * @description 随机昵称
 */
exports.nickNameOptions = [
  '彩虹',
  '白云',
  '森林',
  '蓝天',
  '大海',
  '领悟',
  '实诚',
  '飞鸟',
  '老鹰',
  '白兔',
  '绿竹'
]

/**
 * @description 加盐配置, 用于加强加密
 */
exports.saltOptions = {
  pwd: '?pwd_' // 密码加盐
}

/**
 * @description 数据库配置
 */
exports.mysqlOptions = {
  database: 'server_db', // 数据库名称
  username: 'root', // 用户名
  password: 'root', // 登录密码
  host: 'localhost', // 数据库地址
  dialect: 'mysql', // 数据库类型
  timezone: '+08:00', // 时区
  underscored: true, // 字段以_命名
  forceRemove: false // 是否强制删除表
}

/**
 * @description 邮件配置, 验证码
 */
exports.emailOptions = {
  host: 'smtp.qq.com', // 邮件服务器地址
  port: 465, // 端口, 25端口在阿里云服务器被禁止的, 建议使用465
  secure: true, // 如果端口为465, 此项需要设置true, 其他端口需要修改为false
  user: '3253325407@qq.com', // 用户名，发件地址
  pass: 'pjjrtfpgnxspchfj', // 邮箱授权码
  expires: 5 * 60 * 1000 // 验证码有效时间, 单位：毫秒
}

/**
 * @description 允许请求(白名单)
 */
exports.hostOptions = [
  'http://127.0.0.1:3000',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:8081',
  'http://127.0.0.1:8082',
  'http://127.0.0.1:9000',
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:8082',
  'http://localhost:9000'
]

/**
 * @description 验证验证码请求路径
 */
exports.codeUrlOptions = [
  '/register'
]

/**
 * @description token配置
 */
exports.tokenOptions = {
  salt: '_t_k', // token加盐
  expires: '1d', // 有效时间
  tokenUrls: [
    '/getUserInfo',
    '/postProduct',
    '/search',
    '/count',
    '/updown',
    '/probyid',
    '/updateProduct',
    '/remove',
    '/like',
    '/removeLike',
    '/findLike',
    '/likeCount',
    '/addShopcart',
    '/removeShopcart',
    '/shopcartProducts',
    '/shopcartCount',
  ] // 需要验证token的请求路径
}

/**
 * @description 文件存放配置
 */
exports.filePathOptions = {
  falsePath: '/static/file', // 伪路径
  imgPath: '/upload', // 图片存储路径
}
