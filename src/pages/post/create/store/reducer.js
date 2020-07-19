/**
 * @author caiwenduio
 * @file reducer
 */

import types from './type';

const initState = {
  app: {
    markdown: null,
    text: null,
    type: null,
    _id: null,
  },
  modal: {
    visible: false,
    classifyData: [],
    confirmLoading: false,
  }
};

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.CHANGE_APP:
      return { ...state, app: { ...state.app, ...payload } };
    case types.CHANGE_MODAL:
      return { ...state, app: { ...state.modal, ...payload } };    
    default:
      return state;
  }
};
export default reducer;
