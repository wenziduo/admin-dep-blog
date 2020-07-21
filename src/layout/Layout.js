import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Modal, Spin } from 'antd';
import { Icon } from '../component';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { menuData } from '../utils/menu';
import { routerData } from '../utils/router';
import globalActions from '../global/store/action';
const { Header, Sider, Content } = Layout;

function LayoutComponent({ history, children }) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state.global_reducer);
  const {
    userInfo,
    layout: { collapsed },
  } = globalState;

  const toggle = () => {
    dispatch(globalActions.changeLayout({ collapsed: !collapsed }));
  };

  const handleGoPath = record => {
    history.push({ pathname: record.path });
  };

  // 退出
  const handleLogout = async () => {
    Modal.confirm({
      title: '操作提示',
      content: <span>正在进行退出操作，是否继续？</span>,
      onOk: dispatch(globalActions.logOut()),
    });
  };

  const { pathname } = history.location;
  // 当前路由对象
  const nowRouter = routerData.find(item => item.path === pathname) || {};
  // menu选择栏选择
  const selectKey = nowRouter.key;
  // 当前路由对应的组件名称
  const breadcrumbList = nowRouter.breadcrumb || [];
  // menu默认开启
  const { menuKey = null } = nowRouter;
  // 个人名字默认展示前三个
  const operateName = (userInfo.userName || '').substr(0, 3);
  // header右侧的个人中心列表
  const operateMenu = (
    <Menu>
      <Menu.Item>
        <a style={{ color: 'orangered' }} onClick={handleLogout}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Layout>
        <Header
          style={{
            background: '#1e88e5',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 50,
            lineHeight: '50px',
          }}
        >
          <div style={{ width: 200, textAlign: 'center' }}>
            <strong style={{ color: '#fff', fontSize: 17 }}>
              <Icon
                type={collapsed ? 'icon-unfold' : 'icon-fold'}
                onClick={toggle}
              />
              &nbsp; 逗儿瓢博客后台
            </strong>
          </div>
          <div
            style={{
              marginRight: 15,
            }}
          >
            <Dropdown overlay={operateMenu} placement="bottomLeft">
              <Avatar
                style={{
                  color: '#777',
                  backgroundColor: '#f0f0f0',
                  cursor: 'pointer',
                }}
              >
                <strong style={{ fontSize: 16 }}>{operateName}</strong>
              </Avatar>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[selectKey]}
              defaultOpenKeys={[menuKey]}
              style={{ backgroundColor: '#fff' }}
            >
              {menuData.map(item =>
                item.children ? (
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
                ) : (
                  <Menu.Item
                    key={item.key}
                    onClick={handleGoPath.bind(this, item)}
                  >
                    {!collapsed && <>{item.Icon}&nbsp;&nbsp;</>}
                    <span>{item.title}</span>
                  </Menu.Item>
                )
              )}
            </Menu>
          </Sider>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '0 15px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                {breadcrumbList.map(item => (
                  <Breadcrumb.Item key={item.title}>
                    {item.path ? (
                      <Link to={item.path}>{item.title}</Link>
                    ) : (
                      item.title
                    )}
                  </Breadcrumb.Item>
                ))}
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
              {children}
            </Content>
          </div>
        </Layout>
      </Layout>
    </div>
  );
}

const LayoutRouterComponent = withRouter(LayoutComponent);

const IndexPage = ({ children }) => {
  const globalState = useSelector(state => state.global_reducer);
  const { userInfo } = globalState;
  const isPassLayout = Object.keys(userInfo).length > 0;
  const dispatch = useDispatch();
  const handleDefault = async () => {
    dispatch(globalActions.getUserInfo());
  };

  useEffect(() => {
    handleDefault();
  }, []);
  return isPassLayout ? (
    <LayoutRouterComponent children={children} handleDefault={handleDefault} />
  ) : (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin spinning={true} size="large" />
    </div>
  );
};
export default IndexPage;
