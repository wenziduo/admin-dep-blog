import uuid from './uuid';
const qiniu = require('qiniu-js');

const putExtra = {
  fname: '',
  params: {},
  mimeType: ['image/png', 'image/jpeg', 'image/gif', 'text/plain'],
};
const config = {
  useCdnDomain: true,
  // region: qiniu.region.z2
};
export const urlBase = '//wenzi.douerpiao.club/';
function qiniuUpload(file, token) {
  console.log('file, token', file, token);
  const key = uuid();
  const observable = qiniu.upload(file, key, token, putExtra, config);
  return new Promise((resolve, reject) => {
    observable.subscribe({
      next(res) {
        // ...
      },
      error(err) {
        reject(err);
      },
      complete(res) {
        resolve(res);
      },
    });
  });
}

export default qiniuUpload;
