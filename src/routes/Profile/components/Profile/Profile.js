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

import { Row, Col, Card, Icon, Avatar, Spin, Popover, Button, Tooltip, Popconfirm, message } from 'antd'
const { Meta } = Card

import toUpper from 'upper-case'

class Profile extends Component {
  state = {
    visible: false,
  }

  hide = () => {
    this.setState({
      visible: false,
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }

  componentWillMount () {
    let user = this.props.auth.get('user')
    this.props.getProfile(user.get('username'))
  }

  confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
  }
  
  cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  }

  render () {
    let { profile, fetchingProfile } = this.props
    if (profile) {
      var image = profile.get('StudentPicture')
    }
    return (
      <Row>
        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 7, offset: 1 }} md={{ span: 7, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 5, offset: 0 }}>
          <Card loading={fetchingProfile}
            style={{ width: '100%' }}
            cover={fetchingProfile ? (<div className='example'>
            <Spin />
          </div>) : (<img alt='example' src={profile ? 'data:image/png;base64, ' + image : 'http://localhost:3000/usep-logo.png'} />)}
            actions={[<Icon type={fetchingProfile ? 'loading' : 'setting'} />, <Tooltip placement="bottom" title={'Edit your information'}><Icon type={fetchingProfile ? 'loading' : 'edit'} /></Tooltip>, <Icon type={fetchingProfile ? 'loading' : 'ellipsis'} />]}>
            <Meta
              avatar={<Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size='large' >{profile ? profile.get('FirstName').charAt(0) : 'Empty'}</Avatar>}
              title={profile ? toUpper(profile.get('LastName')) + ', ' + profile.get('FirstName') + ' ' + profile.get('MiddleName') : 'Empty'}
              description={profile ? profile.get('StudentNo') : 'Empty'}
            />
          </Card>
        </Col>
        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 7, offset: 1 }} md={{ span: 16, offset: 1 }} lg={{ span: 17, offset: 1 }} xl={{ span: 18, offset: 1 }}>
          <Card title="Personal Information" extra={<Popconfirm title="Are you sure to save this changes?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No"><Button onClick={this.hide} shape="circle" type="ghost" icon="save" size='large'/></Popconfirm>} style={{ width: '100%' }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>
    )
  }
}

Profile.propTypes = {

}

export default Profile
