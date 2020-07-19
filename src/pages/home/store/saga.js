/**
 * @author caiwenduio
 * @file 全局的saga
 */
import {
  take,
  call,
  put,
  select,
  fork,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import types from './type';
import actions from './action';
import { fetchStatistics } from './service';

function* getPvVv({ type, payload }) {
  yield put(actions.changePvVv({ tableLoading: true }));
  const res = yield call(fetchStatistics, payload);
  yield put(actions.changePvVv({ tableLoading: false }));
  if (res.success) {
    yield put(
      actions.changePvVv({
        data: res.data.data,
        page: res.data.page,
        pageSize: res.data.pageSize,
        total: res.data.total,
      })
    );
  }
}

function* saga() {
  yield takeEvery(types.GET_PV_VV, getPvVv);
}

export default saga;
