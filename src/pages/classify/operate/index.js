import React from 'react'
import { Button, Modal, Table } from 'antd'
import { columns } from './columns'
import ModalForm from './modal'
import { fetchClassifyList, fetchClassifyDel } from './service'
import './index.less'

class Classify extends React.Component {
  state = {
    tableData: [],
    tableLoading: false
  }
  componentDidMount() {
    this.loadList()
  }
  loadList = async () => {
    this.setState({ tableLoading: true })
    const resClassify = await fetchClassifyList()
    this.setState({
      tableLoading: false,
      tableData: resClassify.data
    })
  }
  handleAdd = () => {
    this.modalFormNode.setData({
      type: 'add'
    })
  }
  handleEdit = record => {
    this.modalFormNode.setData({
      record,
      type: 'edit'
    })
  }
  handleDel = record => {
    Modal.confirm({
      title: '操作提示',
      content: <span style={{ color: 'orangered' }}>是否删除该类别？</span>,
      onOk: async () => {
        const resDel = await fetchClassifyDel({ _id: record._id })
        if (resDel.success) {
          this.loadList()
        }
      }
    })
  }
  render() {
    const { tableData, tableLoading } = this.state
    return (
      <div className="page page-postCreate">
        <ModalForm
          wrappedComponentRef={node => {
            this.modalFormNode = node
          }}
          onLoad={this.loadList}
        />
        <div>
          <Button type="primary" onClick={this.handleAdd}>
            新增
          </Button>
        </div>
        <div style={{ marginTop: 15 }}>
          <Table
            dataSource={tableData}
            columns={columns.call(this)}
            loading={tableLoading}
            size="default"
            rowKey="_id"
            pagination={false}
          />
        </div>
      </div>
    )
  }
}

export default Classify
