/**
 * @author caiwenduio
 * @file action
 */

import types from './type';

const login = payload => {
  return {
    type: types.LOGIN_LOGIN,
    payload,
  };
};

const changeConfirmLoading = payload => {
  return {
    type: types.LOGIN_CHANGE_CONFIRMLOADING,
    payload,
  };
};

export default { login, changeConfirmLoading };
