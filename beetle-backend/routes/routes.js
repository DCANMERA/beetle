/**
 * @module 路由
 * @author : 叶宏威
 * @since : 创建时间  2021-02-12
 * */

// 导入路由控制器
let routesController = require(__basename + '/routes_controller/routes_controller.js')

// 导出路由函数
module.exports = app => {

  // 请求域拦截(白名单)
  app.use(routesController.verfiyHost)

  // 验证码拦截(白名单)
  app.use(routesController.verifyCode)

  // 验证登录(白名单)
  app.use(routesController.verifyToken)

  // 登录
  app.post('/login', routesController.login)

  // 注册接口
  app.post('/register', routesController.register)

  // 发邮件
  app.post('/email', routesController.email)

  // 验证码校正
  app.post('/jadgeCode', routesController.jadgeCode)

  // 获取用户信息
  app.get('/getUserInfo', routesController.getUserInfo)

  // 获取用户信息
  app.get('/getUserInfoForEmail', routesController.getUserInfoForEmail)

  // 更新用户信息
  app.post('/updateUserInfo', routesController.updateUserInfo)

  // 获取商品类型
  app.get('/type', routesController.getTypeData)

  // 发布商品
  app.post('/postProduct', routesController.postProduct)

  // 搜索商品
  app.get('/search', routesController.search)

  // 查询商品数目
  app.get('/count', routesController.count)

  // 上下架
  app.post('/updown', routesController.updownself)

  // 根据商品pid查询商品信息
  app.get('/probyid', routesController.getProductById)

  // 更新商品数据
  app.post('/updateProduct', routesController.updateProduct)

  // 删除商品
  app.post('/remove', routesController.remove)

  // 查询客户端首页的推荐商品
  app.get('/clientHomeProduct', routesController.clientHomeProduct)

  // 查询首页类别数据
  app.get('/category', routesController.category)

  // 搜索商品
  app.get('/clientSearch', routesController.clientSearch)

  // 客户端根据商品pid查询商品详情信息
  app.get('/productDetail', routesController.productDetail)

  // 收藏商品
  app.post('/like', routesController.like)

  // 删除收藏商品
  app.post('/removeLike', routesController.removeLike)

  // 查询指定商品是否已收藏
  app.get('/findLike', routesController.findLike)

  // 收藏商品记录数
  app.get('/likeCount', routesController.likeCount)

  // 加入购物车
  app.post('/addShopcart', routesController.addShopcart)

  // 删除购物车商品
  app.post('/removeShopcart', routesController.removeShopcart)

  // 查询购物车商品
  app.get('/shopcartProducts', routesController.shopcartProducts)

  // 查询购物车记录数
  app.get('/shopcartCount', routesController.shopcartCount)

}
