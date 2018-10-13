import {login, logout, getInfo} from '@/api/login'
import {storage} from '@/utils/storage'

const user = {
  state: {
    info: {},
    avatar: '',
    email: '',
    name: '',
    fname: '',
    roles: []
  },

  mutations: {
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_FNAME: (state, fname) => {
      state.fname = fname
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          storage.set('_genesis_admin_portal_user', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        let user = storage.get('_genesis_admin_portal_user')
        // 使用权限验证,userinfo 需要包含 roles (roles must be a array! such as: ['editor','develop'])
        user['roles'] = ['admin']
        commit('SET_INFO', user)
        commit('SET_AVATAR', user.avatar)
        commit('SET_EMAIL', user.email)
        commit('SET_NAME', user.user)
        commit('SET_FNAME', user.fullname)
        commit('SET_ROLES', user.roles)
        resolve(user)
      })
    },

    // 登出
    LogOut({ commit, state }) {
      commit('SET_INFO', {})
      storage.delete('_genesis_admin_portal_user')
    },
  }
}

export default user
