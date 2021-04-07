import request from '@/utils/request'

/**
 * @description 获取商品类型
 */
export function getTypes() {
  return request({
    url: '/type',
    method: 'GET'
  })
}

/**
 * @description 条件pid查询商品
 * @param {object} params 请求参数,具体请查看接口文档
 */
export function probyid(params) {
  return request({
    url: '/probyid',
    method: 'GET',
    params,
    headers: {
      token: document.cookie
    }
  })
}

/**
 * @description 条件查询商品
 * @param {object} params 请求参数,具体请查看接口文档
 */
export function search(params) {
  return request({
    url: '/search',
    method: 'GET',
    params,
    headers: {
      token: document.cookie
    }
  })
}

/**
 * @description 用户发布上架商品
 * @param {object} params 请求参数,具体请查看接口文档
 */
export function count(params) {
  return request({
    url: '/count',
    method: 'GET',
    params,
    headers: {
      token: document.cookie
    }
  })
}

/**
 * @description 发布商品
 * @param {object} data 请求参数,具体请查看接口文档
 */
export function postProduct(data) {
  return request({
    url: '/postProduct',
    method: 'POST',
    data,
    headers: {
      token: document.cookie
    }
  })
}

/**
 * @description 更新商品
 * @param {object} data 请求参数,具体请查看接口文档
 */
export function updateProduct(data) {
  return request({
    url: '/updateProduct',
    method: 'POST',
    data,
    headers: {
      token: document.cookie
    }
  })
}

/**
 * @description 删除商品
 * @param {object} data 请求参数,具体请查看接口文档
 */
export function remove(data) {
  return request({
    url: '/remove',
    method: 'POST',
    data,
    headers: {
      token: document.cookie
    }
  })
}

/**
 * @description 上下架
 * @param {object} data 请求参数,具体请查看接口文档
 */
export function updown(data) {
  return request({
    url: '/updown',
    method: 'POST',
    data,
    headers: {
      token: document.cookie
    }
  })
}
