import React from 'react'
import { Modal, Table, Card, Icon, Avatar } from 'antd'
import { columns } from './columns'
import { fetchPostList, fetchPostDel } from './service'
import { Notification } from '../../../utils'
import moment from 'moment'
import './index.less'
// const FormItem = Form.Item
const { Meta } = Card;

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
    const resClassify = await fetchPostList()
    this.setState({
      tableLoading: false,
      tableData: resClassify.data
    })
  }
  handleDel = record => {
    Modal.confirm({
      title: '操作提示',
      content: <span style={{ color: 'orangered' }}>是否删除该文章？</span>,
      onOk: async () => {
        const resDel = await fetchPostDel({ _id: record._id })
        if (resDel.success) {
          this.loadList()
          Notification.success('删除成功')
        }
      }
    })
  }
  handleEdit = (record) => {
    this.props.history.push(`/post/operate/edit?id=${record._id}`)
  }
  handleView = (record) => {
    window.open(`http://blog.douerpiao.club/post/detail?id=${record._id}`)
  }
  render() {
    const { tableData, tableLoading } = this.state
    return (
      <div className="page page-post-operate">
        <div style={{ marginTop: 15 }} style={{ display: 'flex', flexWrap: 'wrap' }}>
          {
            tableData.map(item => (
              <Card
                key={item._id}
                style={{ width: 300, margin: 5 }}
                actions={[
                  <i className="iconfont iconview" onClick={this.handleView.bind(this, item)} />,
                  <i className="iconfont iconedit" onClick={this.handleEdit.bind(this, item)} />,
                  <i className="iconfont icondel" onClick={this.handleDel.bind(this, item)} />,
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
                        overflow: 'hidden', /*超出部分隐藏*/
                        textOverflow: 'ellipsis', /*文字超出部分以省略号显示*/
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                      }}
                    >
                     <strong>{item.title}</strong>
                    </div>
                    <div style={{ fontSize: 10, color: '#aaa' }}>
                      {item.author}于{moment(item.createTime).format('YYYY-MM-DD HH:mm')}创建
                    </div>
                  </div>
                }
              />
              </Card>
            ))
          }
          {/* <Table
            dataSource={tableData}
            columns={columns.call(this)}
            loading={tableLoading}
            size="default"
            rowKey="_id"
            pagination={false}
          /> */}
        </div>
      </div>
    )
  }
}

export default Operate
