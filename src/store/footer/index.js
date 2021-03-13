const state = {
  footerHeight: 345
}

const mutations = {
  /**
   * @description 更新底部高度
   * @param {object} state
   * @param {{footerHeight: Number}} param1
   */
  updateFooterHeigth(state, { footerHeight }) {
    state.footerHeight = footerHeight
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
