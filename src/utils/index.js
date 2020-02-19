import uuid from './uuid'
import { Modal, notification } from 'antd'

export const fileTemplete = url => {
  return {
    uid: uuid(),
    status: 'success',
    thumbUrl: url,
    url
  }
}

// 图片url字符串转化成数组
export function imgeUrlStrArray(imageUrl) {
  if (imageUrl === '' || imageUrl === null || imageUrl === undefined) {
    return [];
  }
  const imageList = imageUrl.split(',');
  const newImageList = imageList.map((item, index) => {
    return {
      url: item,
      status: 'done',
      thumbUrl: item,
      uid: -index,
    };
  });
  return newImageList;
}

export const modalConfirm = () => {
  Modal.confirm({
    title: '操作提示',
    content: '',
    onOk: async () => {
      this.props.dispatch({
        type: '',
        payload: {}
      })
    }
  })
}

export const Notification = {
  success: (description) => { return notification.success({ duration: 5, message: '操作提示', description }) },
  warn: (description) => { return notification.warn({ duration: 5, message: '操作提示', description }) },
  error: (description) => { return notification.error({ duration: 5, message: '错误提示', description }) },
}

export const getUrlParam = (name, url) => {
  if (!name) {
    return '';
  }
  url = url || window.location.search || window.location.hash;
  name = name.replace(/(?=[\\^$*+?.():|{}])/, '\\');
  const reg = new RegExp('(?:[?&]|^)' + name + '=([^?&#]*)', 'i');
  const match = url.match(reg);
  return !match ? '' : decodeURIComponent(match[1]);
};
