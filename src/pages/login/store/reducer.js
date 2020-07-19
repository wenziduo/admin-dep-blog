/**
 * @author caiwenduio
 * @file reducer
 */

import types from './type';

const initState = {
  confirmLoading: false
};

const loginReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_CHANGE_CONFIRMLOADING:
      return { ...state, confirmLoading: payload };
    default:
      return state;
  }
};
export default loginReducer;
