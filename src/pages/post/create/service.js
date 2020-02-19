import request from '../../../utils/request'

export const fetchClassify = async function(data) {
  return await request({
    method: 'get',
    url: '/api/classify/find',
    params: data
  })
}
export const fetchPostAdd = async function(data) {
  return await request({
    method: 'post',
    url: '/api/post/create',
    data
  })
}
export const fetchGetQiniuToken = async function(data) {
  return await request({
    method: 'get',
    url: '/api/qiniu/getQiniuToken',
    params: data
  })
}
export const fetchPostDetail = async function(data) {
  return await request({
    method: 'get',
    url: '/api/post/detail',
    params: data
  })
}
export const fetchPostEdit = async function(data) {
  return await request({
    method: 'post',
    url: '/api/post/edit',
    data
  })
}
