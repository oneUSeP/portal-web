import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import validateInput from 'utils/validators/login'
import Alert from 'react-s-alert'

import 'antd/lib/layout/style/css'
import 'antd/lib/menu/style/css'
import 'antd/lib/form/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/input-number/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/checkbox/style/css'
import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'
import './style.css'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'
const FormItem = Form.Item

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      accountId: '',
      password: '',
      isLoading: false
    }
  }

  componentWillReceiveProps (newProps, oldProps) {
    if (!newProps.auth.get('loggingIn')) {
      this.setState({ isLoading: false })
    }
    if (newProps.auth.get('loginError')) {
      let code = newProps.auth.get('loginError').get('code')
      let message = newProps.auth.get('loginError').get('message')
      Alert.error(`<h4>Error ${code}</h4><ul>` + (message ? (`<li>${message}</li>`) : '') + '</ul>', {
        position: 'top-right',
        effect: 'scale',
        html: true
      })
    }
    if (newProps.auth.get('loginSuccess')) {
      console.log(newProps)
      let user = newProps.auth.get('user')
      Alert.success(`Welcome! ${user.get('username')}`, {
        position: 'top-right',
        effect: 'scale'
      })
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  check = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          this.setState({ accountId: '', password: '', isLoading: true })
          const { accountId, password } = this.state
          this.props.login(accountId, password)
        }
      },
    )
  }

  render () {
    console.log(this.state)
    const { getFieldDecorator } = this.props.form
    return (
      <Row>
        <Col span={8} />
        <Col span={8}>
          <Form onSubmit={this.handleSubmit} className='login-form'>
            <FormItem>
              {getFieldDecorator('accountId', {
                rules: [{ required: true, message: 'Please input your Account ID!' }]
              })(
                <Input name={'accountId'} onChange={e => { this.onChange(e) }} setFieldsValue={this.state.accountId} prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Account ID' />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }]
              })(
                <Input name={'password'} onChange={e => { this.onChange(e) }} setFieldsValue={this.state.password} prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
              )}
            </FormItem>
            <FormItem>
              <a className='login-form-forgot' href='' disabled>Forgot password</a>
              <Button loading={this.state.isLoading} onClick={this.check} type='primary' htmlType='submit' className='login-form-button'>
                Log in
              </Button>
              Or <a href='' disabled>register now!</a>
            </FormItem>
          </Form>
        </Col>
        <Col span={8} />
      </Row>
    )
  }
}

LoginForm.propTypes = {

}

export default LoginForm
