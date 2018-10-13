const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  fullname: state => state.user.fname,
  email: state => state.user.email,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
