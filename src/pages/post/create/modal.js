import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Select, Button, Input, Upload } from 'antd';
import { Notification } from '../../../utils';
import { imgeUrlStrArray } from '../../../utils';
import { urlBase } from '../../../utils/qiniuUpload';
import actions from './store/action';
import globalActions from '../../../global/store/action';
const Option = Select.Option;

const ModalComponent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const thisStore = useSelector(state => state.page_post_create_reducer);
  const setPropsModal = args => {
    dispatch(actions.changeModal(args));
  };
  const {
    app: { markdown, text, type, _id },
    modal: { visible, classifyData, confirmLoading },
  } = thisStore;
  const handleNext = async () => {
    if (!markdown) {
      Notification.warn('文章不能空');
      return;
    }
    setPropsModal({
      visible: true,
    });
    form.resetFields();
    dispatch(actions.loadClassify());
  };
  const handleCancel = () => {
    setPropsModal({ visible: false });
    form.resetFields();
  };
  const handleSubmit = () => {
    form.validateFields(
      ['title', 'classifyId', 'imgFile', 'introduction'],
      async (error, values) => {
        if (error) return;
        const resTextQiniu = await dispatch(
          globalActions.upload(
            new File([text], 'fileText.text', { type: 'text/plain' })
          )
        );
        const resMarkdownQiniu = await dispatch(
          globalActions.upload(
            new File([markdown], 'fileMarkdown.text', { type: 'text/plain' })
          )
        );
        const fileTextUrl = `${urlBase}${resTextQiniu.key}`;
        const fileMarkdownUrl = `${urlBase}${resMarkdownQiniu.key}`;
        let imgUrl;
        if (values.imgFile.length > 0 && values.imgFile[0].originFileObj) {
          const resImgQiniu = await dispatch(
            globalActions.upload(values.imgFile[0].originFileObj)
          );
          imgUrl = `${urlBase}${resImgQiniu.key}?imageView2/1/w/120/h/120/interlace/1`;
        }
        if (values.imgFile.length > 0 && !values.imgFile[0].originFileObj) {
          imgUrl = values.imgFile[0].url;
        }
        setPropsModal({ confirmLoading: true });
        dispatch(
          actions.loadSave({
            ...values,
            markdown: markdown,
            text: text,
            markdownUrl: fileMarkdownUrl,
            textUrl: fileTextUrl,
            imgUrl,
            imgFile: undefined,
            _id,
          })
        );
      }
    );
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
  const fileList = form.getFieldValue('imgFile') || [];
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
        <Form
          onFinish={handleSubmit}
          initialValues={{
            title: record.title,
            classifyId: record.classifyId,
            imgFile: imgeUrlStrArray(record.imgUrl),
            introduction:
              type === 'edit'
                ? record.introduction
                : record.text
                ? record.text.substr(0, 100)
                : null,
          }}
        >
          <Form.Item
            {...formItemLayout}
            label="文章标题"
            name="title"
            rules={[{ required: true, message: '请填写文章标题!' }]}
          >
            <Input style={{ width: 220 }} />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="文章类别"
            name="classifyId"
            rules={[{ required: true, message: '请选择分类!' }]}
          >
            <Select style={{ width: 220 }}>
              {classifyData.map(item => (
                <Option value={item._id} key={item._id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="标题图片"
            name="imgFile"
            valuePropName="fileList"
            getValueFromEvent={e => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            rules={[{ required: true, message: '请上传图片!' }]}
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              customRequest={handlecCustomRequest}
              onPreview={e => {
                console.log('e.thumbUrl', e.thumbUrl);
                window.open(e.thumbUrl);
              }}
              onChange={handleUploadChange}
            >
              {fileList.length === 0 && <span>+</span>}
            </Upload>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="文章简介"
            name="introduction"
            rules={[{ required: true, message: '请填写文章简介!' }]}
          >
            <Input.TextArea style={{ width: 220 }} rows={4} maxLength={100} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalComponent;
