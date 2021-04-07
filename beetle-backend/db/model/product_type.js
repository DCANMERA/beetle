/**
 * @module 模型：ProductType模型 product_type表
 * @author : 叶宏威
 * @since : 创建时间  2021-02-12
 * */

let { DataTypes, Model } = require('sequelize')

class ProductType extends Model { }

/**
 * @description 定义模型结构, 数据表结构
 */
ProductType.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    comment: '表id'
  },

  // 逻辑外键，关联用户typeId
  typeId: {
    type: DataTypes.STRING(20),
    allowNull: false,

    // 默认值
    defaultValue: '',
    comment: '商品类型id'
  },

  pid: {
    type: DataTypes.STRING(30),
    allowNull: false,

    // 默认值
    defaultValue: '',
    comment: '商品id'
  }

}, {

  // 指定连接实例，这样才知道在指定数据库创建productType表
  sequelize,

  // 模型名称, 当没有指定表名时，sequelize推断名称为模型名称的复数 ==> productTypes作为表名
  modelName: 'productType',

  // 不推断，直接使用模型作为表名 ==> productType作为表名
  freezeTableName: true,

  // 指定表名
  tableName: 'product_type'
})

// 同步数据库表
// force: true ==> 删除原有productType表，新建productType表
// force: false ==> 如果productType存在，则不创建，反之，不创建productType表
ProductType.sync({ force: config.mysqlOptions.forceRemove })

module.exports = ProductType
