const state = {
  nm: window.localStorage.getItem('nowNm') || '北京',
  id: window.localStorage.getItem('nowId') || 1
}

const actions = {}

const mutations = {
  // payload 传过来的载荷
  CITY_INFO (state, payload) {
    state.nm = payload.nm
    state.id = payload.id
  }
}
// 为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，
// 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
