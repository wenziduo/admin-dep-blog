import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Table } from 'antd';
import { columns } from './columns';
import ModalForm from './modal';
import actions from './store/action';
import { fileTemplete } from '../../../utils';
import './index.less';

const Classify = () => {
  const dispatch = useDispatch();
  const classifyOperateStore = useSelector(
    state => state.page_classify_operate_reducer
  );
  const { tableData, tableLoading } = classifyOperateStore;
  useEffect(() => {
    loadList();
  }, []);
  const loadList = async () => {
    dispatch(actions.getTableData());
  };
  const handleAdd = () => {
    dispatch(
      actions.changeModal({
        type: 'add',
        visible: true,
        initForm: {},
        currentItem: {},
      })
    );
  };
  const handleEdit = record => {
    dispatch(
      actions.changeModal({
        visible: true,
        type: 'edit',
        initForm: { title: record.title, imgUrl: fileTemplete(record.imgUrl) },
        currentItem: record,
      })
    );
  };
  const handleDel = record => {
    Modal.confirm({
      title: '操作提示',
      content: <span style={{ color: 'orangered' }}>是否删除该类别？</span>,
      onOk: () => {
        return dispatch(actions.delClassify({ _id: record._id }));
      },
    });
  };
  const newCcolumns = columns(handleEdit, handleDel);
  return (
    <div className="page page-postCreate">
      <ModalForm />
      <div>
        <Button type="primary" onClick={handleAdd}>
          新增
        </Button>
      </div>
      <div style={{ marginTop: 15 }}>
        <Table
          dataSource={tableData}
          columns={newCcolumns}
          loading={tableLoading}
          size="default"
          rowKey="_id"
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Classify;
