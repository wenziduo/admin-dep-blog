import React, { useEffect } from 'react';
import { Card, Tabs, Table } from 'antd';
import { EchartLine } from '../../component';
import { columnsPv, columnsVv } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import actions from './store/action';

const Home = () => {
  const dispatch = useDispatch();
  const homeStore = useSelector(state => state.page_home_reducer);
  const { pv, vv, tabsKey } = homeStore;
  const newColumnsPv = columnsPv.call(this);
  const newColumnsVv = columnsVv.call(this);
  useEffect(() => {
    loadTableList();
  }, []);
  const loadTableList = () => {
    setTimeout(async () => {
      const params = {
        type: tabsKey === 'pv' ? 0 : tabsKey === 'vv' ? 1 : 0,
        page: homeStore[tabsKey].page,
        pageSize: homeStore[tabsKey].pageSize,
      };
      dispatch(actions.getPvVv(params));
    }, 0);
  };
  const handleChangeTabsKey = tabsKey => {
    dispatch(actions.changePvVv({ tabsKey }));
    loadTableList();
  };
  const handleChangePage = page => {
    dispatch(actions.changePvVv({ page }));
    loadTableList();
  };
  const handleChangePageSize = (pageSize, page) => {
    dispatch(actions.changePvVv({ page, pageSize }));
    loadTableList();
  };
  const tableData = homeStore[tabsKey];
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
          }}
        >
          <strong>访问量统计图(PV)</strong>
          <div style={{ flex: 1 }}>
            <EchartLine data={pv.echartData} height="200px" />
          </div>
        </Card>
        <Card
          style={{
            margin: 0,
            padding: 0,
            flexBasis: '350px',
            flexShrink: 1,
            marginLeft: 20,
          }}
          bodyStyle={{
            margin: 10,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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
  );
};

export default Home;
