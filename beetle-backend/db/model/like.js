/**
 * @module 模型：Like模型 like表
 * @author : 叶宏威
 * @since : 创建时间  2021-02-12
 * */

let { DataTypes, Model } = require('sequelize')
class Like extends Model { }

/**
 * @description 定义模型结构, 数据表结构
 */
Like.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    comment: '表id'
  },

  pid: {
    type: DataTypes.STRING(30),
    allowNull: false,

    // 默认值
    defaultValue: '',
    comment: '验证码id'
  },

  userId: {
    type: DataTypes.STRING(30),
    allowNull: false,

    // 默认值
    defaultValue: '',
    comment: '用户id'
  },

}, {

  // 指定连接实例，这样才知道在指定数据库创建like表
  sequelize,

  // 模型名称, 当没有指定表名时，sequelize推断名称为模型名称的复数 ==> likes作为表名
  modelName: 'like',

  // 不推断，直接使用模型作为表名 ==> like作为表名
  freezeTableName: true,

  // 指定表名
  tableName: 'like'
})

// 同步数据库表
// force: true ==> 删除原有like表，新建like表
// force: false ==> 如果like存在，则不创建，反之，不创建like表
Like.sync({ force: config.mysqlOptions.forceRemove })

module.exports = Like
