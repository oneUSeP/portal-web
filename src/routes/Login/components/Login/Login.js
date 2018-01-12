import React, { Component, PropTypes } from 'react'
import LoginForm from './LoginForm'
import {Link} from 'react-router'

export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
    auth: PropTypes.object
  }

  render () {
    const { loading } = this.props.auth
    return (
      <div className='container login-wrapper' style={{ marginTop: '10%' }}>
        <div className='hr-divider m-t m-b'>
          <h3 className='hr-divider-content hr-divider-heading'><img src='http://192.168.1.195:3000/usep-logo.png' width='70' /></h3>
        </div>
        <LoginForm {...this.props} />
        <div className='hr-divider'>
          <h3 className='hr-divider-content hr-divider-heading'>
            {/* <Link to='/password/forgot'>Forgot Password</Link> */}
          </h3>
        </div>
      </div>
    )
  }
}
