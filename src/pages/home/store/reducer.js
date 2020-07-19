/**
 * @author caiwenduio
 * @file 全局的reducer
 */

import types from './type';

const initState = {
  pv: {
    data: [],
    page: 1,
    pageSize: 10,
    total: 0,
    tableLoading: false,
    echartData: [
      {
        value: 200,
        date: '2020-03-01',
      },
      {
        value: 120,
        date: '2020-03-02',
      },
      {
        value: 250,
        date: '2020-03-03',
      },
      {
        value: 36,
        date: '2020-03-04',
      },
      {
        value: 99,
        date: '2020-03-05',
      },
      {
        value: 46,
        date: '2020-03-06',
      },
      {
        value: 260,
        date: '2020-03-07',
      },
      {
        value: 185,
        date: '2020-03-08',
      },
      {
        value: 164,
        date: '2020-03-09',
      },
      {
        value: 176,
        date: '2020-03-10',
      },
      {
        value: 200,
        date: '2020-03-11',
      },
      {
        value: 290,
        date: '2020-03-12',
      },
    ],
  },
  vv: {
    data: [],
    page: 1,
    pageSize: 10,
    total: 0,
    tableLoading: false,
    echartData: [
      {
        value: 200,
        date: '2020-03-01',
      },
      {
        value: 120,
        date: '2020-03-02',
      },
      {
        value: 250,
        date: '2020-03-03',
      },
      {
        value: 36,
        date: '2020-03-04',
      },
      {
        value: 99,
        date: '2020-03-05',
      },
      {
        value: 46,
        date: '2020-03-06',
      },
      {
        value: 260,
        date: '2020-03-07',
      },
      {
        value: 185,
        date: '2020-03-08',
      },
      {
        value: 164,
        date: '2020-03-09',
      },
      {
        value: 176,
        date: '2020-03-10',
      },
      {
        value: 200,
        date: '2020-03-11',
      },
      {
        value: 290,
        date: '2020-03-12',
      },
    ],
  },
  tabsKey: 'pv',
};

const globalReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.CHANGE_TABSKEY:
      return { ...state, tabsKey: payload };
    case types.CHANGE_PVVV:
      const { tabsKey } = state;
      return { ...state, [tabsKey]: { ...state[tabsKey], ...payload } };
    default:
      return state;
  }
};
export default globalReducer;
