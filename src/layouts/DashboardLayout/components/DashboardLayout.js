import React, { Component } from 'react'
import IconNav from '../../../components/IconNav'
import LoadingBar from 'react-redux-loading-bar'

import 'antd/lib/layout/style/css'
import 'antd/lib/menu/style/css'
import 'antd/lib/icon/style/css'
import './style.css'

import { Layout, Menu, Icon } from 'antd'
const { Header, Sider, Content } = Layout

class DashboardLayout extends Component {
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render () {
    const isLogin = /^\/login\/?\??/i.test(location.pathname)
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <LoadingBar style={{position: 'fixed', top: 0, left: 0, backgroundColor: '#800000', zIndex: 9999, height: 5}} />
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}>
          <div className='logo' />
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1'>
              <Icon type='user' />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key='2'>
              <Icon type='video-camera' />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key='3'>
              <Icon type='upload' />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

DashboardLayout.propTypes = {

}

export default DashboardLayout
