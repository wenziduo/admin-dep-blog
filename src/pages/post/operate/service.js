import request from '../../../utils/request'

export const fetchPostList = async function(data) {
  return await request({
    method: 'get',
    url: '/api/admin-blog/post/find',
    data
  })
}
export const fetchPostAdd = async function(data) {
  return await request({
    method: 'post',
    url: '/api/admin-blog/post/create',
    data
  })
}
export const fetchPostEdit = async function(data) {
  return await request({
    method: 'post',
    url: '/api/admin-blog/post/update',
    data
  })
}
export const fetchPostDel = async function(data) {
  return await request({
    method: 'post',
    url: '/api/admin-blog/post/delete',
    data
  })
}
export const fetchGetQiniuToken = async function(data) {
  return await request({
    method: 'get',
    url: '/api/admin-blog/qiniu/getQiniuToken',
    data
  })
}
