import request from '../../../../utils/request';
import {
  API_ADMINBLOG_CLASSIFY_FIND,
  API_ADMINBLOG_POST_CREATE,
  API_ADMINBLOG_QINIU_GETQINIUTOKEN,
  API_ADMINBLOG_POST_DETAIL,
  API_ADMINBLOG_POST_EDIT,
} from '../../../../api/requestUrl';

export const fetchClassify = async function (data) {
  return await request({
    method: 'get',
    url: API_ADMINBLOG_CLASSIFY_FIND,
    data,
  });
};
export const fetchPostAdd = async function (data) {
  return await request({
    method: 'post',
    url: API_ADMINBLOG_POST_CREATE,
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
export const fetchPostDetail = async function (data) {
  return await request({
    method: 'get',
    url: API_ADMINBLOG_POST_DETAIL,
    data,
  });
};
export const fetchPostEdit = async function (data) {
  return await request({
    method: 'post',
    url: API_ADMINBLOG_POST_EDIT,
    data,
  });
};
