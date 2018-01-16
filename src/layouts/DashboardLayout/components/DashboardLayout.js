import React, { Component } from 'react'
import LoadingBar from 'react-redux-loading-bar'
import activeComponent from 'react-router-active-component'
import { Link } from 'react-router'

const NavLink = activeComponent('li')

import 'antd/lib/layout/style/css'
import 'antd/lib/menu/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/avatar/style/css'
import './style.css'

import { Layout, Menu, Icon, Avatar } from 'antd'
const { Header, Sider, Content } = Layout

class DashboardLayout extends Component {
  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render () {
    let userRole = this.props.user.get('role')
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <LoadingBar style={{position: 'fixed', top: 0, left: 0, backgroundColor: '#800000', zIndex: 9999, height: 5}} />
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}>
          <Link to='/dashboard'><div className='logo' style={{textAlign: 'center', marginBottom: this.state.collapsed ? '1.75em' : '4.5em'}}>
            <img style={{width: this.state.collapsed ? '100%' : '50%'}} src='http://localhost:3000/usep-logo.png' />
          </div></Link>
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            {userRole == 'student' ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='1' to='/dashboard/me'>
              <Icon type='user' />
              <span>Profile</span>
            </NavLink> : null}
            {userRole == 'admin' ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='2' to='/dashboard/accounts'>
              <Icon type='team' />
              <span>Accounts</span>
            </NavLink> : null}
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
