const state = {
  headerHeight: 64,
  active: '1'
}

const mutations = {
  /**
   * @description 更新激活索引
   * @param {object} state 状态
   * @param {{active: string}} active 激活索引
   */
  updateActive(state, { active }) {
    state.active = active
  },

  /**
   * @description 更新激活索引
   * @param {object} state 状态
   * @param {{headerHeight: number}} headerHeight 头部高度
   */
  updateHeaderHeigth(state, { headerHeight }) {
    state.headerHeight = headerHeight
  },
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
