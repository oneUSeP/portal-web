import React, { Component } from 'react'

import { Form, Icon, Input, Button, Row, Col, notification } from 'antd'
const FormItem = Form.Item

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
import 'antd/lib/notification/style/css'
import './style.css'

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
    const { getFieldDecorator } = this.props.form
    return (
      <Row>
        <Col xs={2} sm={3} md={4} lg={6} xl={8} xxl={8} />
        <Col xs={20} sm={18} md={16} lg={12} xl={8} xxl={8}>
          <Form className='login-form'>
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
        <Col xs={2} sm={3} md={4} lg={6} xl={8} xxl={8} />
      </Row>
    )
  }
}

LoginForm.propTypes = {

}

export default LoginForm
