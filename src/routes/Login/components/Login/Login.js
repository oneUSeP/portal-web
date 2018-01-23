import React, { Component, PropTypes } from 'react'
import LoginForm from './LoginForm'

import 'antd/lib/form/style/css'
import 'antd/lib/notification/style/css'

import { Form, notification } from 'antd'

export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
    auth: PropTypes.object
  }

  openNotification = (message, description) => {
    notification.error({
      message: message,
      description: description
    })
  }

  componentWillReceiveProps (newProps, oldProps) {
    if (newProps.auth.get('loginError')) {
      let code = newProps.auth.get('loginError').get('code')
      let message = newProps.auth.get('loginError').get('message') + 'Try to login your account using your ID-NUMBER or your Birthday(MM-DD-YYYY) as password.'
      this.openNotification('Login failed', message)
    }
  }

  render () {
    const WrappedNormalLoginForm = Form.create()(LoginForm)
    return (
      <WrappedNormalLoginForm {...this.props} />
    )
  }
}
