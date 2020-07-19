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
import { fetchGetUser, fetchLogout, fetchGetQiniuToken } from './service';
import qiniuUpload from '../../utils/qiniuUpload';
import { message } from 'antd';
export const effects = {
  *getUserInfo({ type, payload }) {
    const res = yield call(fetchGetUser, payload);
    if (res.success) {
      yield put(actions.appendUserInfo(res.data));
    }
  },
  *logOut({ type, payload }) {
    const res = yield call(fetchLogout, payload);
    if (res.success) {
      message.success('成功退出');
      yield put(actions.getUserInfo);
    }
  },
  *getQiniu({ type, payload }) {
    const res = yield call(fetchGetQiniuToken, payload);
    if (res.data) {
      yield put(actions.changeQiniu({ token: res.data }));
    }
  },
  *upload({ type, payload }) {
    console.log('start - upload');
    const {
      qiniu: { token: oldToken },
    } = yield select(state => state.global_reducer);
    if (!oldToken) {
      console.log('fetchGetQiniuToken', fetchGetQiniuToken);
      const res = yield call(fetchGetQiniuToken);
      if (res.data) {
        yield put(actions.changeQiniu({ token: res.data }));
      }
    }
    const {
      qiniu: { token: newToken },
    } = yield select(state => state.global_reducer);
    const resp = yield call(qiniuUpload, payload, newToken);
    console.log('end - upload');
    return resp;
  },
};

function* globalSaga() {
  yield takeEvery(types.GLOBAL_GETUSERINFO, effects.getUserInfo);
  yield takeEvery(types.GLOBAL_LOGOUT, effects.logOut);
  yield takeEvery(types.GLOBAL_UPLOAD, effects.upload);
}

// 使用数组导出
// const listens = [globalSaga()];
export default globalSaga;
