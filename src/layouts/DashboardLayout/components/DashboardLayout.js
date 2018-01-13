import React, { Component } from 'react'
import IconNav from '../../../components/IconNav'
import LoadingBar from 'react-redux-loading-bar'
import Alert from 'react-s-alert'

class DashboardLayout extends Component {
  render () {
    const isLogin = /^\/login\/?\??/i.test(location.pathname)
    return (
      <div className='with-iconav'>
        <Alert stack={{limit: 3}} />
        <LoadingBar style={{position: 'fixed', top: 0, left: 0, backgroundColor: '#009dc7', zIndex: 9999, height: 5}} />
        {(!isLogin) && <IconNav />}
        <div className='container-fluid'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

DashboardLayout.propTypes = {

}

export default DashboardLayout
