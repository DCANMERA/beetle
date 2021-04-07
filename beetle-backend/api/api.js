/**
 * @module 操作mysql数据库的API
 * @author : 叶宏威
 * @since : 创建时间  2021-02-12
 * */

// 导入sequelize模块
const { QueryTypes } = require('sequelize')

/**
 * @description 数据库API接口
 * @class API
 */
class API {
  /**
   * @description 创建数据库表
   * @param {string} modelName 模型名称
   * @param {object} o 创建的数据
   * @param {object} t 事务处理对象
   * @returns {Promise} 返回表的promise对象
   */
  createData(modelName, o, t) {
    return t ?
      model[modelName].create(o, { transaction: t }) :
      model[modelName].create(o)
  }

  /**
   * @description 删除数据库表
   * @param {string} modelName 模型名称
   * @param {object} condition 条件
   * @param {object} t 事务处理对象
   */
  removeData(modelName, condition, t) {
    if (t) {
      return model[modelName].destroy({
        where: condition,
        transaction: t
      })
    }
    return model[modelName].destroy({
      where: condition
    })
  }

  /**
   * @description 更新数据库表
   * @param {string} modelName 模型名称
   * @param {object} values 更新数据
   * @param {object} condition 条件
   * @param {object} t 事务处理对象
   */
  updateData(modelName, values, condition, t) {
    if (t) {
      return model[modelName].update(values, {
        where: condition,
        transaction: t
      })
    }
    return model[modelName].update(values, {
      where: condition
    })
  }

  /**
   * @description 查询数据库表数据
   * @param {{ modelName: string, condition: object, attributes: array }} o o.modelName: 模型名称, o.condition: 查询条件, o.attributes: 查询字段 ['a', 'b'] 或者 具有别名 ['a', ['b', 'b别名']]
   * @returns {object}
   */
  findData(o) {
    return model[o.modelName].findAll({
      where: o.condition,
      attributes: o.attributes
    })
  }

  /**
   * @description 事务处理
   * @param {function} fn 回调函数
   */
  transaction(fn) {
    return sequelize.transaction(fn)
  }

  /**
   * @description 原始查询
   * @param {string} sql SQL语句
   * @param {object} replacements 替换SQL语句的内容
   * @returns 原始查询的数据
   */
  query(sql, replacements) {
    return sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT
    })
  }

  /**
   * @description 查询记录数
   * @param {string} modelName 模型名称
   * @param {object} condition 查询条件
   * @returns 查询的数据
   */
  count(modelName, condition) {
    return model[modelName].count({
      where: condition
    })
  }

}

module.exports = new API()
