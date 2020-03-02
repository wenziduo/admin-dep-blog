import request from '../../utils/request'

export const fetchLogin = async function(data) {
  return await request({
    method: 'post',
    url: '/api/admin-blog/user/login',
    data
  })
}
