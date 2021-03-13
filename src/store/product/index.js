import {
  getTypes,
  postProduct,
  clientHomeProduct,
  search,
  count,
  like,
  removeLike,
  likeCount,
  findLike,
  addShopcart,
  removeShopcart,
  shopcartProducts,
  shopcartCount
} from '@/services/product'
import {
  utils
} from '@/utils/utils'

const state = {
  types: [],
  products: [],
  detail: {},
  productTitle: ''
}

const mutations = {
  /**
   * @description 更新商品类型
   * @param {object} state
   * @param {{type: array}} {types} 商品类型
   */
  updateTypes(state, { types }) {
    state.types = types
  },

  /**
   * @description 更新商品
   * @param {object} state
   * @param {{products: array}} {products} 商品
   */
  updateProducts(state, { products }) {
    state.products = products
  },

  /**
   * @description 更新商品详情数据
   * @param {object} state
   * @param {{detail: object}} {detail} 商品详情数据
   */
  updateDetail(state, { detail }) {
    state.detail = detail
  },

  /**
   * @description 更新分类名称
   * @param {object} state
   * @param {{productTitle: string}} {productTitle} 分类名称
   */
  updateProductTitle(state, { productTitle }) {
    state.productTitle = productTitle
  }
}

const actions = {
  /**
   * @description 获取商品类型
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   */
  async getTypes({ commit }) {
    const res = await getTypes()
    if (res.data.status == 1050) {
      commit('updateTypes', { types: res.data.result })
    }
    return res
  },

  /**
   * @description 发布需求
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} data 请求参数,具体请查看接口文档
   */
  async postProduct({ commit }, data) {
    const res = await postProduct(data)
    return res
  },

  /**
   * @description 获取所有上架商品
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} params 请求参数,具体请查看接口文档
   */
  async getProducts({ commit }, params) {
    const res = await clientHomeProduct(params)
    if (res.data.status === 1120) {
      res.data.result.forEach(v => {
        v.img = res.data.url + v.img
        v.detail_img = res.data.url + v.detail_img
        v.avatar = res.data.url + v.avatar
        v.updated_at = utils.formatDate(
          v.updated_at,
          "yyyy-MM-dd hh:mm:ss"
        )
      })
      commit('updateProducts', { products: res.data.result })
    }
    return res
  },

  /**
   * @description 用户发布的上架商品数据
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} params 请求参数,具体请查看接口文档
   */
  async search({ commit }, params) {
    const res = await search(params)
    return res
  },

  /**
   * @description 用户发布的上架商品条目
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} params 请求参数,具体请查看接口文档
   */
  async count({ commit }, params) {
    const res = await count(params)
    return res
  },

  /**
   * @description 收藏
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} data 请求参数,具体请查看接口文档
   */
  async like({ commit }, data) {
    const res = await like(data)
    return res
  },

  /**
   * @description 取消收藏
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} data 请求参数,具体请查看接口文档
   */
  async removeLike({ commit }, data) {
    const res = await removeLike(data)
    return res
  },

  /**
   * @description 用户收藏商品条目
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} data 请求参数,具体请查看接口文档
   */
  async likeCount({ commit }, params) {
    const res = await likeCount(params)
    return res
  },

  /**
   * @description 用户收藏商品数据
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} data 请求参数,具体请查看接口文档
   */
  async findLike({ commit }, params) {
    const res = await findLike(params)
    return res
  },


  /**
   * @description 加购
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} data 请求参数,具体请查看接口文档
   */
  async addShopcart({ commit }, data) {
    const res = await addShopcart(data)
    return res
  },

  /**
   * @description 取消加购
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} data 请求参数,具体请查看接口文档
   */
  async removeShopcart({ commit }, data) {
    const res = await removeShopcart(data)
    return res
  },

  /**
   * @description 用户加购数据
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} data 请求参数,具体请查看接口文档
   */
  async shopcartProducts({ commit }, params) {
    const res = await shopcartProducts(params)
    return res
  },

  /**
   * @description 用户加购的商品条目
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} data 请求参数,具体请查看接口文档
   */
  async shopcartCount({ commit }, params) {
    const res = await shopcartCount(params)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
