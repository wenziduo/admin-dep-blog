/**
 * @author caiwenduio
 * @file reducer
 */

import types from './type';

const initState = {
  app: {
    page: 1,
    pageSize: 20,
    total: 0,
    data: [],
    loading: false,
  },
};

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.CHANGE_APP:
      return { ...state, app: { ...state.app, ...payload } };
    default:
      return state;
  }
};
export default reducer;
