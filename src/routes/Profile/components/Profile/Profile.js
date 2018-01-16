import React, { Component } from 'react'
import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'
import 'antd/lib/card/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/avatar/style/css'
import 'antd/lib/spin/style/css'
import './styles.css'

import { Row, Col, Card, Icon, Avatar, Spin } from 'antd'
const { Meta } = Card

import toUpper from 'upper-case'
class Profile extends Component {

  componentWillMount () {
    let user = this.props.auth.get('user')
    this.props.getProfile(user.get('username'))
  }

  render () {
    let { profile, fetchingProfile } = this.props
    if (profile) {
      var image = profile.get('StudentPicture')
    }
    return (
      <Row>
        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 7, offset: 1 }} md={{ span: 7, offset: 1 }} lg={{ span: 6, offset: 0 }} xl={{ span: 4, offset: 0 }}>
          <Card loading={fetchingProfile}
            style={{ width: '100%' }}
            cover={fetchingProfile ? (<div className='example'>
            <Spin />
          </div>) : (<img alt='example' src={'data:image/png;base64, ' + profile.get('StudentPicture')} />)}
            actions={[<Icon type={fetchingProfile ? 'loading' : 'setting'} />, <Icon type={fetchingProfile ? 'loading' : 'edit'} />, <Icon type={fetchingProfile ? 'loading' : 'ellipsis'} />]}>
            <Meta
              avatar={<Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size='large' >{profile.get('FirstName').charAt(0)}</Avatar>}
              title={toUpper(profile.get('LastName')) + ', ' + profile.get('FirstName') + ' ' + profile.get('MiddleName')}
              description={profile.get('StudentNo')}
            />
          </Card>
        </Col>
        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 7, offset: 1 }} md={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 0 }} xl={{ span: 20, offset: 0 }}></Col>
      </Row>
    )
  }
}

Profile.propTypes = {

}

export default Profile
