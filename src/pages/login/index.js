import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { fetchLogin } from './service'
import './index.less'
const FormItem = Form.Item
const Login = ({
  
}) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false)
    const handleSubmit = async (values) => {
    setConfirmLoading(true)
    const resp = await fetchLogin(values)
    setConfirmLoading(false)
    if (resp.success) {
      window.location.replace('/')
    }
  }
  const { validateFields } = form;
  return (
    <div className="page page-login">
      <div className="page-login-box">
      <Form onFinish={handleSubmit} form={form}>
        <FormItem label='用户名' name="userName" rules={[{ required: true, message: '用户名必填' }]}>
        <Input placeholder='请输入用户名' />
        </FormItem>

        <FormItem label='密码' name="passWord" rules={[{ required: true, message: '密码必填' }]}>
        <Input placeholder='请输入密码' type="password" />
        </FormItem>

        <FormItem>
          <Button htmlType='submit' type="primary" size="large" style={{ width: '100%' }} loading={confirmLoading}>登录</Button>
        </FormItem>
      </Form>
      </div>
    </div>
  )
}

export default Login
