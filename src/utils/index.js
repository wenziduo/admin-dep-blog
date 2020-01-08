import uuid from './uuid'

export const fileTemplete = url => {
  return {
    uid: uuid(),
    status: 'success',
    thumbUrl: url,
    url
  }
}
