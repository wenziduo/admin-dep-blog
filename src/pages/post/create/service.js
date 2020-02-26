import request from '../../../utils/request'

export const fetchClassify = async function(data) {
  return await request({
    method: 'get',
    url: '/api/admin/classify/find',
    params: data
  })
}
export const fetchPostAdd = async function(data) {
  return await request({
    method: 'post',
    url: '/api/admin/post/create',
    data
  })
}
export const fetchGetQiniuToken = async function(data) {
  return await request({
    method: 'get',
    url: '/api/admin/qiniu/getQiniuToken',
    params: data
  })
}
export const fetchPostDetail = async function(data) {
  return await request({
    method: 'get',
    url: '/api/admin/post/detail',
    params: data
  })
}
export const fetchPostEdit = async function(data) {
  return await request({
    method: 'post',
    url: '/api/admin/post/edit',
    data
  })
}
