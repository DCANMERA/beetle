/**
 * @module 模型：Code模型, code表
 * @author : 叶宏威
 * @since : 创建时间  2021-02-12
 * */

let { DataTypes, Model } = require('sequelize')

class Code extends Model { }

/**
 * @description 定义模型结构, 数据表结构
 */
Code.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    comment: '表id'
  },

  codeId: {
    type: DataTypes.STRING(30),
    allowNull: false,

    // 默认值
    defaultValue: '',
    comment: '验证码id'
  },

  code: {
    type: DataTypes.STRING(6),
    allowNull: false,
    defaultValue: '',
    comment: '验证码'
  },

  email: {
    type: DataTypes.STRING(40),
    allowNull: false,
    defaultValue: '',
    comment: '邮箱'
  }

}, {

  // 指定连接实例，这样才知道在指定数据库创建code表
  sequelize,

  // 模型名称, 当没有指定表名时，sequelize推断名称为模型名称的复数 ==> codes作为表名
  modelName: 'code',

  // 不推断，直接使用模型作为表名 ==> code作为表名
  freezeTableName: true,

  // 指定表名
  tableName: 'code'
})

// 同步数据库表
// force: true ==> 删除原有code表，新建code表
// force: false ==> 如果code存在，则不创建，反之，不创建code表
Code.sync({ force: config.mysqlOptions.forceRemove })

module.exports = Code
