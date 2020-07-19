import request from '../../utils/request';
import {
  API_ADMINBLOG_USER_GETINFO,
  API_ADMINBLOG_USER_LOGOUT,
  API_ADMINBLOG_QINIU_GETQINIUTOKEN,
} from '../../api/requestUrl';

export const fetchGetUser = async function (data) {
  return await request({
    method: 'get',
    url: API_ADMINBLOG_USER_GETINFO,
    data,
  });
};
// 退出
export const fetchLogout = async function (data) {
  return await request({
    method: 'post',
    url: API_ADMINBLOG_USER_LOGOUT,
    data,
  });
};
export const fetchGetQiniuToken = async function (data) {
  return await request({
    method: 'get',
    url: API_ADMINBLOG_QINIU_GETQINIUTOKEN,
    data,
  });
};