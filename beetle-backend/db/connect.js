/**
 * @module 连接MySQL
 * @author : 叶宏威
 * @since : 创建时间  2021-02-12
 * */

// 导入sequelize, 并且解构Sequelize
let { Sequelize } = require('sequelize')

// 连接MySQL数据库
let sequelize = new Sequelize(config.mysqlOptions.database, config.mysqlOptions.username, config.mysqlOptions.password, {

  // 数据库地址
  host: config.mysqlOptions.host,

  // 数据库类型
  dialect: config.mysqlOptions.dialect,

  // 时区
  timezone: config.mysqlOptions.timezone,

  // 字段命名 以 _ 分隔
  define: {
    underscored: config.mysqlOptions.underscored
  }
})

// 导出实例，以便后续创建模型需要使用该连接实例
module.exports = sequelize
