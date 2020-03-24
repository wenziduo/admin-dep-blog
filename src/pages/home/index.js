import React from 'react'
import { Card, Tabs, Table } from 'antd'
import { EchartLine } from '../../component'
import { fetchStatistics } from './service'
import { columnsPv, columnsVv } from './columns'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.columnsPv = columnsPv.call(this)
    this.columnsVv = columnsVv.call(this)
  }
  state = {
    pv: {
      data: [],
      page: 1,
      pageSize: 10,
      total: 0,
      tableLoading: false,
      echartData: [{
        value: 200,
        date: '2020-03-01'
      }, {
        value: 120,
        date: '2020-03-02'
      }, {
        value: 250,
        date: '2020-03-03'
      }, {
        value: 36,
        date: '2020-03-04'
      }, {
        value: 99,
        date: '2020-03-05'
      }, {
        value: 46,
        date: '2020-03-06'
      }, {
        value: 260,
        date: '2020-03-07'
      }, {
        value: 185,
        date: '2020-03-08'
      }, {
        value: 164,
        date: '2020-03-09'
      }, {
        value: 176,
        date: '2020-03-10'
      }, {
        value: 200,
        date: '2020-03-11'
      }, {
        value: 290,
        date: '2020-03-12'
      }],
    },
    vv: {
      data: [],
      page: 1,
      pageSize: 10,
      total: 0,
      tableLoading: false,
      echartData: [{
        value: 200,
        date: '2020-03-01'
      }, {
        value: 120,
        date: '2020-03-02'
      }, {
        value: 250,
        date: '2020-03-03'
      }, {
        value: 36,
        date: '2020-03-04'
      }, {
        value: 99,
        date: '2020-03-05'
      }, {
        value: 46,
        date: '2020-03-06'
      }, {
        value: 260,
        date: '2020-03-07'
      }, {
        value: 185,
        date: '2020-03-08'
      }, {
        value: 164,
        date: '2020-03-09'
      }, {
        value: 176,
        date: '2020-03-10'
      }, {
        value: 200,
        date: '2020-03-11'
      }, {
        value: 290,
        date: '2020-03-12'
      }],
    },
    tabsKey: 'pv'
  }
  componentDidMount() {
    this.loadTableList()
  }
  loadStatistics = async () => {
    const resp = await fetchStatistics()
  }
  loadTableList = () => {
    const { tabsKey } = this.state
    setTimeout(async () => {
      const params = {
        type: tabsKey === 'pv' ? 0 : (tabsKey === 'vv' ? 1 : 0)
      }
      this.setState({ [tabsKey]: { ...this.state[tabsKey], tableLoading: true } })
      const resp = await fetchStatistics(params)
      this.setState({ [tabsKey]: { ...this.state[tabsKey], tableLoading: false } })
      if (resp.data) {
        this.setState({
          [tabsKey]: {
            ...this.state[tabsKey],
            data: resp.data.data,
            page: resp.data.page,
            pageSize: resp.data.pageSize,
            total: resp.data.total,
          }
        })
      }
    }, 0)
  }
  handleChangeTabsKey = (e) => {
    this.setState({
      tabsKey: e
    }, this.loadTableList)
  }
  handlePvChangePage = (page) => {
    this.setState({
      pv: {
        ...this.state.pv,
        page
      }
    }, this.loadTableList)
  }
  handlePvChangePageSize = (pageSize, page) => {
    this.setState({
      pv: {
        ...this.state.pv,
        page,
        pageSize
      }
    }, this.loadTableList)
  }
  handleVvChangePage = (page) => {
    this.setState({
      vv: {
        ...this.state.pv,
        page
      }
    }, this.loadTableList)
  }
  handleVvChangePageSize = (pageSize, page) => {
    this.setState({
      vv: {
        ...this.state.vv,
        page,
        pageSize
      }
    }, this.loadTableList)
  }
  render() {
    const { vv, pv, tabsKey } = this.state
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Card
            style={{ margin: 0, padding: 0, flexBasis: '350px', flexShrink: 1 }}
            bodyStyle={{
              margin: 10,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
            }}>
            <strong>访问量统计图(PV)</strong>
            <div style={{ flex: 1 }}>
              <EchartLine data={pv.echartData} height="200px" />
            </div>
          </Card>
          <Card
            style={{ margin: 0, padding: 0, flexBasis: '350px', flexShrink: 1, marginLeft: 20 }}
            bodyStyle={{
              margin: 10,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
            }}>
            <strong>访问量统计图(VV)</strong>
            <div style={{ flex: 1 }}>
              <EchartLine data={vv.echartData} height="200px" />
            </div>
          </Card>
        </div>
        <div style={{ marginTop: 20 }}>
          <Tabs activeKey={tabsKey} type="line" onChange={this.handleChangeTabsKey}>
            <Tabs.TabPane tab="统计PV" key="pv">
              <Table
                dataSource={pv.data}
                columns={this.columnsPv}
                loading={pv.tableLoading}
                rowKey="_id"
                size="small"
                pagination={{
                  current: pv.page,
                  pageSize: pv.pageSize,
                  showQuickJumper: true,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '50', '100'],
                  total: pv.total,
                  onChange: this.handlePvChangePage,
                  onShowSizeChange: this.handlePvChangePageSize,
                  showTotal: (totalNum, range) =>
                    `显示 ${range[0]} 到 ${range[1]},共有 ${totalNum} 条记录`,
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="统计VV" key="vv">
            <Table
                dataSource={vv.data}
                columns={this.columnsVv}
                loading={vv.tableLoading}
                rowKey="_id"
                size="small"
                pagination={{
                  current: vv.page,
                  pageSize: vv.pageSize,
                  showQuickJumper: true,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '50', '100'],
                  total: vv.total,
                  onChange: this.handlePvChangePage,
                  onShowSizeChange: this.handlePvChangePageSize,
                  showTotal: (totalNum, range) =>
                    `显示 ${range[0]} 到 ${range[1]},共有 ${totalNum} 条记录`,
                }}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default Home
