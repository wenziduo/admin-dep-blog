import { Upload, Modal } from 'antd';
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
import { effects as globalEffects } from '../../../../global/store/saga';
import globalActions from '../../../../global/store/action';
import { urlBase } from '../../../../utils/qiniuUpload';
import { Notification } from '../../../../utils';

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
    app: { type, _id, text, markdown },
  } = yield select(state => state.page_post_create_reducer);
  console.log('text, markdown', text, markdown);
  // const [resTextQiniu, resMarkdownQiniu] = yield [
  //   call(globalEffects.upload, {
  //     payload: new File([text], 'fileText.text', { type: 'text/plain' }),
  //   }),
  //   call(globalEffects.upload, {
  //     payload: new File([markdown], 'fileMarkdown.text', {
  //       type: 'text/plain',
  //     }),
  //   }),
  // ];
  const resTextQiniu = yield call(globalEffects.upload, {
    payload: new File([text], 'fileText.text', { type: 'text/plain' }),
  })
  const resMarkdownQiniu = yield call(globalEffects.upload, {
    payload: new File([markdown], 'fileMarkdown.text', {
      type: 'text/plain',
    }),
  })
  console.log('resTextQiniu', resTextQiniu);
  console.log('resMarkdownQiniu', resMarkdownQiniu);
  const fileTextUrl = `${urlBase}${resTextQiniu.key}`;
  const fileMarkdownUrl = `${urlBase}${resMarkdownQiniu.key}`;
  let imgUrl;
  if (payload.imgFile.length > 0 && payload.imgFile[0].originFileObj) {
    const resImgQiniu = yield call(
      globalActions.upload,
      payload.imgFile[0].originFileObj
    );
    imgUrl = `${urlBase}${resImgQiniu.key}?imageView2/1/w/120/h/120/interlace/1`;
  }
  if (payload.imgFile.length > 0 && !payload.imgFile[0].originFileObj) {
    imgUrl = payload.imgFile[0].url;
  }

  const params = {
    ...payload,
    markdown: markdown,
    text: text,
    markdownUrl: fileMarkdownUrl,
    textUrl: fileTextUrl,
    imgUrl,
    imgFile: undefined,
    _id,
  };
  const fetchRequest = type === 'edit' ? fetchPostEdit : fetchPostAdd;
  yield put(actions.changeModal({ confirmLoading: true }));
  const res = yield call(fetchRequest, params);
  yield put(actions.changeModal({ confirmLoading: false }));
  if (res.success) {
    if (type === 'edit') {
      Notification.success('成功修改该文章！');
    } else {
      Notification.success('成功发布该文章！');
    }
    yield put(actions.changeModal({ visible: false }));
    yield fork(actions.loadPostDetail({ _id }));
  }
}
function* saga() {
  yield takeEvery(types.LOAD_POST_DETAIL, loadPostDetail);
  yield takeEvery(types.LOAD_CLASSIFY, loadClassify);
  yield takeEvery(types.LOAD_SAVE, loadSave);
}

export default saga;
