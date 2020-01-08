import request from '../../../utils/request'

export const fetchClassify = async function(data) {
  return await request({
    method: 'get',
    url: '/api/classify/find',
    data
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
    data
  })
}
