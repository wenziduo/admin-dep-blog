import React, { useState, useEffect } from 'react'
import { Button, Modal, Table } from 'antd'
import { columns } from './columns'
import ModalForm from './modal'
import { fetchClassifyList, fetchClassifyDel } from './service'
import './index.less'

const Classify = ({

}) => {
  let modalFormNode;
  const [tableData, setTableData] = useState([])
  const [tableLoading, setTableLoading] = useState(false)
  useEffect(() => {
    loadList()
  }, [])
  const loadList = async () => {
    setTableLoading(true)
    const resClassify = await fetchClassifyList()
    setTableLoading(false)
    setTableData(resClassify.data)
  }
  const handleAdd = () => {
    modalFormNode.setData({
      type: 'add'
    })
  }
  const handleEdit = record => {
    modalFormNode.setData({
      record,
      type: 'edit'
    })
  }
  const handleDel = record => {
    Modal.confirm({
      title: '操作提示',
      content: <span style={{ color: 'orangered' }}>是否删除该类别？</span>,
      onOk: async () => {
        const resDel = await fetchClassifyDel({ _id: record._id })
        if (resDel.success) {
          loadList()
        }
      }
    })
  }
  const newCcolumns = columns(handleEdit, handleDel);
  return (
    <div className="page page-postCreate">
      <ModalForm
        wrappedComponentRef={node => {
          modalFormNode = node
        }}
        onLoad={loadList}
      />
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
  )
}

export default Classify
