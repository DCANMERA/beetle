/**
 * @module 模型：Type模型, type表
 * @author : 叶宏威
 * @since : 创建时间  2021-02-12
 * */

// 导入type.js初始化商品类型数据
let typeData = require(__basename + '/db/data/type.js')

let { DataTypes, Model } = require('sequelize')

class Type extends Model { }

// 定义模型结构, 数据表结构
Type.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    comment: '表id'
  },

  typeId: {
    type: DataTypes.STRING(20),
    allowNull: false,

    // 默认值
    defaultValue: '',
    comment: '商品类型id'
  },

  title: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: '',
    comment: '商品类型'
  },

  icon: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: 'default-icon.png',
    comment: '商品类型'
  },

  home: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '首页类别快捷入口,0不展示在首页,1展示在首页'
  }
}, {

  // 指定连接实例，这样才知道在指定数据库创建type表
  sequelize,

  // 模型名称, 当没有指定表名时，sequelize推断名称为模型名称的复数 ==> types作为表名
  modelName: 'type',

  // 不推断，直接使用模型作为表名 ==> type作为表名
  freezeTableName: true,

  // 指定表名
  tableName: 'type'
})

// 同步数据库表
// force: true ==> 删除原有type表，新建type表
// force: false ==> 如果type存在，则不创建，反之，不创建type表
Type.sync({ force: config.mysqlOptions.forceRemove })
// .then(result => {
//   typeData.map(v => {
//     Type.create(v)
//   })
// }).catch(err => {
//   console.log('err ==>', err)
// })

module.exports = Type
