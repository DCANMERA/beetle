export const mutations = {
  /**
   * @description 更新window宽度
   * @param {object} state 状态
   * @param {{w: number}} {w} 窗口宽度
   */
  updateWindowWidth(state, { w }) {
    state.w = w
  },

  /**
   * @description 更新window高度
   * @param {object} state 状态
   * @param {{h: number}} {h} 窗口高度
   */
  updateWindowHeight(state, { h }) {
    state.h = h
  },

  /**
   * @description 更新实时window宽度
   * @param {object} state 状态
   * @param {{sw: number}} {sw} 窗口实时宽度
   */
  updateWindowScrollWidth(state, { sw }) {
    state.sw = sw
  },

  /**
   * @description 更新实时window高度
   * @param {object} state 状态
   * @param {{sh: number}} {shsh} 窗口实时高度
   */
  updateWindowScrollHeight(state, { sh }) {
    state.sh = sh
  }
}
