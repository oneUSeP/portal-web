import React, { Component } from 'react'

import { Table } from 'antd'

class Account extends Component {

  componentWillMount () {
    this.props.getAccounts(1, 99)
  }

  render () {
    return (
      <div className='container-fluid container-fluid-spacious' style={{marginTop: '0%'}} >
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>USEP-KMSD | USEP Portal</h6>
              <h3 className='dashhead-title'>Accounts</h3>
            </div>
          </div>
        </div>

        <div className='row'>

        </div>
      </div>
    )
  }
}

Account.propTypes = {

}

export default Account
