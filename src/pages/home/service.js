import request from '../../utils/request'

export const fetchStatistics = async function(data) {
  return await request({
    method: 'get',
    url: '/api/admin-blog/statistics/find',
    data
  })
}
