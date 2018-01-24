import React, { Component, PropTypes } from 'react'
import LoginForm from './LoginForm'

import 'antd/lib/form/style/css'
import 'antd/lib/notification/style/css'
import './style.css'

import BackgroundSlideshow from 'react-background-slideshow'

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
      <div className={'main acrylic'}>
        <BackgroundSlideshow style={{
          backgroundAttachment: 'fixed' }} images={[
            'http://portal.usep.edu.ph/img/logo/ic.svg',
            'http://portal.usep.edu.ph/img/logo/cas.svg',
            'http://portal.usep.edu.ph/img/logo/ce.svg',
            'http://portal.usep.edu.ph/img/logo/ct.svg',
            'http://portal.usep.edu.ph/img/logo/cgbe.svg',
            'http://portal.usep.edu.ph/img/logo/educ-logo.svg',
            'http://portal.usep.edu.ph/img/logo/saec-logo.svg' ]} />
        <WrappedNormalLoginForm {...this.props} />
      </div>
    )
  }
}
