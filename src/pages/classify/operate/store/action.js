/**
 * @author caiwenduio
 * @file 全局的action
 */

import types from './type';

const changeTableData = payload => {
  return {
    type: types.CHANGE_TABLEDATA,
    payload,
  };
};
const changeTableLoading = payload => {
  return {
    type: types.CHANGE_TABLELOADING,
    payload,
  };
};

const getTableData = payload => {
  return {
    type: types.GET_TABLEDATA,
    payload,
  };
};

const changeModal = payload => {
  return {
    type: types.CHANGE_MODAL,
    payload,
  };
};

const delClassify = payload => {
  return {
    type: types.DELETE_CLASSIFY,
    payload,
  };
};

const addEditSave = payload => {
  return {
    type: types.ADD_EDIT_SAVE,
    payload,
  };
};

export default {
  changeTableData,
  changeTableLoading,
  changeModal,
  getTableData,
  delClassify,
  addEditSave,
};
