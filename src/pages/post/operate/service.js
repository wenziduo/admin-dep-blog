import request from '../../../utils/request'

export const fetchClassifyList = async function(data) {
  return await request({
    method: 'get',
    url: '/api/classify/find',
    data
  })
}
export const fetchClassifyAdd = async function(data) {
  return await request({
    method: 'post',
    url: '/api/classify/create',
    data
  })
}
export const fetchClassifyEdit = async function(data) {
  return await request({
    method: 'post',
    url: '/api/classify/update',
    data
  })
}
export const fetchClassifyDel = async function(data) {
  return await request({
    method: 'post',
    url: '/api/classify/delete',
    data
  })
}
export const fetchGetQiniuToken = async function(data) {
  return await request({
    method: 'get',
    url: '/api/qiniu/getQiniuToken',
    data
  })
}
