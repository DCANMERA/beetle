import {
  postProduct,
  updateProduct,
  remove,
  updown,
  getTypes,
  search,
  count,
  probyid
} from '@/services/product'

const state = {
  types: []
}

const mutations = {
  /**
   * @description 更新商品类型
   * @param {object} state
   * @param {{type: array}} {types} 商品类型
   */
  updateTypes(state, { types }) {
    state.types = types
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
   * @description 商品pid
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} params 请求参数,具体请查看接口文档
   */
  async probyid({ commit }, params) {
    const res = await probyid(params)
    return res
  },

  /**
   * @description 用户发布商品数据
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
   * @description 发布需求
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} data 请求参数,具体请查看接口文档
   */
  async postProduct({ commit }, data) {
    const res = await postProduct(data)
    return res
  },

  /**
   * @description 发布需求
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} data 请求参数,具体请查看接口文档
   */
  async remove({ commit }, data) {
    const res = await remove(data)
    return res
  },

  /**
   * @description 发布需求
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} data 请求参数,具体请查看接口文档
   */
  async updown({ commit }, data) {
    const res = await updown(data)
    return res
  },

  /**
   * @description 更新商品
   * @param {{commit: Function}} {commit} vuex提交mutations方法
   * @param {object} data 请求参数,具体请查看接口文档
   */
  async updateProduct({ commit }, data) {
    const res = await updateProduct(data)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
