import request from '../../../../utils/request';
import {
  API_ADMINBLOG_POST_FIND,
  API_ADMINBLOG_POST_CREATE,
  API_ADMINBLOG_POST_EDIT,
  API_ADMINBLOG_POST_DELETE,
  API_ADMINBLOG_QINIU_GETQINIUTOKEN,
} from '../../../../api/requestUrl';

const fetchPostList = async function (data) {
  return await request({
    method: 'get',
    url: API_ADMINBLOG_POST_FIND,
    data,
  });
};
const fetchPostAdd = async function (data) {
  return await request({
    method: 'post',
    url: API_ADMINBLOG_POST_CREATE,
    data,
  });
};
const fetchPostEdit = async function (data) {
  return await request({
    method: 'post',
    url: API_ADMINBLOG_POST_EDIT,
    data,
  });
};
const fetchPostDel = async function (data) {
  return await request({
    method: 'post',
    url: API_ADMINBLOG_POST_DELETE,
    data,
  });
};
const fetchGetQiniuToken = async function (data) {
  return await request({
    method: 'get',
    url: API_ADMINBLOG_QINIU_GETQINIUTOKEN,
    data,
  });
};

export default {
  fetchPostList,
  fetchPostAdd,
  fetchPostEdit,
  fetchPostDel,
  fetchGetQiniuToken,
};
