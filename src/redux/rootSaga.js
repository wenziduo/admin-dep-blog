import { all } from 'redux-saga/effects';
import globalSaga from '../global/store/saga';
import classifyOperateSaga from '../pages/classify/operate/store/saga';
import homeSaga from '../pages/home/store/saga';
import loginSaga from '../pages/login/store/saga';
import postCreateSaga from '../pages/post/create/store/saga';
import postOperateSaga from '../pages/post/operate/store/saga';

export default function* rootSaga() {
  // 同时并发多个
  const rootSagas = [
    globalSaga(),
    classifyOperateSaga(),
    homeSaga(),
    loginSaga(),
    postCreateSaga(),
    postOperateSaga(),
  ];
  yield all(rootSagas);
}
