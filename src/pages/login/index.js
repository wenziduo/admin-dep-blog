import React from 'react'
import { Form, Input, Button } from 'antd'
import { fetchLogin } from './service'
import './index.less'
const FormItem = Form.Item
class Login extends React.Component {
  state = {
    confirmLoading: false
  }
  handleSubmit = async (values) => {
    this.setState({ confirmLoading: true })
    const resp = await fetchLogin(values)
    this.setState({ confirmLoading: false })
    if (resp.success) {
      window.location.replace('/')
    }
  }
  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const { confirmLoading } = this.state
    return (
      <div className="page page-login">
        <div className="page-login-box">
        <Form onSubmit={e => {
          e.preventDefault();
          validateFields((err, values) => {
            if (!err) {
              this.handleSubmit(values)
            }
          });
        }}>
          <FormItem label='用户名'>
            {
              getFieldDecorator('userName', {
                rules: [{ required: true, message: '用户名必填' }],
              })(
                <Input placeholder='请输入用户名' />
              )
            }
          </FormItem>

          <FormItem label='密码'>
            {
              getFieldDecorator('passWord', {
                rules: [{ required: true, message: '密码必填' }],
              })(
                <Input placeholder='请输入密码' type="password" />
              )
            }
          </FormItem>

          <FormItem>
            <Button htmlType='submit' type="primary" size="large" style={{ width: '100%' }} loading={confirmLoading}>登录</Button>
          </FormItem>
        </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)
