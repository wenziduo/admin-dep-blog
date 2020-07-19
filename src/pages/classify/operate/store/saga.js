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
import { message } from 'antd';
import types from './type';
import actions from './action';
import globalActions from '../../../../global/store/action';
import { effects as globalEffects } from '../../../../global/store/saga';
import {
  fetchClassifyDel,
  fetchClassifyList,
  fetchClassifyAdd,
  fetchClassifyEdit,
} from './service';
import { urlBase } from '../../../../utils/qiniuUpload';

export const effects = {
  *getTableData({ type, payload }) {
    yield put(actions.changeTableLoading(true));
    const res = yield call(fetchClassifyList, payload);
    yield put(actions.changeTableLoading(false));
    if (res.success) {
      yield put(actions.changeTableData(res.data));
    }
  },
  *delClassify({ type, payload }) {
    const res = yield call(fetchClassifyDel, payload);
    if (res.success) {
      message.success('删除成功');
      yield put(actions.getTableData);
    }
  },
  *addEditSave({ payload }) {
    const {
      modal: { type },
    } = yield select(state => state.page_classify_operate_reducer);
    yield put(actions.changeModal({ confirmLoading: true }));
    const fetchRequest = type === 'add' ? fetchClassifyAdd : fetchClassifyEdit;
    console.log('payload', payload)
    let resQiniu = null;
    if (payload.imgFile.length > 0 && !payload.imgFile[0].url) {
      resQiniu = yield call(globalEffects.upload, { payload: payload.imgFile[0].originFileObj })
    }
    console.log('end')
    const params = {
      ...payload,
      imgUrl: resQiniu
              ? `${urlBase}${resQiniu.key}?imageView2/1/w/80/h/80/interlace/1`
              : values.imgFile[0].url,
    };
    const res = yield call(fetchRequest, params);
    yield put(actions.changeModal({ confirmLoading: false }));
    if (res.success) {
      message.success('提交成功');
      yield put(actions.getTableData());
      yield put(actions.changeModal({ visible: false }));
    }
  }
}

function* saga() {
  yield takeEvery(types.GET_TABLEDATA, effects.getTableData);
  yield takeEvery(types.DELETE_CLASSIFY, effects.delClassify);
  yield takeEvery(types.ADD_EDIT_SAVE, effects.addEditSave);
}

export default saga;
