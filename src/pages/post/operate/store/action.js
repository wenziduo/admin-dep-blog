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

const loadPostList = payload => {
  return {
    type: types.LOAD_POST_LIST,
    payload,
  };
};

const loadPostDelete = payload => {
  return {
    type: types.LOAD_POST_DELETE,
    payload,
  };
};

export default { changeApp, loadPostList, loadPostDelete };
