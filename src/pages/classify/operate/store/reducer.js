/**
 * @author caiwenduio
 * @file reducer
 */

import types from './type';

const initState = {
  tableData: [],
  tableLoading: false,
  modal: {
    type: 'add',
    currentItem: {},
    confirmLoading: false,
    visible: false,
    initForm: {
      title: null,
      imgFile: [],
    },
  },
};

const globalReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.CHANGE_TABLEDATA:
      return { ...state, tableData: payload };
    case types.CHANGE_TABLELOADING:
      return { ...state, tableLoading: payload };
    case types.CHANGE_MODAL:
      return { ...state, modal: { ...state.modal, ...payload } };
    default:
      return state;
  }
};
export default globalReducer;
