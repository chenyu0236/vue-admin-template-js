const state = {
    list: null, //模块的列表数据
    action:null, //模块的当前操作
    current:null, //模块的选中记录
    isSort: false,
  }
  
  const mutations = {
    SET_LIST(state, data) {
      state.list = data
    },
    SET_CURRENT(state, data) {
      state.current = data
    },
    SET_ACTION(state, data) {
      state.action = data
    },
    SET_IS_SORT(state, data) {
      state.isSort = data
    },
  }
  
  const actions = {
    setList({ commit }, data) {
      commit('SET_LIST', data)
    },
    setCurrent({ commit }, data) {
      commit('SET_CURRENT', data)
    },
    setAction({ commit }, data) {
      commit('SET_ACTION', data)
    },
    setIsSort({ commit }, data) {
      commit('SET_IS_SORT', data)
    },
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  