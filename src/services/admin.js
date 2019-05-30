import request from '../utils/request'

export async function register(params) {
  return request('/user/register', {method: 'post',data: params,})
}

export async function login(params) {
  return request('/user/login', { method: 'post', data: params })
}


export async function getUserPage(params) {
  return request('/user/getUserByPage', {method: 'post',data: params,})
}


export async function getUserCount(params) {
  return request('/user/getUserCount', {method: 'post',data: params,})
}
