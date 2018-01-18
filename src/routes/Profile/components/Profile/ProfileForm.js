import React, { Component } from 'react'
import moment from 'moment'
import { Form, Input, Button, Checkbox, Row, Col, DatePicker, Select, Collapse, Divider, Popconfirm, message, InputNumber } from 'antd'
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
import 'antd/lib/popconfirm/style/css'
import 'antd/lib/message/style/css'
import 'antd/lib/input-number/style/css'

import 'antd/lib/divider/style/css'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

class ProfileForm extends Component {
  constructor (props) {
    super(props)
    let {data} = props
    this.state = {
      studentNo: data ? data.studentNo : '',
      lastName: data ? data.lastName : '',
      firstName: data ? data.firstName : '',
      middleName: data ? data.middleName : '',
      middleNameInitial: data ? data.middleNameInitial.charAt(0) : '',
      extName: data ? data.extName : '',
      dateOfBirth: data ? moment.utc(data.dateOfBirth).format('YYYY-MM-DD') : moment.utc().format('YYYY-MM-DD'),
      placeOfBirth: data ? data.placeOfBirth : '',
      gender: data ? data.gender : '',
      civilStatusId: data ? data.civilStatusId : '1',
      religionId: data ? data.religionId : '',
      nationalityId: data ? data.nationalityId : '',
      resAddress: data ? data.resAddress : '',
      resStreet: data ? data.resStreet : '',
      resBarangay: data ? data.resBarangay : '',
      resTownCity: data ? data.resTownCity : '',
      resZipCode: data ? data.resZipCode : 0,
      resProvince: data ? data.resProvince : '',
      permAddress: data ? data.permAddress : '',
      permStreet: data ? data.permStreet : '',
      permBarangay: data ? data.permBarangay : '',
      permTownCity: data ? data.permTownCity : '',
      permZipCode: data ? data.permZipCode : 0,
      permProvince: data ? data.permProvince : '',
      email: data ? data.email : '',
      telNo: data ? data.telNo : '',
      mobileNo: data ? data.mobileNo : '',
      bloodType: data ? data.bloodType : '',
      height: data ? data.height : 0,
      weight: data ? data.weight : 0,
      father: data ? data.father : '',
      fatherOccupation: data ? data.fatherOccupation : '',
      mother: data ? data.mother : '',
      motherOccupation: data ? data.motherOccupation : '',
      emergencyContact: data ? data.emergencyContact : '',
      emergencyAddress: data ? data.emergencyAddress : '',
      emergencyMobileNo: data ? data.emergencyMobileNo : '',
      studentPicture: data ? data.studentPicture : '',
      isLoading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isSubmit) {
      console.log('wew')
      this.check()
    }
  }

  confirm = (e) => {
    this.check()
  }

  cancel = (e) => {
    console.log(e)
  }

