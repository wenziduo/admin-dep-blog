/**
 * @author caiwenduio
 * @file 全局的reducer
 */

import types from './type';

const initState = {
  userInfo: {},
  layout: {
    collapsed: false,
  },
  qiniu: {
    token: null,
  },
};

const globalReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.GLOBAL_APPEND_USERINFO:
      return { ...state, userInfo: { ...state.userInfo, ...payload } };
    case types.GLOBAL_CHANGE_LAYOUT:
      return { ...state, layout: { ...state.layout, ...payload } };
    case types.GLOBAL_CHANGE_QINIU:
      return { ...state, qiniu: { ...state.qiniu, ...payload } };
    default:
      return state;
  }
};
export default globalReducer;
