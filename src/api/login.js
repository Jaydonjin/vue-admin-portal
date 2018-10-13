import request from '@/utils/request'
import config from '@/config'

export function login(username, password) {
  return request({
    url: config.newegg_login,
    method: 'post',
    data: {
      user: username,
      password: password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