  check = () => {
    let {data} = this.props
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          this.setState({
            studentNo: data ? data.studentNo : '',
            lastName: data ? data.lastName : '',
            firstName: data ? data.firstName : '',
            middleName: data ? data.middleName : '',
            middleNameInitial: data ? data.middleNameInitial.charAt(0) : '',
            extName: data ? data.extName : '',
            dateOfBirth: data ? moment.utc(data.dateOfBirth).format('YYYY-MM-DD') : moment.utc().format('YYYY-MM-DD'),
            placeOfBirth: data ? data.placeOfBirth : '',
            gender: data ? data.gender : '',
            civilStatusId: data ? data.civilStatusId : '1',
            religionId: data ? data.religionId : '',
            nationalityId: data ? data.nationalityId : '',
            resAddress: data ? data.resAddress : '',
            resStreet: data ? data.resStreet : '',
            resBarangay: data ? data.resBarangay : '',
            resTownCity: data ? data.resTownCity : '',
            resZipCode: data ? data.resZipCode : '',
            resProvince: data ? data.resProvince : '',
            permAddress: data ? data.permAddress : '',
            permStreet: data ? data.permStreet : '',
            permBarangay: data ? data.permBarangay : '',
            permTownCity: data ? data.permTownCity : '',
            permZipCode: data ? data.permZipCode : '',
            permProvince: data ? data.permProvince : '',
            email: data ? data.email : '',
            telNo: data ? data.telNo : '',
            mobileNo: data ? data.mobileNo : '',
            bloodType: data ? data.bloodType : '',
            height: data ? data.height : '',
            weight: data ? data.weight : '',
            father: data ? data.father : '',
            fatherOccupation: data ? data.fatherOccupation : '',
            mother: data ? data.mother : '',
            motherOccupation: data ? data.motherOccupation : '',
            emergencyContact: data ? data.emergencyContact : '',
            emergencyAddress: data ? data.emergencyAddress : '',
            emergencyMobileNo: data ? data.emergencyMobileNo : '',
            studentPicture: data ? data.studentPicture : '', isLoading: true })
          const data = this.state
          this.props.updateProfile(data)
        } else {
          message.error('All required fields must be filled out.')
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

  handleInputNumberWeight = (value) => {
    this.setState({
      weight: value
    })
  }
  handleInputNumberHeight = (value) => {
    this.setState({
      height: value
    })
  }
  handleInputNumbeResZip = (value) => {
    this.setState({
      resZipCode: value
    })
  }
  handleInputNumberPermZip = (value) => {
    this.setState({
      permZipCode: value
    })
  }

  handleSameAs = (e) => {
    var residence = this.props.form.getFieldsValue(['resAddress', 'resStreet', 'resBarangay', 'resTownCity', 'resZipCode', 'resProvince'])
    if (e.target.checked) {
      this.setState({
        permAddress: residence.resAddress,
        permStreet: residence.resStreet,
        permBarangay: residence.resBarangay,
        permTownCity: residence.resTownCity,
        permZipCode: residence.resZipCode,
        permProvince: residence.resProvince
      }, () => {
        this.props.form.setFields({
          permAddress: {
            value: residence.resAddress
          },
          permStreet: {
            value: residence.resStreet
          },
          permBarangay: {
            value: residence.resBarangay
          },
          permTownCity: {
            value: residence.resTownCity
          },
          permZipCode: {
            value: residence.resZipCode
          },
          permProvince: {
            value: residence.resProvince
          }
        })
      })
    }
  }

  handleReset = () => {
    this.props.form.resetFields(
      ['sameAs',
        'permAddress',
        'permStreet',
        'permBarangay',
        'permTownCity',
        'permZipCode',
        'permProvince']
    )
  }

  render () {
    console.log(this.state)
    const { getFieldDecorator } = this.props.form
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select date!' }]
    }

    return (
      <Form>
        {this.props.isEditing ? (<Row><Col style={{marginTop: '1em', textAlign: 'center'}} xs={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}><Popconfirm  title='Are you sure to save this changes?' onConfirm={this.confirm} onCancel={this.cancel} okText='Yes' cancelText='No'><Button onClick={this.hide} shape='circle' style={{ fontSize: '22px' }} type='primary' icon='save' size='large' /></Popconfirm>
        </Col></Row>): null}
        <Collapse bordered={false} defaultActiveKey={this.props.isEditing ? ['1', '2', '3'] : ['1']}>
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
                    <Input disabled={!this.props.isEditing} name='lastName' onChange={e => { this.onChange(e) }} disabled name='lastName' onChange={e => { this.onChange(e) }} placeholder='Please input your surname' />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Given name'>
                  {getFieldDecorator('firstName', {
                    rules: [{
                      required: true,
                      message: 'Please input your name'
                    }]
                  })(
                    <Input disabled={!this.props.isEditing} name='firstName' onChange={e => { this.onChange(e) }} disabled placeholder='Please input your name' />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Middle Name'>
                  {getFieldDecorator('middleName')(
                    <Input disabled={!this.props.isEditing} name='middleName' onChange={e => { this.onChange(e) }} disabled placeholder='Please input your middle name' />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Middle Initial'>
                  {getFieldDecorator('middleNameInitial', {
                    rules: [{
                      required: true,
                      message: 'Please input your middle name initial'
                    }]
                  })(
                    <Input disabled={!this.props.isEditing} name='middleNameInitial' onChange={e => { this.onChange(e) }} disabled placeholder='Please input your middle name initial' />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Extension'>
                  {getFieldDecorator('extName')(
                    <Input disabled={!this.props.isEditing} name='extName' onChange={e => { this.onChange(e) }} placeholder='Please input your extension name' />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Birthdate'>
                  {getFieldDecorator('dateOfBirth', config)(
                    <DatePicker disabled={!this.props.isEditing} format='YYYY-MM-DD' onChange={this.onChangeDate} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Birthplace'>
                  {getFieldDecorator('placeOfBirth', {
                    rules: [{
                      required: true,
                      message: 'Please input birth place'
                    }]
                  })(
                    <Input disabled={!this.props.isEditing} name='placeOfBirth' onChange={e => { this.onChange(e) }} placeholder='Please input birth place' />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Height (cm)'>
                  {getFieldDecorator('height', {
                    rules: [{
                      required: true,
                      message: 'Please input height',
                      type: 'integer'
                    }]
                  })(
                    <InputNumber disabled={!this.props.isEditing} onChange={e => { this.handleInputNumberHeight(e) }} placeholder='Please input your zip code Please input your zip code and it must be a number' />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 23, offset: 1 }} lg={{ span: 11, offset: 1 }}>
                <FormItem {...formItemLayout} label='Sex'>
                  {getFieldDecorator('gender', {
                    rules: [{ required: true, message: 'Please select your gender!' }],
                    initialValue: this.props.data ? this.props.data.gender : 'M'
                  })(
                    <Select
                      disabled={!this.props.isEditing}
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
                    <Input disabled={!this.props.isEditing} name='email' onChange={e => { this.onChange(e) }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label='Telephone'
                >
                  {getFieldDecorator('telNo')(
                    <Input disabled={!this.props.isEditing} name='telNo' onChange={e => { this.onChange(e) }} style={{ width: '100%' }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label='Mobile'
                >
                  {getFieldDecorator('mobileNo', {
                    rules: [{ required: true, message: 'Please input your mobile number!' }]
                  })(
                    <Input disabled={!this.props.isEditing} name='mobileNo' onChange={e => { this.onChange(e) }} style={{ width: '100%' }} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='Blood Type'>
                  {getFieldDecorator('bloodType', {
                    valuePropName: 'value',
                    initialValue: this.props.data ? this.props.data.bloodType : ''
                  })(
                    <Select
                      disabled={!this.props.isEditing}
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
                    rules: [{ required: true, message: 'Please select your status' }],
                    valuePropName: 'value',
                    initialValue: this.props.data ? this.props.data.civilStatusId : '1'
                  })(
                    <Select
                      disabled={!this.props.isEditing}
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
                    rules: [{ required: true, message: 'Please select your religion' }],
                    valuePropName: 'value',
                    initialValue: this.props.data ? this.props.data.religionId : '1'
                  })(
                    <Select
                      disabled={!this.props.isEditing}
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
                <FormItem {...formItemLayout} label='Weight (grams)'>
                  {getFieldDecorator('weight', {
                    rules: [{
                      required: true,
                      message: 'Please input weight',
                      type: 'integer'
                    }]
                  })(
                    <InputNumber disabled={!this.props.isEditing} onChange={e => { this.handleInputNumberWeight(e) }} placeholder='Please input your zip code Please input your zip code and it must be a number' />
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
                  <Input disabled={!this.props.isEditing} name='resAddress' onChange={e => { this.onChange(e) }} placeholder='Please input your address' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Street'>
                {getFieldDecorator('resStreet', {
                  rules: [{
                    required: true,
                    message: 'Please input your street'
                  }]
                })(
                  <Input disabled={!this.props.isEditing} name='resStreet' onChange={e => { this.onChange(e) }} placeholder='Please input your street' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Barangay'>
                {getFieldDecorator('resBarangay', {
                  rules: [{
                    required: true,
                    message: 'Please input your barangay'
                  }]
                })(
                  <Input disabled={!this.props.isEditing} name='resBarangay' onChange={e => { this.onChange(e) }} placeholder='Please input your barangay' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Town/City'>
                {getFieldDecorator('resTownCity', {
                  rules: [{
                    required: true,
                    message: 'Please input your city'
                  }]
                })(
                  <Input disabled={!this.props.isEditing} name='resTownCity' onChange={e => { this.onChange(e) }} placeholder='Please input your city' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Province'>
                {getFieldDecorator('resProvince', {
                  rules: [{
                    required: true,
                    message: 'Please input your province'
                  }]
                })(
                  <Input disabled={!this.props.isEditing} name='resProvince' onChange={e => { this.onChange(e) }} placeholder='Please input your province' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Zip Code'>
                {getFieldDecorator('resZipCode', {
                  rules: [{
                    required: true,
                    message: 'Please input your zip code and it must be a number',
                    type: 'integer'
                  }]
                })(
                  <InputNumber disabled={!this.props.isEditing} onChange={e => { this.handleInputNumbeResZip(e) }} placeholder='Please input your zip code Please input your zip code and it must be a number' />
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 23, offset: 1 }} lg={{ span: 11, offset: 1 }}>
              <h3 style={{textAlign: 'center'}}>Permanent Address</h3>
              <FormItem {...formItemLayout} label={<Button disabled={!this.props.isEditing} type='ghost' shape='circle' icon='reload' onClick={this.handleReset} />}>
                {getFieldDecorator('sameAs', {
                  valuePropName: 'checked',
                  initialValue: false
                })(
                  <Checkbox
                    disabled={!this.props.isEditing}
                    onChange={this.handleSameAs}
                  >
                  Same as Present Address
                </Checkbox>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Residence'>
                {getFieldDecorator('permAddress', {
                  rules: [{
                    required: true,
                    message: 'Please input your address'
                  }]
                })(
                  <Input disabled={!this.props.isEditing} name='permAddress' onChange={e => { this.onChange(e) }} placeholder='Please input your address' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Street'>
                {getFieldDecorator('permStreet', {
                  rules: [{
                    required: true,
                    message: 'Please input your street'
                  }],
                  initialValue: this.props.data ? this.props.data.permStreet : ''
                })(
                  <Input disabled={!this.props.isEditing} name='permStreet' onChange={e => { this.onChange(e) }} placeholder='Please input your street' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Barangay'>
                {getFieldDecorator('permBarangay', {
                  rules: [{
                    required: true,
                    message: 'Please input your barangay'
                  }],
                  initialValue: this.props.data ? this.props.data.permBarangay : ''
                })(
                  <Input disabled={!this.props.isEditing} name='permBarangay' onChange={e => { this.onChange(e) }} placeholder='Please input your barangay' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Town/City'>
                {getFieldDecorator('permTownCity', {
                  rules: [{
                    required: true,
                    message: 'Please input your city'
                  }],
                  initialValue: this.props.data ? this.props.data.permTownCity : ''
                })(
                  <Input disabled={!this.props.isEditing} name='permTownCity' onChange={e => { this.onChange(e) }} placeholder='Please input your city' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Province'>
                {getFieldDecorator('permProvince', {
                  rules: [{
                    required: true,
                    message: 'Please input your province'
                  }],
                  initialValue: this.props.data ? this.props.data.permProvince : ''
                })(
                  <Input disabled={!this.props.isEditing} name='permProvince' onChange={e => { this.onChange(e) }} placeholder='Please input your province' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Zip Code'>
                {getFieldDecorator('permZipCode', {
                  rules: [{
                    required: true,
                    message: 'Please input your zip code and it must be a number',
                    type: 'integer'
                  }],
                  initialValue: this.props.data ? this.props.data.permZipCode : ''
                })(
                  <InputNumber disabled={!this.props.isEditing} onChange={e => { this.handleInputNumberPermZip(e) }} placeholder='Please input your zip code Please input your zip code and it must be a number' />
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
                    <Input disabled={!this.props.isEditing} name='father' onChange={e => { this.onChange(e) }} placeholder={'Please input your father\'s name'} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label={'Father\'s Occupation'}>
                  {getFieldDecorator('fatherOccupation', {
                    rules: [{
                      required: true,
                      message: 'Please input your father\'s occupation'
                    }]
                  })(
                    <Input disabled={!this.props.isEditing} name='fatherOccupation' onChange={e => { this.onChange(e) }} placeholder={'Please input your father\'s occupation'} />
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
                    <Input disabled={!this.props.isEditing} name='mother' onChange={e => { this.onChange(e) }} placeholder={'Please input your mother\'s name'} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label={'Mother\'s Occupation'}>
                  {getFieldDecorator('motherOccupation', {
                    rules: [{
                      required: true,
                      message: 'Please input your mother\'s occupation'
                    }]
                  })(
                    <Input disabled={!this.props.isEditing} name='motherOccupation' onChange={e => { this.onChange(e) }} placeholder={'Please input your mother\'s occupation'} />
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
                    <Input disabled={!this.props.isEditing} name='emergencyContact' onChange={e => { this.onChange(e) }} placeholder={'Please input name to contact'} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label={'Address'}>
                  {getFieldDecorator('emergencyAddress', {
                    rules: [{
                      required: true,
                      message: 'Please input your contact\'s information'
                    }]
                  })(
                    <Input disabled={!this.props.isEditing} name='emergencyAddress' onChange={e => { this.onChange(e) }} placeholder={'Please input your contact\'s information'} />
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
                    <Input disabled={!this.props.isEditing} name='emergencyMobileNo' onChange={e => { this.onChange(e) }} style={{ width: '100%' }} placeholder={'Please input your contact\'s mobile number'} />
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
