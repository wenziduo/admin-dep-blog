import React from 'react'
import logo from './logo.svg'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Login from './pages/login'
import Layout from './layout/Layout'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { routerData } from './utils/router'
import './App.less'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Router>
        <Route path="/login" component={Login} exact />
        <Route
          path="/"
          exact
          component={
            () => (
              <Layout>
                {routerData.map(item => (
                  <Route
                    exact
                    path={item.path}
                    component={item.component}
                    key={item.path}
                  />
                ))}
              </Layout>
            )
          }
        />
        </Router>
      </div>
    </ConfigProvider>
  )
}

export default App
