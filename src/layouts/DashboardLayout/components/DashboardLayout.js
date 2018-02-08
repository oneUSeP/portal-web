import React, { Component } from 'react'
import LoadingBar from 'react-redux-loading-bar'
import activeComponent from 'react-router-active-component'
import { Link } from 'react-router'
import _ from 'lodash'

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

import { Layout, Menu, Icon, Avatar, Badge, Row, Col, Button, Tooltip, Popconfirm, message, Dropdown, BackTop } from 'antd'
const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

class DashboardLayout extends Component {
  state = {
    collapsed: true
  }

  componentWillMount () {
    let user = this.props.auth.get('user')
    if (user.get('role') == 'student') {
      this.props.getAyTerms(user.get('username'))
      this.props.getProfile(user.get('username'))
    }
  }

  componentWillReceiveProps (nextProps) {
    let user = this.props.auth.get('user')
    let {ayterms, fetchingProfileSuccess} = nextProps
    if (ayterms && fetchingProfileSuccess) {
       ayterms.reverse().map((term, key) => {
         if (key == 0) {
           this.props.getProfileExtraDetails(user.get('username'), term.get('TermID'))
         }
       })
     }
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
    message.success('You logged out!')
    this.handleLogout()
  }

  cancel = (e) => {
    message.error('You chose to stay.')
  }

  render () {
    let userRole = this.props.user.get('role')
    let { profile, fetchingProfile } = this.props
    if (profile) {
      var image = profile.get('StudentPicture')
    }
    const menu = (
      <Menu>
      {userRole == 'student'
        ? <NavLink className='ant-dropdown-menu-item' activeClassName='ant-dropdown-menu-item-active ant-dropdown-menu-item-selected' key='6' to='/dashboard/me'>
          <Icon type='profile' />
          <span style={{paddingLeft: '.5em'}}>Profile</span>
        </NavLink>
        : null}
        {userRole == 'student'
        ? <NavLink className='ant-dropdown-menu-item' activeClassName='ant-dropdown-menu-item-active ant-dropdown-menu-item-selected' key='7' to='/dashboard/profpic'>
          <Icon type='picture' />
          <span style={{paddingLeft: '.5em'}}>Profile Picture</span>
        </NavLink>
        : null}
        {userRole == 'student'
        ? <NavLink className='ant-dropdown-menu-item' activeClassName='ant-dropdown-menu-item-active ant-dropdown-menu-item-selected' key='8' to='/dashboard/changepass'>
          <Icon type='lock' />
          <span style={{paddingLeft: '.5em'}}>Change Password</span>
        </NavLink>
        : null}
        {userRole == 'student'
        ? <NavLink className='ant-dropdown-menu-item' activeClassName='ant-dropdown-menu-item-active ant-dropdown-menu-item-selected' key='9' to='/dashboard/changeemail'>
          <Icon type='mail' />
          <span style={{paddingLeft: '.5em'}}>Change Email</span>
        </NavLink>
        : null}
        {userRole == 'student'
        ? <NavLink className='ant-dropdown-menu-item' activeClassName='ant-dropdown-menu-item-active ant-dropdown-menu-item-selected' key='10' to='/dashboard/settings'>
            <Icon type='setting' />
            <span style={{paddingLeft: '.5em'}}>Settings</span>
          </NavLink>
        : null}
        <Popconfirm title='Are you sure to signout from this session?' onConfirm={this.confirm} onCancel={this.cancel} okText='Yes' cancelText='No'><NavLink className='ant-dropdown-menu-item' activeClassName='ant-dropdown-menu-item-active ant-dropdown-menu-item-selected' key='11' to='/dashboard/logout'>
          <Icon type='logout' />
          <span style={{paddingLeft: '.5em'}}>Logout</span>
        </NavLink></Popconfirm>
      </Menu>
    )
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <BackTop />
        <LoadingBar style={{position: 'fixed', top: 0, left: 0, backgroundColor: '#800000', zIndex: 9999, height: 5}} />
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}>
          <Link to='/dashboard'><div className='logo' style={{textAlign: 'center', marginBottom: this.state.collapsed ? '1.75em' : '4.5em'}}>
            <img style={{width: this.state.collapsed ? '100%' : '50%'}} src='http://portal.usep.edu.ph/usep-logo.png' />
          </div></Link>
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            {userRole == 'admin'
              ? <SubMenu key='sub1' title={<span><Icon type='code-o' /><span>Admin Corner</span></span>}>
                <NavLink style={{paddingLeft: '48px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='11' to='/dashboard/accounts'>
                  <Icon type='team' />
                  <span>Accounts</span>
                </NavLink>
                <NavLink style={{paddingLeft: '48px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='12' to='/dashboard/reports'>
                  <Icon type='printer' />
                  <span>Reports</span>
                </NavLink>
                <NavLink style={{paddingLeft: '48px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='13' to='/dashboard/settings'>
                  <Icon type='setting' />
                  <span>Settings</span>
                </NavLink>
              </SubMenu>
              : null}
            {userRole == 'student'
            ? <SubMenu key='sub1' title={<span><Icon type='book' /><span>Grades</span></span>}>
              {this.props.ayterms && this.props.ayterms.reverse().map((term, key) => {
                return (<NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key={key} to={`/dashboard/grades/${term.get('TermID')}/${term.get('AYTerm')}`}>
                <span>{term.get('AYTerm')}</span>
              </NavLink>)
              })}
            </SubMenu> : null}
            {userRole == 'student' ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='2' to='/dashboard/evaluation'>
              <Icon type='dot-chart' />
              <span>Evaluation</span>
            </NavLink> : null}
            {userRole == 'student' ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='3' to='/dashboard/advising'>
              <Icon type='exception' />
              <span>Advising</span>
            </NavLink> : null}
            {userRole == 'student' ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='4' to='/dashboard/accoutabilities'>
              <Icon type='calculator' />
              <span>Accountabilites</span>
            </NavLink> : null}
            {userRole == 'student' ? <NavLink style={{paddingLeft: '24px'}} className='ant-menu-item' activeClassName='ant-menu-item-active ant-menu-item-selected' key='5' to='/dashboard/downloads'>
              <Icon type='cloud-download-o' />
              <span>Downloads</span>
            </NavLink> : null}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{position: 'absolute', zIndex: '88888'}}
            />
            <Row>
              <Col xs={{ span: 5, offset: 19 }} sm={{ span: 6, offset: 18}} md={{ span: 2, offset: 22 }} lg={{ span: 2, offset: 22 }} xl={{ span: 1, offset: 23 }} xxl={{ span: 2, offset: 22 }}>
                <Dropdown overlay={menu} placement='bottomCenter'><span>
                <Badge dot><Avatar shape='circle' size='large' src={profile ? 'data:image/png;base64, ' + image : 'http://portal.usep.edu.ph/usep-logo.png'} /></Badge>
              </span></Dropdown>
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
