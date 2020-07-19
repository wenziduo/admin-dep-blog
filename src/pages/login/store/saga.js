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
import { fetchLogin } from './service';

function* login({ type, payload }) {
  yield put(actions.changeConfirmLoading(true));
  const res = yield call(fetchLogin, payload);
  yield put(actions.changeConfirmLoading(false));
  if (res.success) {
    window.location.replace('/');
  }
}

function* loginSaga() {
  yield takeEvery(types.LOGIN_LOGIN, login);
}

export default loginSaga;
