import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DashboardLanding extends Component {

  handleLogout = (e) => {
    this.props.logout()
  }

  render () {
    return (
      <div className='container-fluid container-fluid-spacious' style={{marginTop: '0%'}} >
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>USEP-KMSD</h6>
              <h3 className='dashhead-title'>USEP Portal</h3>
            </div>

            <div className='btn-toolbar dashhead-toolbar'>
              <div className='btn-toolbar-item' style={{ marginLeft: '0px' }}>
                <button type='button' className='btn btn-pill btn-danger' onClick={e => { this.handleLogout() }}>Logout</button>
              </div>
            </div>
          </div>
        </div>
  </div>
    )
  }
}

DashboardLanding.propTypes = {

}

export default DashboardLanding
