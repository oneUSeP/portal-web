import React, { Component } from 'react'
import ProfileForm from './ProfileForm'

class Profile extends Component {

  componentWillMount () {
    let user = this.props.auth.get('user')
    this.props.getProfile(user.get('username'))
  }

  render () {
    return (
      <div className='container-fluid container-fluid-spacious' style={{marginTop: '0%'}} >
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>USEP-KMSD | USEP Portal</h6>
              <h3 className='dashhead-title'>Profile</h3>
            </div>
          </div>
        </div>

        <div className='container'>

        </div>
      </div>
    )
  }
}

Profile.propTypes = {

}

export default Profile
