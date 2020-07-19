/**
 * @author caiwenduio
 * @file 全局的action
 */

import types from './type';

const getUserInfo = payload => {
  return {
    type: types.GLOBAL_GETUSERINFO,
    payload,
  };
};

const logOut = payload => {
  return {
    type: types.GLOBAL_LOGOUT,
    payload,
  };
};

const appendUserInfo = payload => {
  return {
    type: types.GLOBAL_APPEND_USERINFO,
    payload,
  };
};

const changeLayout = payload => {
  return {
    type: types.GLOBAL_CHANGE_LAYOUT,
    payload,
  };
};

const getQiniuToken = payload => {
  return {
    type: types.GLOBAL_GET_QINIU_TOKEN,
    payload,
  };
};

const changeQiniu = payload => {
  return {
    type: types.GLOBAL_CHANGE_QINIU,
    payload,
  };
};

const upload = payload => {
  return {
    type: types.GLOBAL_UPLOAD,
    payload,
  }
}

export default {
  getUserInfo,
  logOut,
  appendUserInfo,
  changeLayout,
  getQiniuToken,
  changeQiniu,
  upload,
};
