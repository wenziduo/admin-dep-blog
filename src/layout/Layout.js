import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon, Breadcrumb, Avatar, Dropdown, Modal, message } from 'antd'
import { withRouter } from 'react-router'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { menuData } from '../utils/menu'
import { routerData } from '../utils/router'
import { fetchGetUser, fetchLogout } from '../service/global'
import { Preview } from '../component'
import { useEffect } from 'react'
const { Header, Sider, Content } = Layout


function LayoutComponent(props) {
  const initState = {
    collapsed: false
  }
  const [state, setState] = useState(initState);

  useEffect(() => {
    handleDefault()
  })

  const handleDefault = async () => {
    const resp = await fetchGetUser()
    props.dispatch({ type: 'appendUserInfo', payload: { userInfo: resp.data } })
  }

  const toggle = () => {
    setState({
      collapsed: state.collapsed
    })
  }

  const handleGoPath = record => {
    props.history.push({ pathname: record.path })
  }

  // getBreadcrumb = (cloneData, path, arrayBreadcrumb) => {
  //   const { pathname } = props.history.location
  //   for (let i=0; i<cloneData.length;i++) {
  //     const children = cloneData[i].children
  //     if (cloneData[i].path === path) {
  //       cloneData
  //     }
  //   }
  // }

  // 退出
  const handleLogout = async () => {
    Modal.confirm({
      title: '操作提示',
      content: <span>正在进行退出操作，是否继续？</span>,
      onOk: async () => {
        const resp = await fetchLogout()
        if (resp.success) {
          message.success('退出成功')
          handleDefault()
        }
      }
    })
  }
  const { userInfo } = props.globalState
  const { pathname } = props.history.location
  console.log('pathname', pathname)
  // 当前路由对象
  const nowRouter = (routerData.find(item => item.path === pathname) || {})
  // menu选择栏选择
  const selectKey = nowRouter.key
  // 当前路由对应的组件名称
  const breadcrumbList = nowRouter.breadcrumb
  // menu默认开启
  const { menuKey = null } = nowRouter
  // 个人名字默认展示前三个
  const operateName = (userInfo.userName || '').substr(0, 3)
  // header右侧的个人中心列表
  const operateMenu = (
    <Menu>
      <Menu.Item>
        <a style={{ color: 'orangered' }} onClick={handleLogout}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  )
  console.log('breadcrumbList', breadcrumbList)
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Preview />
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
                type={state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={toggle}
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
          <Sider trigger={null} collapsible collapsed={state.collapsed}>
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
                        onClick={handleGoPath.bind(this, item2)}
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
                    onClick={handleGoPath.bind(this, item)}
                  >
                    {!state.collapsed && <>{item.Icon}&nbsp;&nbsp;</>}
                    <span>{item.title}</span>
                  </Menu.Item>
                )
              ))}
            </Menu>
          </Sider>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '0 15px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
              {
                breadcrumbList.map(item => (
                  <Breadcrumb.Item key={item.title}>
                    {item.path ? <Link to={item.path}>{item.title}</Link> : item.title}
                  </Breadcrumb.Item>
                ))
              }
              </Breadcrumb>
            </div>
            <Content
              style={{
                margin: 15,
                marginTop: 0,
                padding: 15,
                background: '#fff',
                overflowY: 'auto',
                flex: 1,
              }}
            >
              {
                props.children
              }
            </Content>
          </div>
        </Layout>
      </Layout>
    </div>
  )
}

export default withRouter(
  connect(state => ({
    globalState: state.globalReducer
  }))(LayoutComponent)
)
