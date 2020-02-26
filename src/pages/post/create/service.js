import request from '../../../utils/request'

export const fetchClassify = async function(data) {
  return await request({
    method: 'get',
    url: '/api/admin-blog/classify/find',
    params: data
  })
}
export const fetchPostAdd = async function(data) {
  return await request({
    method: 'post',
    url: '/api/admin-blog/post/create',
    data
  })
}
export const fetchGetQiniuToken = async function(data) {
  return await request({
    method: 'get',
    url: '/api/admin-blog/qiniu/getQiniuToken',
    params: data
  })
}
export const fetchPostDetail = async function(data) {
  return await request({
    method: 'get',
    url: '/api/admin-blog/post/detail',
    params: data
  })
}
export const fetchPostEdit = async function(data) {
  return await request({
    method: 'post',
    url: '/api/admin-blog/post/edit',
    data
  })
}
