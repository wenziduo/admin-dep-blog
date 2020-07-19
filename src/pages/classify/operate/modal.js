import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { put } from 'redux-saga/effects';
import { Modal, Form, Input, Upload } from 'antd';
import actions from './store/action';
import globalActions from '../../../global/store/action';
import { effects } from './store/saga';
import { urlBase } from '../../../utils/qiniuUpload';
import { fileTemplete } from '../../../utils';

const ModalComponent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const classifyStore = useSelector(
    state => state.page_classify_operate_reducer
  );
  const {
    modal: { visible, confirmLoading, type, initForm },
  } = classifyStore;
  const handleCancel = () => {
    dispatch(
      actions.changeModal({
        visible: false,
        initForm: {},
        confirmLoading: false,
        type: null,
      })
    );
    form.resetFields();
  };
  const handleSubmit = () => {
    form.validateFields(['title', 'imgFile']).then(values => {
      dispatch(
        actions.addEditSave({
          ...values,
        })
      );
    });
  };
  const handlecCustomRequest = async params => {
    return params;
  };
  const handleUploadChange = ({ file, fileList }) => {
    file.status = 'success';
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  console.log('initForm', initForm)
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
        onFinish={handleSubmit}
        initialValues={{
          title: initForm.title,
          imgFile: initForm.imgUrl ? [initForm.imgUrl] : [],
          rules: [{ required: true, message: '请上传图片!' }],
        }}
        form={form}
      >
        <Form.Item
          {...formItemLayout}
          label="类别名称"
          name="title"
          rules={[{ required: true, message: '请填写类别名称!' }]}
        >
          <Input style={{ width: 220 }} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="标题图片"
          name="imgFile"
          rules={[{ required: true, message: '请上传图片!' }]}
          valuePropName="fileList"
          getValueFromEvent={e => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
        >
          <Upload
            accept="image/*"
            listType="picture-card"
            customRequest={handlecCustomRequest}
            onPreview={e => {
              console.log('e.thumbUrl', e);
              window.open(e.thumbUrl);
            }}
            onChange={handleUploadChange}
          >
            {(form.getFieldValue('imgFile') || []).length === 0 && (
              <span>+</span>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponent;
