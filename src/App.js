import React from 'react'
import logo from './logo.svg'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Login from './pages/login'
import Layout from './layout/Layout'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import './App.less'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Layout} />
          </Switch>
        </Router>
      </div>
    </ConfigProvider>
  )
}

export default App
