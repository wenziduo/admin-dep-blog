import React from 'react'
import {
  Modal,
  Form,
  Select,
  Button,
  Input,
  Upload,
  Icon
} from 'antd'
import { fetchClassify, fetchPostAdd, fetchGetQiniuToken, fetchPostEdit } from './service'
import { Notification } from '../../../utils'
import { imgeUrlStrArray } from '../../../utils'
import qiniuUpload from '../../../utils/qiniuUpload'
import { urlBase } from '../../../utils/qiniuUpload'
const Option = Select.Option

class ModalComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      data: [],
      confirmLoading: false,
      record: {}
    }
  }
  handleNext = async () => {
    if (!this.props.stateProps.markdown) {
      Notification.warn('文章不能空')
      return
    }
    this.setState({
      visible: true,
      record: this.props.stateProps
    }, this.props.form.resetFields)
    const res = await fetchClassify()
    this.setState({ data: res.data })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
    this.props.form.resetFields()
  }
  handleSubmit = () => {
    this.props.form.validateFields(
      ['title', 'classifyId', 'imgFile', 'introduction'],
      async (error, values) => {
        console.log('file', new File([this.props.stateProps.text], 'fileText.text', { type: 'text/plain' }))
        if (error) return
        // 获取七牛云key
        const resToken = await fetchGetQiniuToken()
        // text文本上传
        const resTextQiniu = await qiniuUpload(
         new File([this.props.stateProps.text], 'fileText.text', { type: 'text/plain' }),
         resToken.data
        )
        const fileTextUrl = `${urlBase}${resTextQiniu.key}`
        // markdown文本上传
        // 获取七牛云key
        const resMarkdownQiniu = await qiniuUpload(
          new File([this.props.stateProps.markdown], 'fileMarkdown.text', { type: 'text/plain' }),
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
        const fetchSave = this.props.stateProps._id ? fetchPostEdit : fetchPostAdd
        this.setState({ confirmLoading: true })
        const res = await fetchSave({
          ...values,
          markdown: this.props.stateProps.markdown,
          text: this.props.stateProps.text,
          markdownUrl: fileMarkdownUrl,
          textUrl: fileTextUrl,
          imgUrl,
          imgFile: undefined,
          _id: this.props.stateProps._id
        })
        this.setState({ confirmLoading: false })
        if (res.success) {
          if (this.props.stateProps._id) {
            Notification.success('成功修改该文章！')
          } else {
            Notification.success('成功发布该文章！')
          }
          this.handleCancel()
          this.props.onLoad()
        }
      }
    )
  }
  handlecCustomRequest = async params => {
    return params
  }
  handleUploadChange = ({ file, fileList }) => {
    file.status = 'success'
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { visible, data, confirmLoading } = this.state
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
    // console.log('imgFile', this.props.form.getFieldValue('imgFile'))
    console.log('record', this.state.record)
    const fileList = this.props.form.getFieldValue('imgFile') || []
    return (
      <div style={{ textAlign: 'right', marginTop: 15 }}>
        <Button type="primary" onClick={this.handleNext}>
          下一步
        </Button>
        <Modal
          visible={visible}
          confirmLoading={confirmLoading}
          title="选择分类"
          onCancel={this.handleCancel}
          onOk={this.handleSubmit}
          width="500px"
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="文章标题">
              {getFieldDecorator('title', {
                initialValue: this.state.record.title,
                rules: [{ required: true, message: '请填写文章标题!' }]
              })(<Input style={{ width: 220 }} />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="文章类别">
              {getFieldDecorator('classifyId', {
                initialValue: this.state.record.classifyId,
                rules: [{ required: true, message: '请选择分类!' }]
              })(
                <Select style={{ width: 220 }}>
                  {data.map(item => (
                    <Option value={item._id} key={item._id}>
                      {item.title}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="标题图片">
              {getFieldDecorator('imgFile', {
                valuePropName: 'fileList',
                getValueFromEvent: e => {
                  if (Array.isArray(e)) {
                    return e
                  }
                  return e && e.fileList
                },
                initialValue: imgeUrlStrArray(this.state.record.imgUrl),
                rules: [{ required: true, message: '请上传图片!' }]
              })(
                <Upload
                  accept="image/*"
                  listType="picture-card"
                  customRequest={this.handlecCustomRequest}
                  onPreview={e => {
                    console.log('e.thumbUrl', e.thumbUrl)
                    window.open(e.thumbUrl)
                  }}
                  onChange={this.handleUploadChange}
                >
                  {fileList.length === 0 && <span>+</span>}
                </Upload>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="文章简介">
              {getFieldDecorator('introduction', {
                initialValue: (
                  this.props.isEdit ?
                  this.state.record.introduction :
                  (
                    this.state.record.text ? this.state.record.text.substr(0, 100) : null
                  )
                ),
                rules: [{ required: true, message: '请填写文章简介!' }]
              })(<Input.TextArea style={{ width: 220 }} rows={4} maxLength={100} />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(ModalComponent)
