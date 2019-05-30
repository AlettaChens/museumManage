import request from '../utils/request'

export async function publish(params) {
  return request('/collection/publish', {
    method: 'post',
    data: params,
  })
}

export async function getInfoByPage(params) {
  return request('/collection/getInfoByPage', {
    method: 'post',
    data: params,
  })
}

export async function getInfoCount() {
  return request('/collection/getInfoCount', {
    method: 'post',
    data:{}
  })
}

export async function deleteInfoById(params) {
  return request('/collection/deleteInfoById', {
    method: 'post',
    data: params,
  })
}

export async function updateInfo(params) {
  return request('/collection/updateInfo', {
    method: 'post',
    data: params,
  })
}


