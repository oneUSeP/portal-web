import React, { Component } from 'react'
import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'
import 'antd/lib/card/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/avatar/style/css'
import 'antd/lib/spin/style/css'
import 'antd/lib/popover/style/css'
import 'antd/lib/popconfirm/style/css'
import 'antd/lib/message/style/css'
import './styles.css'

import { Form, Row, Col, Card, Icon, Avatar, Spin, Popover, Button, Tooltip, Popconfirm, message } from 'antd'
const ButtonGroup = Button.Group
const { Meta } = Card

import toUpper from 'upper-case'
import ProfileForm from './ProfileForm'
import moment from 'moment'
import _ from 'lodash'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      profile: null,
      visible: false,
      isEditing: false,
      isSubmit: false
    }
  }

  componentWillReceiveProps (nextProps) {
    let {profile, creatingProfileSuccess} = nextProps
    if (profile) {
      this.setState({profile: {
        studentNo: profile.get('StudentNo'),
        lastName: profile.get('LastName'),
        firstName: profile.get('FirstName'),
        middleName: profile.get('MiddleName'),
        middleNameInitial: profile.get('MiddleInitial').charAt(0),
        extName: profile.get('ExtName'),
        dateOfBirth: profile.get('DateOfBirth'),
        placeOfBirth: profile.get('PlaceOfBirth'),
        gender: profile.get('Gender'),
        civilStatusId: profile.get('CivilStatusID'),
        religionId: profile.get('ReligionID'),
        nationalityId: profile.get('NationalityID'),
        resAddress: profile.get('Email'),
        resStreet: profile.get('Res_Street'),
        resBarangay: profile.get('Res_Barangay'),
        resTownCity: profile.get('Res_TownCity'),
        resZipCode: profile.get('Res_ZipCode'),
        resProvince: profile.get('Res_Province'),
        permAddress: profile.get('Perm_Address'),
        permStreet: profile.get('Perm_Street'),
        permBarangay: profile.get('Perm_Barangay'),
        permTownCity: profile.get('Perm_TownCity'),
        permZipCode: profile.get('Perm_ZipCode'),
        permProvince: profile.get('Perm_Province'),
        email: profile.get('Email'),
        telNo: profile.get('TelNo'),
        mobileNo: profile.get('MobileNo'),
        bloodType: profile.get('BloodType'),
        height: profile.get('Height'),
        weight: profile.get('Weight'),
        father: profile.get('Father'),
        fatherOccupation: profile.get('Father_Occupation'),
        mother: profile.get('Mother'),
        motherOccupation: profile.get('Mother_Occupation'),
        emergencyContact: profile.get('Emergency_Contact'),
        emergencyAddress: profile.get('Emergency_Address'),
        emergencyMobileNo: profile.get('Emergency_MobileNo'),
        studentPicture: profile.get('StudentPicture')
      }})
    }
    if (creatingProfileSuccess) {
      this.setState({isEditing: false})
      message.success('Profile update success!')
      let user = this.props.auth.get('user')
      let { profile } = this.props
      this.props.getProfile(user.get('username'))
    }
  }

  hide = () => {
    this.setState({
      visible: false
    })
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible })
  }

  componentWillMount () {
    let user = this.props.auth.get('user')
    let { profile } = this.props
    this.props.getProfile(user.get('username'))
  }

  render () {
    console.log(this.state)
    let { fetchingProfile } = this.props
    const WrappedForm = Form.create({
      mapPropsToFields (props) {
        let data = props.data
        let initialValue = false
        return {
          lastName: Form.createFormField({
            ...props,
            value: data ? data.lastName : ''
          }),
          firstName: Form.createFormField({
            ...props,
            value: data ? data.firstName : ''
          }),
          middleName: Form.createFormField({
            ...props,
            value: data ? data.middleName : ''
          }),
          middleNameInitial: Form.createFormField({
            ...props,
            value: data ? data.middleNameInitial : ''
          }),
          extName: Form.createFormField({
            ...props,
            value: data ? data.extName : ''
          }),
          dateOfBirth: Form.createFormField({
            ...props,
            value: data && data.dateOfBirth != null ? moment(moment(data.dateOfBirth)) : null
          }),
          placeOfBirth: Form.createFormField({
            ...props,
            value: data ? data.placeOfBirth : ''
          }),
          email: Form.createFormField({
            ...props,
            value: data ? data.email : ''
          }),
          telNo: Form.createFormField({
            ...props,
            value: data ? data.telNo : ''
          }),
          mobileNo: Form.createFormField({
            ...props,
            value: data ? data.mobileNo : ''
          }),
          bloodType: Form.createFormField({
            ...props,
            value: data ? data.bloodType : ''
          }),
          civilStatusId: Form.createFormField({
            ...props,
            value: data ? data.civilStatusId : ''
          }),
          religionId: Form.createFormField({
            ...props,
            value: data ? data.religionId : ''
          }),
          resAddress: Form.createFormField({
            ...props,
            value: data ? data.resAddress : ''
          }),
          resStreet: Form.createFormField({
            ...props,
            value: data ? data.resStreet : ''
          }),
          resBarangay: Form.createFormField({
            ...props,
            value: data ? data.resBarangay : ''
          }),
          resTownCity: Form.createFormField({
            ...props,
            value: data ? data.resTownCity : ''
          }),
          resZipCode: Form.createFormField({
            ...props,
            value: data ? data.resZipCode : ''
          }),
          resProvince: Form.createFormField({
            ...props,
            value: data ? data.resProvince : ''
          }),
          permAddress: Form.createFormField({
            ...props,
            value: data ? data.permAddress : ''
          }),
          permStreet: Form.createFormField({
            ...props,
            value: data ? data.permStreet : '',
            valuePropName: 'value',
            initialValue: data ? data.permStreet : ''
          }),
          permBarangay: Form.createFormField({
            ...props,
            value: data ? data.permBarangay : '',
            valuePropName: 'value',
            initialValue: data ? data.permBarangay : ''
          }),
          permTownCity: Form.createFormField({
            ...props,
            value: data ? data.permTownCity : '',
            valuePropName: 'value',
            initialValue: data ? data.permTownCity : ''
          }),
          permZipCode: Form.createFormField({
            ...props,
            value: data ? data.permZipCode : '',
            initialValue: data ? data.permZipCode : ''
          }),
          permProvince: Form.createFormField({
            ...props,
            value: data ? data.permProvince : '',
            valuePropName: 'value',
            initialValue: data ? data.permProvince : ''
          }),
          father: Form.createFormField({
            ...props,
            value: data ? data.father : ''
          }),
          fatherOccupation: Form.createFormField({
            ...props,
            value: data ? data.fatherOccupation : ''
          }),
          mother: Form.createFormField({
            ...props,
            value: data ? data.mother : ''
          }),
          motherOccupation: Form.createFormField({
            ...props,
            value: data ? data.motherOccupation : ''
          }),
          emergencyContact: Form.createFormField({
            ...props,
            value: data ? data.emergencyContact : ''
          }),
          emergencyAddress: Form.createFormField({
            ...props,
            value: data ? data.emergencyAddress : ''
          }),
          emergencyMobileNo: Form.createFormField({
            ...props,
            value: data ? data.emergencyMobileNo : ''
          }),
          sameAs: Form.createFormField({
            ...props
          }),
          height: Form.createFormField({
            ...props,
            value: data ? data.height : ''
          }),
          weight: Form.createFormField({
            ...props,
            value: data ? data.weight : ''
          })
        }
      },
      onValuesChange (props, values) {
        _.mapKeys(values, function (value, key) {
          console.log(key, value)
        })
      }
    })(ProfileForm)
    return (
      <Row>
      <Spin spinning={this.props.creatingProfile} tip='Updating...'>
        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 7, offset: 1 }} md={{ span: 7, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 5, offset: 0 }}>
          <Card loading={fetchingProfile}
            style={{ width: '100%' }}
            cover={fetchingProfile
            ? (<div className='example'><Spin /></div>)
            : (<img alt='example' src={this.state.profile != null ? 'data:image/png;base64, ' + this.state.profile.studentPicture : 'http://portal.usep.edu.ph/usep-logo.png'} />)}
            actions={
            !this.state.isEditing
            ? [<Icon style={{ fontSize: '22px' }} type={fetchingProfile ? 'loading' : 'setting'} />, <Tooltip placement='bottom' title={'Edit your information'}><Icon type={fetchingProfile ? 'loading' : 'edit'} style={{ fontSize: '25px' }} onClick={e => { this.setState({ isEditing: true }) }} /></Tooltip>, <Icon style={{ fontSize: '22px' }} type={fetchingProfile ? 'loading' : 'ellipsis'} />]
            : [<ButtonGroup>
                  <Button type='danger' icon='close' shape={'circle'} size='large' style={{ fontSize: '22px' }} onClick={e => { this.setState({isEditing: false}) }} />
                </ButtonGroup>]}>
            <Meta
              // avatar={<Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size='large' >{profile ? profile.get('FirstName').charAt(0) : 'Empty'}</Avatar>}
              title={this.state.profile != null ? toUpper(this.state.profile.lastName) + ', ' + this.state.profile.firstName + ' ' + this.state.profile.middleName : 'Empty'}
              description={this.state.profile != null ? this.state.profile.studentNo : 'Empty'}
            />
          </Card>
        </Col>
        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 7, offset: 1 }} md={{ span: 16, offset: 1 }} lg={{ span: 17, offset: 1 }} xl={{ span: 18, offset: 1 }}>
        {WrappedForm ? <Spin spinning={fetchingProfile} tip='Loading...'><WrappedForm data={this.state.profile != null ? this.state.profile : null} isEditing={this.state.isEditing} {...this.props} /></Spin> : null}
        </Col>
      </Spin>
      </Row>
    )
  }
}

Profile.propTypes = {

}

export default Profile
