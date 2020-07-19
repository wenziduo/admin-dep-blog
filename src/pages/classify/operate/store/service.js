import request from '../../../../utils/request';
import {
  API_ADMINBLOG_QINIU_GETQINIUTOKEN,
  API_ADMINBLOG_CLASSIFY_FIND,
  API_ADMINBLOG_CLASSIFY_UPDATE,
  API_ADMINBLOG_CLASSIFY_CREATE,
  API_ADMINBLOG_CLASSIFY_DELETE,
} from '../../../../api/requestUrl';

export const fetchClassifyList = async function (data) {
  return await request({
    method: 'get',
    url: API_ADMINBLOG_CLASSIFY_FIND,
    data,
  });
};
export const fetchClassifyAdd = async function (data) {
  return await request({
    method: 'post',
    url: API_ADMINBLOG_CLASSIFY_CREATE,
    data,
  });
};
export const fetchClassifyEdit = async function (data) {
  return await request({
    method: 'post',
    url: API_ADMINBLOG_CLASSIFY_UPDATE,
    data,
  });
};
export const fetchClassifyDel = async function (data) {
  return await request({
    method: 'post',
    url: API_ADMINBLOG_CLASSIFY_DELETE,
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
