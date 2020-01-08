import React from 'react'
import {
  Modal,
  Form,
  Select,
  Button,
  notification,
  Input,
  Upload,
  Icon
} from 'antd'
import {
  fetchClassifyAdd,
  fetchClassifyEdit,
  fetchGetQiniuToken
} from './service'
import qiniuUpload, { urlBase } from '../../../utils/qiniuUpload'
// import { urlBase } from '../../../utils/qiniuUpload'
import { fileTemplete } from '../../../utils'
const Option = Select.Option

const initState = {
  visible: false,
  record: {},
  confirmLoading: false,
  type: ''
}
class ModalComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = initState
  }
  setData = data => {
    this.setState({
      ...data,
      visible: true
    })
  }
  handleCancel = () => {
    this.setState({
      ...initState
    })
    this.props.form.resetFields()
  }
  handleSubmit = () => {
    this.props.form.validateFields(
      ['title', 'imgFile'],
      async (error, values) => {
        if (error) return
        console.log('values', values)
        const { type, record } = this.state
        // 编辑的时候
        let resQiniu
        if (!values.imgFile[0].url) {
          const resToken = await fetchGetQiniuToken()
          resQiniu = await qiniuUpload(
            values.imgFile[0].originFileObj,
            resToken.data
          )
        }
        this.setState({ confirmLoading: true })
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
            imgUrl: resQiniu ? urlBase + resQiniu.key : values.imgFile[0].url,
            imgFile: undefined
          })
        }
        this.setState({ confirmLoading: false })
        if (res.success) {
          notification.success({
            message: '操作提示',
            description: '操作成功！'
          })
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
    const { visible, record, confirmLoading, type } = this.state
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
    // const fileList = this.props.form.getFieldValue('imgFile') || []
    return (
      <Modal
        visible={visible}
        confirmLoading={confirmLoading}
        title={type === 'add' ? '新增分类' : '编辑分类'}
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
        width="500px"
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="类别名称">
            {getFieldDecorator('title', {
              initialValue: record.title,
              rules: [{ required: true, message: '请填写类别名称!' }]
            })(<Input style={{ width: 220 }} />)}
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
              initialValue: record.imgUrl ? [fileTemplete(record.imgUrl)] : [],
              rules: [{ required: true, message: '请上传图片!' }]
            })(
              <Upload
                accept="image/*"
                listType="picture-card"
                customRequest={this.handlecCustomRequest}
                onPreview={e => {
                  console.log('e.thumbUrl', e)
                  window.open(e.thumbUrl)
                }}
                onChange={this.handleUploadChange}
                onRemove={this.handleRemove}
              >
                {(this.props.form.getFieldValue('imgFile') || []).length ===
                  0 && <span>+</span>}
              </Upload>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(ModalComponent)
