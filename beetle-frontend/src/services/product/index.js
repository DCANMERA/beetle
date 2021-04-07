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
 * @description 获取首页推荐的商品
 * @param {object} params 请求参数,具体请查看接口文档
 */
export function clientHomeProduct(params = {}) {
  if (params.type_id === '-1') {
    delete params.type_id
  }
  return request({
    url: '/clientHomeProduct',
    method: 'GET',
    params
  })
}

/**
 * @description 收藏商品
 * @param {object} data 请求参数,具体请查看接口文档
 */
export function like(data) {
  return request({
    url: '/like',
    method: 'POST',
    data,
    headers: {
      token: document.cookie
    }
  })
}

/**
 * @description 取消收藏商品
 * @param {object} params 请求参数,具体请查看接口文档
 */
export function removeLike(data) {
  return request({
    url: '/removeLike',
    method: 'POST',
    data,
    headers: {
      token: document.cookie
    }
  })
}

/**
 * @description 查询收藏商品数据
 * @param {object} params 请求参数,具体请查看接口文档
 */
export function findLike(params) {
  return request({
    url: '/findLike',
    method: 'GET',
    params,
    headers: {
      token: document.cookie
    }
  })
}

/**
 * @description 收藏总数
 * @param {object} params 请求参数,具体请查看接口文档
 */
export function likeCount(params) {
  return request({
    url: '/likeCount',
    method: 'GET',
    params,
    headers: {
      token: document.cookie
    }
  })
}


/**
 * @description 加购
 * @param {object} data 请求参数,具体请查看接口文档
 */
export function addShopcart(data) {
  return request({
    url: '/addShopcart',
    method: 'POST',
    data,
    headers: {
      token: document.cookie
    }
  })
}

/**
 * @description 取消加购
 * @param {object} data 请求参数,具体请查看接口文档
 */
export function removeShopcart(data) {
  return request({
    url: '/removeShopcart',
    method: 'POST',
    data,
    headers: {
      token: document.cookie
    }
  })
}

/**
 * @description 购物车商品
 * @param {object} params 请求参数,具体请查看接口文档
 */
export function shopcartProducts(params) {
  return request({
    url: '/shopcartProducts',
    method: 'GET',
    params,
    headers: {
      token: document.cookie
    }
  })
}

/**
 * @description 购物车总数
 * @param {object} params 请求参数,具体请查看接口文档
 */
export function shopcartCount(params) {
  return request({
    url: '/shopcartCount',
    method: 'GET',
    params,
    headers: {
      token: document.cookie
    }
  })
}
