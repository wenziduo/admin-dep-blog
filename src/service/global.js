import request from '../utils/request'

export const fetchGetUser = async function(data) {
  return await request({
    method: 'get',
    url: '/api/admin-blog/user/getInfo',
    data
  })
}
