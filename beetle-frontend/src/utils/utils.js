/**
 * @module 公共方法模块
 */
class Utils {
  /**
   * @description 格式化日期
   * @param {string} v 格式化时间
   * @param {string} format 格式化的格式
   * @returns 格式化时间
   */
  formatDate(v, format) {
    let date = new Date(v)

    // 格式化年份
    let year = date.getFullYear().toString()
    if (/(y+)/.test(format)) {

      // 获取匹配组内容
      let content = RegExp.$1
      format = format.replace(content, year.slice(year.length - content.length))
    }

    // 格式化月份, 日份 ,时 ,分 ,秒
    let obj = {
      M: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds()
    }

    for (let key in obj) {

      // 创建动态正则
      let reg = new RegExp(`(${key}+)`)
      if (reg.test(format)) {
        let group = RegExp.$1
        format = format.replace(group, obj[key] >= 10 ?
          obj[key] :
          group.length == 2 ?
            '0' + obj[key] :
            obj[key])
      }
    }
    return format
  }
}

export const utils = new Utils()
