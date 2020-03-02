import React from 'react'
import { Layout, Menu, Icon, Breadcrumb } from 'antd'
import { withRouter } from 'react-router'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { menuData, routeData } from './menu'
import { fetchGetUser } from '../service/global'
import { Preview } from '../component'
// import { routerData } from '../utils/router'
const { Header, Sider, Content } = Layout

class LayoutComponent extends React.Component {
  state = {
    collapsed: false
  }

  componentDidMount() {
    this.handleDefault()
  }

  handleDefault = async () => {
    const resp = await fetchGetUser()
    console.log('layout-resp', resp)
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  handleGoPath = record => {
    this.props.history.push({ pathname: record.path })
  }

  // getBreadcrumb = (cloneData, path, arrayBreadcrumb) => {
  //   const { pathname } = this.props.history.location
  //   for (let i=0; i<cloneData.length;i++) {
  //     const children = cloneData[i].children
  //     if (cloneData[i].path === path) {
  //       cloneData
  //     }
  //   }
  // }

  render() {
    const { pathname } = this.props.history.location
    const openKey = (
      menuData.find(item =>
        item.children.some(item2 => item2.path === pathname)
      ) || {}
    ).path
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Preview
          ref={node => {
            this.previewNode = node
          }}
        />
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[pathname]}
              defaultOpenKeys={[openKey]}
            >
              {menuData.map(item => (
                <Menu.SubMenu
                  key={item.path}
                  title={
                    <span>
                      {item.Icon}
                      {item.title}
                    </span>
                  }
                >
                  {item.children.map(item2 => (
                    <Menu.Item
                      key={item2.path}
                      onClick={this.handleGoPath.bind(this, item2)}
                    >
                      {item2.Icon}
                      <span>{item2.title}</span>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ))}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <div style={{ padding: '0 15px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>{pathname}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Content
              style={{
                margin: 15,
                marginTop: 0,
                padding: 15,
                background: '#fff',
                minHeight: 280,
                overflowY: 'auto'
              }}
            >
              <Switch>
                {routeData.map(item => (
                  <Route
                    path={item.path}
                    component={item.component}
                    key={item.path}
                  />
                ))}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default withRouter(LayoutComponent)
