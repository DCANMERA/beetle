/**
 * @module 收集所有模型
 * @author : 叶宏威
 * @since : 创建时间  2021-02-12
 * */

/******************************* 商家端模型 ************************************/

// 导入用户模型
let User = require(__basename + '/db/model/user.js')

// 导入验证码模型
let Code = require(__basename + '/db/model/code.js')

// 导入商品类型模型
let Type = require(__basename + '/db/model/type.js')

// 导入商品模型
let Product = require(__basename + '/db/model/product.js')

// 导入用户与商品关系模型
let UserProduct = require(__basename + '/db/model/user_product.js')

// 导入商品与商品类型模型
let ProductType = require(__basename + '/db/model/product_type.js')

// 导入收藏商品模型
let Like = require(__basename + '/db/model/like.js')

// 导入购物车模型
let Shopcart = require(__basename + '/db/model/shopcart.js')

/**
 * @description 导出所有模型
 */
module.exports = {
  User,
  Code,
  Type,
  Product,
  UserProduct,
  ProductType,
  Like,
  Shopcart
}
