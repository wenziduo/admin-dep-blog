import React, { useState } from 'react'
import {
  Modal,
  Form,
  Select,
  Button,
  Input,
  Upload,
} from 'antd'
import { fetchClassify, fetchPostAdd, fetchGetQiniuToken, fetchPostEdit } from './service'
import { Notification } from '../../../utils'
import { imgeUrlStrArray } from '../../../utils'
import qiniuUpload from '../../../utils/qiniuUpload'
import { urlBase } from '../../../utils/qiniuUpload'
const Option = Select.Option

const ModalComponent = ({
  stateProps,
  onLoad,
  isEdit,
}) => {
  const [form] = Form.useForm();
  const { visible, setVisible } = useState(false)
  const { data, setData } = useState([])
  const { confirmLoading, setConfirmLoading } = useState(false)
  const { record, setRecord } = useState({})
  const handleNext = async () => {
    if (!stateProps.markdown) {
      Notification.warn('文章不能空')
      return
    }
    setVisible(true)
    setRecord(stateProps)
    setVisible(true)
    setRecord(stateProps)
    form.resetFields()
    const res = await fetchClassify()
    setData(res.data)
  }
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }
  const handleSubmit = () => {
    form.validateFields(
      ['title', 'classifyId', 'imgFile', 'introduction'],
      async (error, values) => {
        console.log('file', new File([stateProps.text], 'fileText.text', { type: 'text/plain' }))
        if (error) return
        // 获取七牛云key
        const resToken = await fetchGetQiniuToken()
        // text文本上传
        const resTextQiniu = await qiniuUpload(
          new File([stateProps.text], 'fileText.text', { type: 'text/plain' }),
          resToken.data
        )
        const fileTextUrl = `${urlBase}${resTextQiniu.key}`
        // markdown文本上传
        // 获取七牛云key
        const resMarkdownQiniu = await qiniuUpload(
          new File([stateProps.markdown], 'fileMarkdown.text', { type: 'text/plain' }),
          resToken.data
        )
        const fileMarkdownUrl = `${urlBase}${resMarkdownQiniu.key}`
        // 图片上传
        // 获取七牛云key
        let imgUrl
        if (values.imgFile.length > 0 && values.imgFile[0].originFileObj) {
          const resImgQiniu = await qiniuUpload(
            values.imgFile[0].originFileObj,
            resToken.data
          )
          imgUrl = `${urlBase}${resImgQiniu.key}?imageView2/1/w/120/h/120/interlace/1`
        }
        if (values.imgFile.length > 0 && !values.imgFile[0].originFileObj) {
          imgUrl = values.imgFile[0].url
        }
        const fetchSave = stateProps._id ? fetchPostEdit : fetchPostAdd
        setConfirmLoading(true)
        const res = await fetchSave({
          ...values,
          markdown: stateProps.markdown,
          text: stateProps.text,
          markdownUrl: fileMarkdownUrl,
          textUrl: fileTextUrl,
          imgUrl,
          imgFile: undefined,
          _id: stateProps._id
        })
        setConfirmLoading(false)
        if (res.success) {
          if (stateProps._id) {
            Notification.success('成功修改该文章！')
          } else {
            Notification.success('成功发布该文章！')
          }
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
  const fileList = form.getFieldValue('imgFile') || []
  return (
    <div style={{ textAlign: 'right', marginTop: 15 }}>
      <Button type="primary" onClick={handleNext}>
        下一步
      </Button>
      <Modal
        visible={visible}
        confirmLoading={confirmLoading}
        title="选择分类"
        onCancel={handleCancel}
        onOk={handleSubmit}
        width="500px"
      >
        <Form onFinish={handleSubmit} initialValues={{
          title: record.title,
          classifyId: record.classifyId,
          imgFile: imgeUrlStrArray(record.imgUrl),
          introduction: isEdit ?
            record.introduction :
            (
              record.text ? record.text.substr(0, 100) : null
            )
        }}>
          <Form.Item {...formItemLayout} label="文章标题"
            name="title"
            rules={[{ required: true, message: '请填写文章标题!' }]}
          >
            <Input style={{ width: 220 }} />
          </Form.Item>
          <Form.Item {...formItemLayout} label="文章类别" name="classifyId"
            rules={[{ required: true, message: '请选择分类!' }]}>
            <Select style={{ width: 220 }}>
              {data.map(item => (
                <Option value={item._id} key={item._id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item {...formItemLayout} label="标题图片" name="imgFile" valuePropName="fileList"
            getValueFromEvent={e => {
              if (Array.isArray(e)) {
                return e
              }
              return e && e.fileList
            }}
            rules={[{ required: true, message: '请上传图片!' }]}>
            <Upload
              accept="image/*"
              listType="picture-card"
              customRequest={handlecCustomRequest}
              onPreview={e => {
                console.log('e.thumbUrl', e.thumbUrl)
                window.open(e.thumbUrl)
              }}
              onChange={handleUploadChange}
            >
              {fileList.length === 0 && <span>+</span>}
            </Upload>
          </Form.Item>
          <Form.Item {...formItemLayout} label="文章简介" name="introduction" rules={[{ required: true, message: '请填写文章简介!' }]}>
            <Input.TextArea style={{ width: 220 }} rows={4} maxLength={100} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ModalComponent
