import React, { Component } from 'react'
import IconNav from '../../../components/IconNav'
import LoadingBar from 'react-redux-loading-bar'

import 'react-select/dist/react-select.css'

class DashboardLayout extends Component {
  render () {
    const isLogin = /^\/login\/?\??/i.test(location.pathname)
    return (
      <div className='with-iconav'>
        <LoadingBar style={{position: 'fixed', top: 0, left: 0, backgroundColor: '#800000', zIndex: 9999, height: 5}} />
        {(!isLogin) && <IconNav {...this.props} />}
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
