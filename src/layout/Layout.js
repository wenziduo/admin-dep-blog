import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon, Breadcrumb, Avatar, Dropdown, Modal, message } from 'antd'
import { withRouter } from 'react-router'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { menuData } from '../utils/menu'
import { routerData } from '../utils/router'
import { fetchGetUser, fetchLogout } from '../service/global'
import { Preview } from '../component'
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
    this.props.dispatch({ type: 'appendUserInfo', payload: { userInfo: resp.data } })
    console.log('this.props.globalState', this.props.globalState)
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

  // 退出
  handleLogout = async () => {
    Modal.confirm({
      title: '操作提示',
      content: <span>正在进行退出操作，是否继续？</span>,
      onOk: async () => {
        const resp = await fetchLogout()
        if (resp.success) {
          message.success('退出成功')
          this.handleDefault()
        }
      }
    })
  }
  render() {
    console.log('menuData', menuData)
    const { userInfo } = this.props.globalState
    const { pathname } = this.props.history.location
    // 当前路由对象
    const nowRouter = (routerData.find(item => item.path === pathname) || {})
    // menu选择栏选择
    const selectKey = nowRouter.key
    // 当前路由对应的组件名称
    const routerName = nowRouter.title
    // menu默认开启
    const { menuKey = null } = nowRouter
    // 个人名字默认展示前三个
    const operateName = (userInfo.userName || '').substr(0, 3)
    // header右侧的个人中心列表
    const operateMenu = (
      <Menu>
        <Menu.Item>
          <a style={{ color: 'orangered' }} onClick={this.handleLogout}>
            退出登录
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Preview
          ref={node => {
            this.previewNode = node
          }}
        />
        <Layout>
          <Header
            style={{
              background: '#1e88e5',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 50,
              lineHeight: '50px'
          }}>
            <div style={{ width: 200, textAlign: 'center' }}>
              <strong style={{ color: '#fff', fontSize: 17 }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
                &nbsp;
                逗儿瓢博客后台
              </strong>
            </div>
            <div
              style={{
                marginRight: 15
              }}
            >
              <Dropdown
                overlay={operateMenu}
                placement="bottomLeft"
              >
                <Avatar
                  style={{
                    color: '#777',        
                    backgroundColor: '#f0f0f0',
                    cursor: 'pointer'
                  }}
                >
                  <strong style={{ fontSize: 16 }}>{operateName}</strong>
                </Avatar>
              </Dropdown>
            </div>
          </Header>
          <Layout>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
              <Menu
                theme="light"
                mode="inline"
                selectedKeys={[selectKey]}
                defaultOpenKeys={[menuKey]}
                style={{ backgroundColor: '#fff' }}
              >
                {menuData.map(item => (
                  item.children ?
                  (
                    <Menu.SubMenu
                      key={item.key}
                      title={
                        <span>
                          {item.Icon}
                          {item.title}
                        </span>
                      }
                    >
                      {item.children.map(item2 => (
                        <Menu.Item
                          key={item2.key}
                          onClick={this.handleGoPath.bind(this, item2)}
                        >
                          {item2.Icon}&nbsp;&nbsp;
                          <span>{item2.title}</span>
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  )
                  :
                  (
                    <Menu.Item
                      key={item.key}
                      onClick={this.handleGoPath.bind(this, item)}
                    >
                      {item.Icon}&nbsp;&nbsp;
                      <span>{item.title}</span>
                    </Menu.Item>
                  )
                ))}
              </Menu>
            </Sider>
            <div style={{ flex: 1 }}>
              <div style={{ padding: '0 15px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>{routerName}</Breadcrumb.Item>
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
                  {routerData.map(item => (
                    <Route
                      path={item.path}
                      component={item.component}
                      key={item.path}
                    />
                  ))}
                </Switch>
              </Content>
            </div>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default withRouter(
  connect(state => ({
    globalState: state.globalReducer
  }))(LayoutComponent)
)
