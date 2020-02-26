import request from '../../../utils/request'

export const fetchPostList = async function(data) {
  return await request({
    method: 'get',
    url: '/api/admin/post/find',
    data
  })
}
export const fetchPostAdd = async function(data) {
  return await request({
    method: 'post',
    url: '/api/admin/post/create',
    data
  })
}
export const fetchPostEdit = async function(data) {
  return await request({
    method: 'post',
    url: '/api/admin/post/update',
    data
  })
}
export const fetchPostDel = async function(data) {
  return await request({
    method: 'post',
    url: '/api/admin/post/delete',
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
