import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

const AntdContainer = ({ children }) => {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">{children}</div>
    </ConfigProvider>
  );
};

export default AntdContainer;
