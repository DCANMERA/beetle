/**
 * @module 模型：UserProduct模型, user_product表
 * @author : 叶宏威
 * @since : 创建时间  2021-02-12
 * */

let { DataTypes, Model } = require('sequelize')

class UserProduct extends Model { }

/**
 * @description 定义模型结构, 数据表结构
 */
UserProduct.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    comment: '表id'
  },

  // 逻辑外键，关联用户id
  userId: {
    type: DataTypes.STRING(30),
    allowNull: false,

    // 默认值
    defaultValue: '',
    comment: '用户id'
  },

  pid: {
    type: DataTypes.STRING(30),
    allowNull: false,

    // 默认值
    defaultValue: '',
    comment: '商品id'
  }

}, {

  // 指定连接实例，这样才知道在指定数据库创建userProduct表
  sequelize,

  // 模型名称, 当没有指定表名时，sequelize推断名称为模型名称的复数 ==> userProducts作为表名
  modelName: 'userProduct',

  // 不推断，直接使用模型作为表名 ==> userProduct作为表名
  freezeTableName: true,

  // 指定表名
  tableName: 'user_product'
})

// 同步数据库表
// force: true ==> 删除原有userProduct表，新建userProduct表
// force: false ==> 如果userProduct存在，则不创建，反之，不创建userProduct表
UserProduct.sync({ force: config.mysqlOptions.forceRemove })

module.exports = UserProduct
