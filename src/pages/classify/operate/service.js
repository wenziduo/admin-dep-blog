import request from '../../../utils/request'

export const fetchClassifyList = async function(data) {
  return await request({
    method: 'get',
    url: '/api/admin/classify/find',
    data
  })
}
export const fetchClassifyAdd = async function(data) {
  return await request({
    method: 'post',
    url: '/api/admin/classify/create',
    data
  })
}
export const fetchClassifyEdit = async function(data) {
  return await request({
    method: 'post',
    url: '/api/admin/classify/update',
    data
  })
}
export const fetchClassifyDel = async function(data) {
  return await request({
    method: 'post',
    url: '/api/admin/classify/delete',
    data
  })
}
export const fetchGetQiniuToken = async function(data) {
  return await request({
    method: 'get',
    url: '/api/admin/qiniu/getQiniuToken',
    data
  })
}
