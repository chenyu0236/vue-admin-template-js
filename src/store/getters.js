const getters = {
  sidebar: state => state.settings.sidebar,
  ctx: state => state.user.ctx,
  user: state => state.user.user,
  token: state => state.user.token,
  currentBindId: state => state.user.currentBindId,
  binds: state => state.user.binds,
  tenant: state => state.user.tenant,
  perm: state => state.user.perm,
  menu: state => state.user.menu,
  language: state => state.settings.language,
}
export default getters
