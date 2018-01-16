import React, { Component, PropTypes } from 'react'
import LoginForm from './LoginForm'
import {Link} from 'react-router'

import 'antd/lib/form/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/input-number/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/checkbox/style/css'

import { Form, Icon, Input, Button, Checkbox } from 'antd'
const FormItem = Form.Item

export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
    auth: PropTypes.object
  }

  render () {
    const { loading } = this.props.auth
    const WrappedNormalLoginForm = Form.create()(LoginForm)
    return (
      <WrappedNormalLoginForm {...this.props} />
    )
  }
}
