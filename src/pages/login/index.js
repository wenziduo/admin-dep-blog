import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import loginActions from './store/action';
import './index.less';
const FormItem = Form.Item;
const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { confirmLoading } = useSelector(state => state.page_login_reducer);
  const handleSubmit = async values => {
    dispatch(loginActions.login(values));
  };
  return (
    <div className="page page-login">
      <div className="page-login-box">
        <Form onFinish={handleSubmit} form={form}>
          <FormItem
            label="用户名"
            name="userName"
            rules={[{ required: true, message: '用户名必填' }]}
          >
            <Input placeholder="请输入用户名" />
          </FormItem>

          <FormItem
            label="密码"
            name="passWord"
            rules={[{ required: true, message: '密码必填' }]}
          >
            <Input placeholder="请输入密码" type="password" />
          </FormItem>

          <FormItem>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              style={{ width: '100%' }}
              loading={confirmLoading}
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default Login;
