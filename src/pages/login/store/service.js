import request from '../../../utils/request';
import { API_ADMINBLOG_USER_LOGIN } from '../../../api/requestUrl';

// 登录
export const fetchLogin = async function (data) {
  return await request({
    method: 'post',
    url: API_ADMINBLOG_USER_LOGIN,
    data,
  });
};
