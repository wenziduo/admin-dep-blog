/**
 * @author caiwenduio
 * @file action
 */

import types from './type';

const changeApp = payload => {
  return {
    type: types.CHANGE_APP,
    payload,
  };
};

const changeModal = payload => {
  return {
    type: types.CHANGE_MODAL,
    payload,
  };
};

const loadPostDetail = payload => {
  return {
    type: types.LOAD_POST_DETAIL,
    payload,
  };
};

const loadClassify = payload => {
  return {
    type: types.LOAD_CLASSIFY,
    payload,
  };
};

const loadSave = payload => {
  return {
    type: types.LOAD_SAVE,
    payload,
  };
};

export default { changeApp, loadPostDetail, changeModal, loadClassify, loadSave };
