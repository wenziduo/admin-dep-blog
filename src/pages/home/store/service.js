import request from '../../../utils/request';
import { API_ADMINBLOG_STATISTICS_FIND } from '../../../api/requestUrl';

export const fetchStatistics = async function (data) {
  return await request({
    method: 'get',
    url: API_ADMINBLOG_STATISTICS_FIND,
    data,
  });
};
