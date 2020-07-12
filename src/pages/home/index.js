import React, { useEffect, useState } from 'react'
import { Card, Tabs, Table } from 'antd'
import { EchartLine } from '../../component'
import { fetchStatistics } from './service'
import { columnsPv, columnsVv } from './columns'

const Home = () => {
  const newColumnsPv = columnsPv.call(this)
  const newColumnsVv = columnsVv.call(this)
  const [pv, setPv] = useState({
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
    }]})
  const [vv, setVv] = useState({
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
  })
  const [tabsKey, setTabsKey] = useState('pv')
  useEffect(() => {
    loadTableList()
  }, [])
  const loadStatistics = async () => {
    const resp = await fetchStatistics()
  }
  const loadTableList = () => {
    setTimeout(async () => {
      const params = {
        type: tabsKey === 'pv' ? 0 : (tabsKey === 'vv' ? 1 : 0),
        page: (tabsKey === 'pv' ? pv : (tabsKey === 'vv' ? vv : pv)).page,
        pageSize: (tabsKey === 'pv' ? pv : (tabsKey === 'vv' ? vv : pv)).pageSize
      }
      if (tabsKey === 'pv') {
        setPv({ ...pv, tableLoading: true })
      }
      if (tabsKey === 'vv') {
        setVv({ ...vv, tableLoading: true })
      }
      const resp = await fetchStatistics(params)
      if (tabsKey === 'pv') {
        setPv({ ...pv, tableLoading: false })
      }
      if (tabsKey === 'vv') {
        setVv({ ...vv, tableLoading: false })
      }
      if (resp.data) {
        if (tabsKey === 'pv') {
          setPv({
            ...pv,
            data: resp.data.data,
            page: resp.data.page,
            pageSize: resp.data.pageSize,
            total: resp.data.total,
          })
        }
        if (tabsKey === 'vv') {
          setVv({
            ...vv,
            data: resp.data.data,
            page: resp.data.page,
            pageSize: resp.data.pageSize,
            total: resp.data.total,
          })
        }
      }
    }, 0)
  }
  const handleChangeTabsKey = (e) => {
    setTabsKey(e, loadTableList)
  }
  const handleChangePage = (page) => {
    if (tabsKey === 'pv') {
      setPv({ ...pv, page }, loadTableList)
    }
    if (tabsKey === 'vv') {
      setVv({ ...vv, page }, loadTableList)
    }
  }
  const handleChangePageSize = (pageSize, page) => {
    if (tabsKey === 'pv') {
      setPv({
        ...pv,
        page,
        pageSize
      }, loadTableList)
    }
    if (tabsKey === 'vv') {
      setVv({
        ...vv,
        page,
        pageSize
      }, loadTableList)
    }
  }
  const tableData = tabsKey === 'pv' ? pv : vv
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
        <Tabs activeKey={tabsKey} type="line" onChange={handleChangeTabsKey}>
          <Tabs.TabPane tab="统计PV" key="pv" />
          <Tabs.TabPane tab="统计VV" key="vv" />
        </Tabs>
        <Table
          dataSource={tableData.data}
          columns={tabsKey === 'pv' ? newColumnsPv : newColumnsVv}
          loading={tableData.tableLoading}
          rowKey="_id"
          size="small"
          pagination={{
            current: tableData.page,
            pageSize: tableData.pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            total: tableData.total,
            onChange: handleChangePage,
            onShowSizeChange: handleChangePageSize,
            showTotal: (totalNum, range) =>
              `显示 ${range[0]} 到 ${range[1]},共有 ${totalNum} 条记录`,
          }}
        />
      </div>
    </div>
  )
}

export default Home
