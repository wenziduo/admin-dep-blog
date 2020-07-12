import React, { useState } from 'react'
import {
  Modal,
  Form,
  notification,
  Input,
  Upload,
} from 'antd'
import {
  fetchClassifyAdd,
  fetchClassifyEdit,
  fetchGetQiniuToken
} from './service'
import qiniuUpload, { urlBase } from '../../../utils/qiniuUpload'
import { fileTemplete } from '../../../utils'
const ModalComponent = ({
  onLoad,
  title,
}) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false)
  const [record, setRecord] = useState({})
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [type, setType] = useState(null)
  const setData = data => {
    setRecord(data.record)
    setType(data.type)
    setVisible(true)
  }
  const handleCancel = () => {
    setVisible(false)
    setRecord({})
    setConfirmLoading(false)
    setType(null)
    form.resetFields()
  }
  const handleSubmit = () => {
    form.validateFields(
      ['title', 'imgFile'],
      async (error, values) => {
        if (error) return
        // 编辑的时候
        let resQiniu
        if (!values.imgFile[0].url) {
          const resToken = await fetchGetQiniuToken()
          resQiniu = await qiniuUpload(
            values.imgFile[0].originFileObj,
            resToken.data
          )
        }
        setConfirmLoading(true)
        let res
        if (type === 'add') {
          res = await fetchClassifyAdd({
            ...values,
            imgUrl: resQiniu ? urlBase + resQiniu.key : values.imgFile[0].url,
            imgFile: undefined
          })
        }
        if (type === 'edit') {
          res = await fetchClassifyEdit({
            ...values,
            _id: record._id,
            imgUrl: resQiniu ? `${urlBase}${resQiniu.key}?imageView2/1/w/80/h/80/interlace/1` : values.imgFile[0].url,
            imgFile: undefined
          })
        }
        setConfirmLoading(false)
        if (res.success) {
          notification.success({
            message: '操作提示',
            description: '操作成功！'
          })
          handleCancel()
          onLoad()
        }
      }
    )
  }
  const handlecCustomRequest = async params => {
    return params
  }
  const handleUploadChange = ({ file, fileList }) => {
    file.status = 'success'
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  }
  return (
    <Modal
        visible={visible}
        confirmLoading={confirmLoading}
        title={type === 'add' ? '新增分类' : '编辑分类'}
        onCancel={handleCancel}
        onOk={handleSubmit}
        width="500px"
      >
        <Form
          onSubmit={handleSubmit}
          initialValue={{
            title,
            imgFile: record.imgUrl ? [fileTemplete(record.imgUrl)] : [],
            rules: [{ required: true, message: '请上传图片!' }]
          }}
          form={form}
        >
          <Form.Item {...formItemLayout} label="类别名称" name="title" rules={[{ required: true, message: '请填写类别名称!' }]}>
            <Input style={{ width: 220 }} />
          </Form.Item>
          <Form.Item {...formItemLayout} label="标题图片" name="imgFile" rules={[{ required: true, message: '请上传图片!' }]} valuePropName="fileList"
          getValueFromEvent={e => {
            if (Array.isArray(e)) {
              return e
            }
            return e && e.fileList
          }}>
            <Upload
                accept="image/*"
                listType="picture-card"
                customRequest={handlecCustomRequest}
                onPreview={e => {
                  console.log('e.thumbUrl', e)
                  window.open(e.thumbUrl)
                }}
                onChange={handleUploadChange}
              >
                {(form.getFieldValue('imgFile') || []).length ===
                  0 && <span>+</span>}
              </Upload>
          </Form.Item>
        </Form>
      </Modal>
  )
}

export default ModalComponent
