/**
 * @author caiwenduio
 * @file 全局的action
 */

import types from './type';

const changePvVv = (payload) => {
  return {
    type: types.CHANGE_PVVV,
    payload,
  };
};
const getPvVv = (payload) => {
  return {
    type: types.GET_PV_VV,
    payload,
  };
}
export default { changePvVv, getPvVv };
