import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Card, Avatar, Spin, Pagination } from 'antd';
import actions from './store/action';
import moment from 'moment';
import './index.less';

const { Meta } = Card;

const Operate = ({ history }) => {
  const dispatch = useDispatch();
  const thisStore = useSelector(state => state.page_post_operate_reducer);
  const setPropsApp = args => {
    dispatch(actions.changeApp(args));
  };
  const {
    app: { page, pageSize, total, data, loading },
  } = thisStore;
  useEffect(() => {
    loadList();
  }, []);
  const loadList = () => {
    const params = {
      page,
      pageSize,
    };
    dispatch(actions.fetchPostList(params));
  };
  const handleDel = record => {
    Modal.confirm({
      title: '操作提示',
      content: <span style={{ color: 'orangered' }}>是否删除该文章？</span>,
      onOk: () => {
        return dispatch(actions.loadPostDelete({ _id: record._id }));
      },
    });
  };
  const handleEdit = record => {
    history.push(`/post/operate/edit?id=${record._id}`);
  };
  const handleView = record => {
    window.open(`http://blog.douerpiao.club/post/detail?id=${record._id}`);
  };
  const handleChangePage = page => {
    setPropsApp({ page }, loadList);
  };
  const handleChangePageSize = (page, pageSize) => {
    setPropsApp({ page, pageSize }, loadList);
  };
  return (
    <div className="page page-post-operate">
      <Spin spinning={loading}>
        <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: 400 }}>
          {data.map(item => (
            <Card
              key={item._id}
              style={{ width: 300, margin: 5 }}
              actions={[
                <i
                  className="iconfont iconview"
                  onClick={handleView.bind(this, item)}
                />,
                <i
                  className="iconfont iconedit"
                  onClick={handleEdit.bind(this, item)}
                />,
                <i
                  className="iconfont icondel"
                  onClick={handleDel.bind(this, item)}
                />,
              ]}
            >
              <Meta
                avatar={<Avatar shape="square" src={item.imgUrl} size={80} />}
                description={
                  <div>
                    <div
                      style={{
                        letterSpacing: 0,
                        width: 154,
                        height: 70,
                        overflow: 'hidden' /*超出部分隐藏*/,
                        textOverflow: 'ellipsis' /*文字超出部分以省略号显示*/,
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                      }}
                    >
                      <strong>{item.title}</strong>
                    </div>
                    <div style={{ fontSize: 10, color: '#aaa' }}>
                      {item.author}于
                      {moment(item.createTime).format('YYYY-MM-DD HH:mm')}创建
                    </div>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
        <div style={{ padding: '8px 0 5px 5px' }}>
          <Pagination
            {...{
              current: page,
              pageSize,
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: [
                '10',
                '20',
                '50',
                '100',
                '500',
                '1000',
                '10000',
                '50000',
                '100000',
              ],
              total,
              onChange: handleChangePage,
              onShowSizeChange: handleChangePageSize,
              showTotal: (totalNum, range) =>
                `显示 ${range[0]} 到 ${range[1]},共有 ${totalNum} 条记录`,
            }}
          />
        </div>
      </Spin>
    </div>
  );
};

export default Operate;
