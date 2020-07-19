import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MarkdownEditor from 'for-editor';
import { getUrlParam } from '../../../utils';
import ModalForm from './modal';
import actions from './store/action';
import './index.less';
let timer;

const PostCreate = () => {
  let markdownNode;
  const dispatch = useDispatch();
  const thisStore = useSelector(state => state.page_post_create_reducer);
  const {
    app: { markdown, text, isEdit },
  } = thisStore;
  const setPropsApp = args => {
    dispatch(actions.changeApp(args));
  };
  useEffect(() => {
    handleDefault();
  }, []);
  const handleDefault = async () => {
    const id = getUrlParam('id');
    setPropsApp({ type: id ? 'edit' : 'add', _id: id });
    if (isEdit === 'edit') {
      dispatch(actions.loadPostDetail({ _id: id }));
      getText();
    }
  };
  const updateMarkdown = value => {
    setPropsApp({ markdown: value });
    getText();
  };
  // 获取解析后的text
  const getText = () => {
    clearTimeout(timer);
    let markdownEle = markdownNode
    timer = setTimeout(() => {
      setPropsApp({
        text: markdownEle.$blockPreview.current.innerText,
      });
    }, 300);
  };
  // 上传图片
  const handleAddImg = e => {
    console.log(e);
  };
  console.log('markdown', markdown);
  return (
    <div className="page page-postCreate">
      <MarkdownEditor
        ref={node => {
          markdownNode = node;
        }}
        value={markdown}
        onChange={updateMarkdown}
        addImg={handleAddImg}
        preview
        subfield
        height={700}
      />
      <ModalForm />
    </div>
  );
};

export default PostCreate;
