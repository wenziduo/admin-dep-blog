import request from '../utils/request'

export const fetchGetUser = async function(data) {
  return await request({
    method: 'get',
    url: '/api/admin-blog/user/getInfo',
    data
  })
}
// 退出
export const fetchLogout = async function(data) {
  return await request({
    method: 'post',
    url: '/api/admin-blog/user/logout',
    data
  })
}
