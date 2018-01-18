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

class Profile extends Component {
  state = {
    visible: false,
    isEditing: false
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
    if (!profile) {
      this.props.getProfile(user.get('username'))
    }
  }

  confirm = (e) => {
    console.log(e)
    message.success('Click on Yes')
  }

  cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }

  render () {
    let { profile, fetchingProfile } = this.props
    if (profile) {
      var image = profile.get('StudentPicture')
      var birthDate = moment.utc(profile.get('DateOfBirth')).format('YYYY-MM-DD')
    }
    const WrappedForm = Form.create({
      mapPropsToFields (props) {
        return {
          lastName: Form.createFormField({
            ...props,
            value: profile ? props.profile.get('LastName') : ''
          }),
          firstName: Form.createFormField({
            ...props,
            value: profile ? props.profile.get('FirstName') : ''
          }),
          middleName: Form.createFormField({
            ...props,
            value: profile ? props.profile.get('MiddleName') : ''
          }),
          middleNameInitial: Form.createFormField({
            ...props,
            value: profile ? props.profile.get('MiddleName').charAt(0) : ''
          }),
          extName: Form.createFormField({
            ...props,
            value: profile ? props.profile.get('ExtName') : ''
          }),
          dateOfBirth: Form.createFormField({
            ...props,
            value: profile ? moment(birthDate) : null
          }),
          placeOfBirth: Form.createFormField({
            ...props,
            value: profile ? profile.get('PlaceOfBirth') : ''
          }),
          email: Form.createFormField({
            ...props,
            value: profile ? profile.get('Email') : ''
          }),
          telNo: Form.createFormField({
            ...props,
            value: profile ? profile.get('TelNo') : ''
          }),
          mobileNo: Form.createFormField({
            ...props,
            value: profile ? profile.get('MobileNo') : ''
          }),
          bloodType: Form.createFormField({
            ...props,
            value: profile ? profile.get('BloodType') : ''
          }),
          civilStatusId: Form.createFormField({
            ...props,
            value: profile ? profile.get('CivilStatusID') : ''
          }),
          religionId: Form.createFormField({
            ...props,
            value: profile ? profile.get('ReligionID') : ''
          }),
          resAddress: Form.createFormField({
            ...props,
            value: profile ? profile.get('Res_Address') : ''
          }),
          resStreet: Form.createFormField({
            ...props,
            value: profile ? profile.get('Res_Street') : ''
          }),
          resBarangay: Form.createFormField({
            ...props,
            value: profile ? profile.get('Res_Barangay') : ''
          }),
          resTownCity: Form.createFormField({
            ...props,
            value: profile ? profile.get('Res_TownCity') : ''
          }),
          resZipCode: Form.createFormField({
            ...props,
            value: profile ? profile.get('Res_ZipCode') : ''
          }),
          resProvince: Form.createFormField({
            ...props,
            value: profile ? profile.get('Res_Province') : ''
          }),
          permAddress: Form.createFormField({
            ...props,
            value: profile ? profile.get('Perm_Address') : ''
          }),
          permStreet: Form.createFormField({
            ...props,
            value: profile ? profile.get('Perm_Street') : ''
          }),
          permBarangay: Form.createFormField({
            ...props,
            value: profile ? profile.get('Perm_Barangay') : ''
          }),
          permTownCity: Form.createFormField({
            ...props,
            value: profile ? profile.get('Perm_TownCity') : ''
          }),
          permZipCode: Form.createFormField({
            ...props,
            value: profile ? profile.get('Perm_ZipCode') : ''
          }),
          permProvince: Form.createFormField({
            ...props,
            value: profile ? profile.get('Perm_Province') : ''
          }),
          father: Form.createFormField({
            ...props,
            value: profile ? profile.get('Father') : ''
          }),
          fatherOccupation: Form.createFormField({
            ...props,
            value: profile ? profile.get('Father_Occupation') : ''
          }),
          mother: Form.createFormField({
            ...props,
            value: profile ? profile.get('Mother') : ''
          }),
          motherOccupation: Form.createFormField({
            ...props,
            value: profile ? profile.get('Mother_Occupation') : ''
          }),
          emergencyContact: Form.createFormField({
            ...props,
            value: profile ? profile.get('Emergency_Contact') : ''
          }),
          emergencyAddress: Form.createFormField({
            ...props,
            value: profile ? profile.get('Emergency_Address') : ''
          }),
          emergencyMobileNo: Form.createFormField({
            ...props,
            value: profile ? profile.get('Emergency_MobileNo') : ''
          })
        }
      },
      onValuesChange (_, values) {
        console.log(values)
      }
    })(ProfileForm)
    return (
      <Row>
        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 7, offset: 1 }} md={{ span: 7, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 5, offset: 0 }}>
          <Card loading={fetchingProfile}
            style={{ width: '100%' }}
            cover={fetchingProfile 
            ? (<div className='example'><Spin /></div>)
            : (<img alt='example' src={profile ? 'data:image/png;base64, ' + image : 'http://localhost:3000/usep-logo.png'} />)}
            actions={
            !this.state.isEditing
            ? [<Icon style={{ fontSize: '22' }} type={fetchingProfile ? 'loading' : 'setting'} />, <Tooltip placement='bottom' title={'Edit your information'}><Icon type={fetchingProfile ? 'loading' : 'edit'} style={{ fontSize: '25', color: '#08c' }} onClick={e => { this.setState({ isEditing: true }) }} /></Tooltip>, <Icon style={{ fontSize: '22' }} type={fetchingProfile ? 'loading' : 'ellipsis'} />]
            : [<ButtonGroup>
                  <Button type='danger' icon='close' shape={'circle'} size='large' style={{ fontSize: '22' }} onClick={e => { this.setState({isEditing: false}) }} />
                  <Popconfirm title='Are you sure to save this changes?' onConfirm={this.confirm} onCancel={this.cancel} okText='Yes' cancelText='No'><Button onClick={this.hide} shape='circle' style={{ fontSize: '22' }} type='primary' icon='save' size='large' /></Popconfirm>
                </ButtonGroup>]}> 
            <Meta
              // avatar={<Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size='large' >{profile ? profile.get('FirstName').charAt(0) : 'Empty'}</Avatar>}
              title={profile ? toUpper(profile.get('LastName')) + ', ' + profile.get('FirstName') + ' ' + profile.get('MiddleName') : 'Empty'}
              description={profile ? profile.get('StudentNo') : 'Empty'}
            />
          </Card>
        </Col>
        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 7, offset: 1 }} md={{ span: 16, offset: 1 }} lg={{ span: 17, offset: 1 }} xl={{ span: 18, offset: 1 }}>
          <WrappedForm isEditing={this.state.isEditing} {...this.props} />
        </Col>
      </Row>
    )
  }
}

Profile.propTypes = {

}

export default Profile
