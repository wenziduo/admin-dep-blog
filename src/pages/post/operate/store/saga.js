/**
 * @author caiwenduio
 * @file saga
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
import { Notification } from '../../../../utils';
import actions from './action';
import service from './service';

function* loadPostList({ type, payload }) {
  yield put(actions.changeApp({ loading: true }));
  const res = yield call(service.fetchPostList, payload);
  yield put(actions.changeApp({ loading: false }));
  if (res.success) {
    yield put(
      actions.changeApp({
        data: res.data.data,
        page: res.data.page,
        pageSize: res.data.pageSize,
        total: res.data.total,
      })
    );
  }
}

function* loadPostDelete({ type, payload }) {
  const {
    app: { page, pageSize },
  } = yield select(satte => satte.page_post_operate_reducer);
  const res = yield put(actions.loadPostDelete(payload));
  if (res.success) {
    Notification.success('删除成功');
    yield put(actions.loadPostList({ page, pageSize }));
  }
  return res;
}

function* saga() {
  yield takeEvery(types.LOAD_POST_LIST, loadPostList);
  yield takeEvery(types.LOAD_POST_DELETE, loadPostDelete);
}

export default saga;
