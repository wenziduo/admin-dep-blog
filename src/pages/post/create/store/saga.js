import { Modal } from 'antd';
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
import {
  fetchPostDetail,
  fetchClassify,
  fetchPostAdd,
  fetchPostEdit,
} from './service';

function* loadClassify({ type, payload }) {
  const res = yield call(fetchClassify, payload);
  if (res.success) {
    yield put(actions.changeModal({ classifyData: res.data }));
  }
}

function* loadPostDetail({ type, payload }) {
  const res = yield call(fetchPostDetail, payload);
  if (res.success) {
    yield put(actions.changeApp({ markdown: res.data.markdown }));
  }
}

function* loadSave({ payload }) {
  const {
    app: { type, _id },
  } = yield select(state => state.page_post_create_reducer);
  const fetchRequest = type === 'edit' ? fetchPostEdit : fetchPostAdd;
  yield put(actions.changeApp({ confirmLoading: true }));
  const res = yield call(fetchRequest, payload);
  yield put(actions.changeApp({ confirmLoading: false }));
  if (res.success) {
    if (type === 'edit') {
      Notification.success('成功修改该文章！');
    } else {
      Notification.success('成功发布该文章！');
    }
    yield put(actions.changeModal({ visible: false }));
    yield put(actions.loadPostDetail({ _id }));
  }
}
function* globalSaga() {
  yield takeEvery(types.LOAD_POST_DETAIL, loadPostDetail);
  yield takeEvery(types.LOAD_CLASSIFY, loadClassify);
  yield takeEvery(types.LOAD_SAVE, loadSave);
}

export default globalSaga;
