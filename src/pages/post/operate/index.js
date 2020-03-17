import React from 'react'
import { Modal, Table, Card, Icon, Avatar, Spin, Pagination } from 'antd'
import { columns } from './columns'
import { fetchPostList, fetchPostDel } from './service'
import { Notification } from '../../../utils'
import moment from 'moment'
import './index.less'
// const FormItem = Form.Item
const { Meta } = Card;

class Operate extends React.Component {
  state = {
    page: 1,
    pageSize: 20,
    total: 0,
    data: [],
    loading: false
  }
  componentDidMount() {
    this.loadList()
  }
  loadList = async () => {
    const { page, pageSize } = this.state
    const params = {
      page, pageSize
    }
    this.setState({ loading: true })
    const resClassify = await fetchPostList(params)
    if (resClassify.success && resClassify.data) {
      this.setState({
        loading: false,
        data: resClassify.data.data || [],
        page: resClassify.data.page,
        pageSize: resClassify.data.pageSize,
        total: resClassify.data.total,
      })
    }
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
  handleChangePage = (page) => {
    this.setState({ page }, this.loadList)
  }
  handleChangePageSize = (page, pageSize) => {
    this.setState({ page, pageSize }, this.loadList)
  }
  render() {
    const { data, loading, page, pageSize, total } = this.state
    return (
      <div className="page page-post-operate">
        <Spin spinning={loading}>
          <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: 400 }}>
            {
              data.map(item => (
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
          </div>
          <div style={{ padding: '8px 0 5px 5px' }}>
            <Pagination
              {...{
                current: page,
                pageSize,
                showQuickJumper: true,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '100', '500', '1000', '10000', '50000', '100000'],
                total,
                onChange: this.handleChangePage,
                onShowSizeChange: this.handleChangePageSize,
                showTotal: (totalNum, range) =>
                  `显示 ${range[0]} 到 ${range[1]},共有 ${totalNum} 条记录`,
              }}
            />
          </div>
        </Spin>
      </div>
    )
  }
}

export default Operate
