//上下文 信息

const state = {
  Ctx: null,
  User: null,
  Token: '', //用户令牌
  CurrentBindId: 0, //当前绑定的身份
  Binds: null, //用户绑定身份列表
  Tenant: null, //当前访问租户
  Perm: null,
  Menu: null,
  OpenApi: '',
}

const mutations = {
  SET_CTX: (state, ctx) => {
    state.ctx = ctx
  },
  TOGGLE_TOKEN: (state, token) => {
    state.token = token
  },
  SET_CURRENTBINDID: (state, currentBindId) => {
    state.currentBindId = currentBindId
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_BINDS: (state, binds) => {
    state.binds = binds
  },
  SET_TENANT: (state, tenant) => {
    state.tenant = tenant
  },
  SET_PERM: (state, perm) => {
    state.perm = perm
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  },
  SET_OPEN_API: (state, openapi) => {
    state.OpenApi = openapi
  }
}

const actions = {
  setCtx({ commit, dispatch }, ctx) {
    commit('SET_CTX', ctx);
    let currentMember

    if (ctx.CurrentBindId === 0) {
      currentMember = ctx.Members[0]
    } else {
      ctx.Members.forEach((member) => {
        if (member.Id === ctx.CurrentBindId) {
          currentMember = member
        }
      })
    }
    dispatch('setCurrentBindId', ctx.CurrentBindId)
    dispatch('setBinds', ctx.Members)
    dispatch('setTenant', currentMember)
    dispatch('setUser', ctx)
  },
  toggleToken({ commit }, token) {
    commit('TOGGLE_TOKEN', token)
  },
  setCurrentBindId({ commit }, currentBindId) {
    commit('SET_CURRENTBINDID', currentBindId)
  },
  setUser({ commit }, user) {
    commit('SET_USER', user)
  },
  setBinds({ commit }, binds) {
    commit('SET_BINDS', binds)
  },
  setTenant({ commit }, tenant) {
    commit('SET_TENANT', tenant)
  },
  setPerm({ commit }, perm) {
    commit('SET_PERM', perm)
  },
  setMenu({ commit }, menu) {
    commit('SET_MENU', menu)
  },
  setOpenApi({ commit }, openapi) {
    commit('SET_OPEN_API', openapi)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
