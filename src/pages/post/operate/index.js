import React from 'react'
import { Modal, Table } from 'antd'
import { columns } from './columns'
import { fetchClassifyList, fetchClassifyDel } from './service'
import './index.less'
// const FormItem = Form.Item

class Operate extends React.Component {
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
      <div className="page page-post-operate">
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

export default Operate
