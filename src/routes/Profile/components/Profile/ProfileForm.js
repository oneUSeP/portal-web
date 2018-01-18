import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Row, Col, DatePicker, Select, Collapse, Divider } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const Panel = Collapse.Panel

import 'antd/lib/form/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/checkbox/style/css'
import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'
import 'antd/lib/date-picker/style/css'
import 'antd/lib/select/style/css'
import 'antd/lib/Collapse/style/css'
import 'antd/lib/divider/style/css'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

class ProfileForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      studentNo: '',
      lastName: '',
      firstName: '',
      middleName: '',
      middleNameInitial: '',
      extName: '',
      dateOfBirth: '',
      placeOfBirth: '',
      gender: '',
      civilStatusId: '',
      religionId: '',
      nationalityId: '',
      resAddress: '',
      resStreet: '',
      resBarangay: '',
      resTownCity: '',
      resZipCode: '',
      resProvince: '',
      permAddress: '',
      permStreet: '',
      permBarangay: '',
      permTownCity: '',
      permZipCode: '',
      permProvince: '',
      email: '',
      telNo: '',
      mobileNo: '',
      bloodType: '',
      father: '',
      fatherOccupation: '',
      mother: '',
      motherOccupation: '',
      emergencyContact: '',
      emergencyAddress: '',
      emergencyMobileNo: '',
      checkSameAs: false
    }
  }

  check = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          console.info('success')
        }
      },
    )
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSelectChangeSex = (value) => {
    this.props.form.setFieldsValue({
      gender: value
    })
    this.setState({gender: value})
  }

  handleSelectChangeBloodtype = (value) => {
    this.props.form.setFieldsValue({
      bloodType: value
    })
    this.setState({bloodType: value})
  }

  handleSelectChangeCivilStatusId = (value) => {
    this.props.form.setFieldsValue({
      civilStatusId: value
    })
    this.setState({civilStatusId: value})
  }

  handleSelectChangeReligionId = (value) => {
    this.props.form.setFieldsValue({
      religionId: value
    })
    this.setState({religionId: value})
  }

  onChangeDate = (date, dateString) => {
    this.setState({
      dateOfBirth: dateString
    })
  }

  handleSameAs = (e) => {
    if (e.target.checked) {
      this.setState({
        checkSameAs: e.target.checked,
        permAddress: this.state.resAddress,
        permStreet: this.state.resStreet,
        permBarangay: this.state.resBarangay,
        permTownCity: this.state.resTownCity,
        permZipCode: this.state.resZipCode,
        permProvince: this.state.resProvince
      }, () => {
        this.props.form.validateFields(['resAddress',
          'resStreet',
          'resBarangay',
          'resTownCity',
          'resZipCode',
          'resProvince'], { force: true })
      })
    } else {
      this.setState({
        checkSameAs: e.target.checked
      })
    }
  }

  render () {
    console.log(this.state)
    const { getFieldDecorator } = this.props.form
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }]
    }

    return (
      <Form>
        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header='PERSONAL INFORMATION' key='1'>
            <Row>
              <Col xs={{ span: 23, offset: 1 }} lg={{ span: 11, offset: 1 }}>
                <FormItem {...formItemLayout} label='Surname'>
                  {getFieldDecorator('lastName', {
                    rules: [{
                      required: true,
                      message: 'Please input your surname'
                    }]
                  })(
                    <Input name='lastName' onChange={e => { this.onChange(e) }} disabled name='lastName' onChange={e => { this.onChange(e) }} placeholder='Please input your surname' />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Given name'>
                  {getFieldDecorator('firstName', {
                    rules: [{
                      required: true,
                      message: 'Please input your name'
                    }]
                  })(
                    <Input name='firstName' onChange={e => { this.onChange(e) }} disabled placeholder='Please input your name' />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Middle Name'>
                  {getFieldDecorator('middleName', {
                    rules: [{
                      required: true,
                      message: 'Please input your middle name'
                    }]
                  })(
                    <Input name='middleName' onChange={e => { this.onChange(e) }} disabled placeholder='Please input your middle name' />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Middle Initial'>
                  {getFieldDecorator('middleNameInitial', {
                    rules: [{
                      required: true,
                      message: 'Please input your middle name initial'
                    }]
                  })(
                    <Input name='middleNameInitial' onChange={e => { this.onChange(e) }} disabled placeholder='Please input your middle name initial' />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Extension'>
                  {getFieldDecorator('extName')(
                    <Input name='extName' onChange={e => { this.onChange(e) }} placeholder='Please input your extension name' />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Birthdate'>
                  {getFieldDecorator('dateOfBirth', config)(
                    <DatePicker format='YYYY-MM-DD' onChange={this.onChangeDate} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Birthplace'>
                  {getFieldDecorator('placeOfBirth', {
                    rules: [{
                      required: true,
                      message: 'Please input birth place'
                    }]
                  })(
                    <Input name='placeOfBirth' onChange={e => { this.onChange(e) }} placeholder='Please input birth place' />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 23, offset: 1 }} lg={{ span: 11, offset: 1 }}>
                <FormItem {...formItemLayout} label='Sex'>
                  {getFieldDecorator('gender', {
                    rules: [{ required: true, message: 'Please select your gender!' }]
                  })(
                    <Select
                      placeholder='Select your sex'
                      onChange={this.handleSelectChangeSex}
                    >
                      <Option value='M'>Male</Option>
                      <Option value='F'>Female</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label='E-mail'
                >
                  {getFieldDecorator('email', {
                    rules: [{
                      type: 'email', message: 'The input is not valid E-mail!'
                    }, {
                      required: true, message: 'Please input your E-mail!'
                    }]
                  })(
                    <Input name='email' onChange={e => { this.onChange(e) }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label='Telephone'
                >
                  {getFieldDecorator('telNo')(
                    <Input name='telNo' onChange={e => { this.onChange(e) }} style={{ width: '100%' }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label='Mobile'
                >
                  {getFieldDecorator('mobileNo', {
                    rules: [{ required: true, message: 'Please input your mobile number!' }]
                  })(
                    <Input name='mobileNo' onChange={e => { this.onChange(e) }} style={{ width: '100%' }} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Blood Type'>
                  {getFieldDecorator('bloodType')(
                    <Select
                      placeholder='Select your type'
                      onChange={this.handleSelectChangeBloodtype}
                    >
                      <Option value='O+'>O Positive</Option>
                      <Option value='O-'>O Negative</Option>
                      <Option value='A+'>A Positive</Option>
                      <Option value='A-'>A Negative</Option>
                      <Option value='B+'>B Positive</Option>
                      <Option value='B-'>B Negative</Option>
                      <Option value='AB+'>AB Positive</Option>
                      <Option value='AB-'>AB Negative</Option>
                      <Option value=''>I don't know</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Civil Status'>
                  {getFieldDecorator('civilStatusId', {
                    rules: [{ required: true, message: 'Please select your status' }]
                  })(
                    <Select
                      disabled
                      placeholder='Select your status'
                      onChange={this.handleSelectChangeCivilStatusId}
                    >
                      <Option value='1'>Single</Option>
                      <Option value='2'>Married</Option>
                      <Option value='3'>Separated</Option>
                      <Option value='4'>Widow/er</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Religion'>
                  {getFieldDecorator('religionId', {
                    rules: [{ required: true, message: 'Please select your religion' }]
                  })(
                    <Select
                      disabled
                      placeholder='Select your religion'
                      onChange={this.handleSelectChangeReligionId}
                    >
                      <Option value='1'>Roman Catholic</Option>
                      <Option value='2'>Iglesia ni Cristo</Option>
                      <Option value='3'>Islam</Option>
                      <Option value='4'>Protestant</Option>
                      <Option value='5'>Buddhism</Option>
                      <Option value='6'>Jehova's Witness</Option>
                      <Option value='7'>Methodist</Option>
                      <Option value='8'>Adventist</Option>
                      <Option value='9'>Baptist</Option>
                      <Option value='10'>Born Again</Option>
                      <Option value='11'>Jewish</Option>
                      <Option value='12'>Mormon</Option>
                      <Option value='13'>Aglipayan</Option>
                      <Option value='14'>Anglican</Option>
                      <Option value='15'>Pentecostal</Option>
                      <Option value='16'>Secular</Option>
                      <Option value='17'>LD-Saint</Option>
                      <Option value='18'>Christian</Option>
                      <Option value='19'>Lutheran</Option>
                      <Option value='20'>WCB</Option>
                      <Option value='21'>Other Christian Denomination</Option>
                      <Option value='22'>Scientology</Option>
                      <Option value='23'>Hinduism</Option>
                      <Option value='24'>Sikhism</Option>
                      <Option value='25'>Judaism</Option>
                      <Option value='26'>Baha’i Faith</Option>
                      <Option value='27'>Confucianism</Option>
                      <Option value='28'>Jainism</Option>
                      <Option value='29'>Shinto</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Panel>
          <Panel header={'RESIDENCE INFORMATION'} key='2'>
            <Row>
              <Col xs={{ span: 23, offset: 1 }} lg={{ span: 11, offset: 1 }}>
              <h3 style={{textAlign: 'center'}}>Present Address</h3>
              <FormItem {...formItemLayout} label='Residence'>
                {getFieldDecorator('resAddress', {
                  rules: [{
                    required: true,
                    message: 'Please input your address'
                  }]
                })(
                  <Input name='resAddress' onChange={e => { this.onChange(e) }} placeholder='Please input your address' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Street'>
                {getFieldDecorator('resStreet', {
                  rules: [{
                    required: true,
                    message: 'Please input your street'
                  }]
                })(
                  <Input name='resStreet' onChange={e => { this.onChange(e) }} placeholder='Please input your street' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Barangay'>
                {getFieldDecorator('resBarangay', {
                  rules: [{
                    required: true,
                    message: 'Please input your barangay'
                  }]
                })(
                  <Input name='resBarangay' onChange={e => { this.onChange(e) }} placeholder='Please input your barangay' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Town/City'>
                {getFieldDecorator('resTownCity', {
                  rules: [{
                    required: true,
                    message: 'Please input your city'
                  }]
                })(
                  <Input name='resTownCity' onChange={e => { this.onChange(e) }} placeholder='Please input your city' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Province'>
                {getFieldDecorator('resProvince', {
                  rules: [{
                    required: true,
                    message: 'Please input your province'
                  }]
                })(
                  <Input name='resProvince' onChange={e => { this.onChange(e) }} placeholder='Please input your province' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Zip Code'>
                {getFieldDecorator('resZipCode', {
                  rules: [{
                    required: true,
                    message: 'Please input your zip code'
                  }]
                })(
                  <Input name='resZipCode' onChange={e => { this.onChange(e) }} placeholder='Please input your zip code' />
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 23, offset: 1 }} lg={{ span: 11, offset: 1 }}>
              <h3 style={{textAlign: 'center'}}>Permanent Address</h3>
              <FormItem wrapperCol={{ span: 16, offset: 8 }}>
                <Checkbox
                  value={this.state.checkSameAs}
                  onChange={this.handleSameAs}
                >
                  Same as Present Address
                </Checkbox>
              </FormItem>
              <FormItem {...formItemLayout} label='Residence'>
                {getFieldDecorator('permAddress', {
                  rules: [{
                    required: true,
                    message: 'Please input your address'
                  }]
                })(
                  <Input name='permAddress' onChange={e => { this.onChange(e) }} placeholder='Please input your address' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Street'>
                {getFieldDecorator('permStreet', {
                  rules: [{
                    required: true,
                    message: 'Please input your street'
                  }]
                })(
                  <Input name='permStreet' onChange={e => { this.onChange(e) }} placeholder='Please input your street' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Barangay'>
                {getFieldDecorator('permBarangay', {
                  rules: [{
                    required: true,
                    message: 'Please input your barangay'
                  }]
                })(
                  <Input name='permBarangay' onChange={e => { this.onChange(e) }} placeholder='Please input your barangay' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Town/City'>
                {getFieldDecorator('permTownCity', {
                  rules: [{
                    required: true,
                    message: 'Please input your city'
                  }]
                })(
                  <Input name='permTownCity' onChange={e => { this.onChange(e) }} placeholder='Please input your city' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Province'>
                {getFieldDecorator('permProvince', {
                  rules: [{
                    required: true,
                    message: 'Please input your province'
                  }]
                })(
                  <Input name='permProvince' onChange={e => { this.onChange(e) }} placeholder='Please input your province' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Zip Code'>
                {getFieldDecorator('permZipCode', {
                  rules: [{
                    required: true,
                    message: 'Please input your zip code'
                  }]
                })(
                  <Input name='permZipCode' onChange={e => { this.onChange(e) }} placeholder='Please input your zip code' />
                )}
              </FormItem>
            </Col>
            </Row>
          </Panel>
          <Panel header='FAMILY BACKGROUND' key='3'>
            <Row>
              <Col xs={{ span: 23, offset: 1 }} lg={{ span: 11, offset: 1 }}>
                <FormItem {...formItemLayout} label={'Father\'s Name'}>
                  {getFieldDecorator('father', {
                    rules: [{
                      required: true,
                      message: 'Please input your father\'s name'
                    }]
                  })(
                    <Input name='father' onChange={e => { this.onChange(e) }} placeholder={'Please input your father\'s name'} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label={'Father\'s Occupation'}>
                  {getFieldDecorator('fatherOccupation', {
                    rules: [{
                      required: true,
                      message: 'Please input your father\'s occupation'
                    }]
                  })(
                    <Input name='fatherOccupation' onChange={e => { this.onChange(e) }} placeholder={'Please input your father\'s occupation'} />
                  )}
                </FormItem>
                <Divider />
                <FormItem {...formItemLayout} label={'Mother\'s Name'}>
                  {getFieldDecorator('mother', {
                    rules: [{
                      required: true,
                      message: 'Please input your mother\'s name'
                    }]
                  })(
                    <Input name='mother' onChange={e => { this.onChange(e) }} placeholder={'Please input your mother\'s name'} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label={'Mother\'s Occupation'}>
                  {getFieldDecorator('motherOccupation', {
                    rules: [{
                      required: true,
                      message: 'Please input your mother\'s occupation'
                    }]
                  })(
                    <Input name='motherOccupation' onChange={e => { this.onChange(e) }} placeholder={'Please input your mother\'s occupation'} />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 23, offset: 1 }} lg={{ span: 11, offset: 1 }}>
                <h3 style={{textAlign: 'center'}}>Emergency Contact Person</h3>
                <FormItem {...formItemLayout} label={'Contact Person'}>
                  {getFieldDecorator('emergencyContact', {
                    rules: [{
                      required: true,
                      message: 'Please input name to contact'
                    }]
                  })(
                    <Input name='emergencyContact' onChange={e => { this.onChange(e) }} placeholder={'Please input name to contact'} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label={'Address'}>
                  {getFieldDecorator('emergencyAddress', {
                    rules: [{
                      required: true,
                      message: 'Please input your contact\'s information'
                    }]
                  })(
                    <Input name='emergencyAddress' onChange={e => { this.onChange(e) }} placeholder={'Please input your contact\'s information'} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label='Mobile No.'
                >
                  {getFieldDecorator('emergencyMobileNo',
                    {
                      rules: [{
                        required: true,
                        message: 'Please input your contact\'s information'
                      }]
                    })(
                    <Input name='emergencyMobileNo' onChange={e => { this.onChange(e) }} style={{ width: '100%' }} placeholder={'Please input your contact\'s mobile number'} />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Panel>
        </Collapse>

      </Form>
    )
  }
}

ProfileForm.propTypes = {

}

export default ProfileForm
