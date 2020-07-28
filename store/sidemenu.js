// State
export const state = () => ({
  hideSidebar: true,
  isSidebar: false,
  widthPx: 400,
  isHover: false,
})

// Mutations
export const mutations = {
  HIDE_SIDEBAR(state, isHidden_) {
    state.hideSidebar = isHidden_
  },
  TOGGLE_SIDEBAR(state) {
    state.isSidebar = !state.isSidebar
  },
  SetState(state, isOpen_) {
    state.isSidebar = isOpen_
  },
  SetWidth(state, data) {
    state.widthPx = data.width
    state.isHover = data.factor > 0.5
  },
}

// Actions
export const actions = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
}

// Getters
export const getters = {
  hideSidebar: (state) => state.hideSidebar,
  isSidebar: (state) => state.isSidebar,
  isHover: (state) => state.isHover,
  widthPx: (state) => state.widthPx,

  // width100(state) {
  //   let w_ = state.width100
  //   if (screen.width < 600) {
  //     w_ = 100
  //   }
  //   return w_
  // }
}
