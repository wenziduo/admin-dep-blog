import React from 'react'
import logo from './logo.svg'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Layout from './layout/Layout'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import './App.less'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Router>
          <Route path="/" component={Layout} />
        </Router>
      </div>
    </ConfigProvider>
  )
}

export default App
