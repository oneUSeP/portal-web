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
      <Row style={{zIndex: '99999'}}>
        <Col xs={2} sm={3} md={4} lg={6} xl={8} xxl={8} />
        <Col xs={20} sm={18} md={16} lg={12} xl={8} xxl={8} style={{paddingTop: '12%'}}>
          <div className='usep-logo' style={{
            backgroundImage: 'url(\'http://portal.usep.edu.ph/usep-logo.png\')',
            backgroundSize: 'cover',
            marginLeft: 'left',
            height: '100px',
            width: '100px',
            position: 'relative',
            top: '-15px',
            left: '40%',
            marginBottom: '-50px',
            border: '0px solid white',
            borderRadius: '50px'
            // boxShadow: ' 0 6px 0 rgba(0,0,0,0.35)'
          }}>
          </div>
          <Form className='login-form' style={{background: 'white', padding: '3em 2em 0em 2em', boxShadow: ' 5px 6px 5px rgba(23,23,23,.35)'}}>
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
                Log In
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
