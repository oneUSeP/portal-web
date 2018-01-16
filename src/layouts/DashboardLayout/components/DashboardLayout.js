import React, { Component } from 'react'
import LoadingBar from 'react-redux-loading-bar'
import activeComponent from 'react-router-active-component'
import { Link } from 'react-router'

const NavLink = activeComponent('li')

import 'antd/lib/layout/style/css'
import 'antd/lib/menu/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/avatar/style/css'
import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'
import 'antd/lib/popconfirm/style/css'
import 'antd/lib/message/style/css'
import './style.css'

import { Layout, Menu, Icon, Avatar, Row, Col, Button, Tooltip, Popconfirm, message } from 'antd'
const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

class DashboardLayout extends Component {
  state = {
    collapsed: true
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  handleLogout = (e) => {
    this.props.logout()
  }

  confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
    this.handleLogout()
  }
  
  cancel = (e) => {
    console.log(e);
    message.error('Click on No');
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
          <SubMenu key="sub1" title={<span><Icon type="user" /><span>Profile</span></span>}>
          {userRole == 'student'
            ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='1' to='/dashboard/me'>
                <Icon type='profile' />
                <span>Basic Information</span>
              </NavLink>
            : null}
          {userRole == 'student'
          ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='2' to='/dashboard/profpic'>
              <Icon type='picture' />
              <span>Profile Picture</span>
            </NavLink>
          : null}
          {userRole == 'student'
          ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='3' to='/dashboard/changepass'>
              <Icon type='lock' />
              <span>Change Password</span>
            </NavLink>
          : null}
          {userRole == 'student'
          ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='4' to='/dashboard/changeemail'>
              <Icon type='mail' />
              <span>Change Email</span>
            </NavLink>
          : null}
          {userRole == 'student'
          ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='5' to='/dashboard/settings'>
              <Icon type='setting' />
              <span>Settings</span>
            </NavLink>
          : null}
          </SubMenu>
            {userRole == 'student' ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='6' to='/dashboard/grades'>
              <Icon type='book' />
              <span>Grades</span>
            </NavLink> : null}
            {userRole == 'student' ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='7' to='/dashboard/evaluation'>
              <Icon type='dot-chart' />
              <span>Evaluation</span>
            </NavLink> : null}
            {userRole == 'student' ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='8' to='/dashboard/advising'>
              <Icon type='exception' />
              <span>Advising</span>
            </NavLink> : null}
            {userRole == 'student' ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='9' to='/dashboard/accoutabilities'>
              <Icon type='calculator' />
              <span>Accountabilites</span>
            </NavLink> : null}
            {userRole == 'student' ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='10' to='/dashboard/downloads'>
              <Icon type="cloud-download-o" />
              <span>Downloads</span>
            </NavLink> : null}
            {userRole == 'admin'
            ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='11' to='/dashboard/accounts'>
                <Icon type='team' />
                <span>Accounts</span>
              </NavLink>
            : null}
            
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{position:'absolute', zIndex: '88888'}}
            />
            <Row>
              <Col xs={{ span: 4, offset: 20 }} sm={{ span: 6, offset: 18}} md={{ span: 2, offset: 22 }} lg={{ span: 1, offset: 23 }} xl={{ span: 1, offset: 23 }} xxl={{ span: 1, offset: 23 }}>
                <Tooltip placement="left" title={'Signout'}><Popconfirm title="Are you sure to signout from this session?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No"><Button type="danger" shape="circle" icon="logout" size={'large'} /></Popconfirm></Tooltip>
              </Col>
            </Row>
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
