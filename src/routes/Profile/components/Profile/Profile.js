import React, { Component } from 'react'
import ProfileForm from './ProfileForm'
import upperCase from 'upper-case'

class Profile extends Component {

  componentWillMount () {
    let user = this.props.auth.get('user')
    this.props.getProfile(user.get('username'))
  }

  render () {
    let { profile } = this.props
    if (profile) {
      var image = profile.get('StudentPicture')
    }
    return (
      <div className='container'>
        <div className='dashhead'>
          <div className='dashhead-titles'>
            <h6 className='dashhead-subtitle'>USEP-KMSD | USEP-Portal</h6>
            <h3 className='dashhead-title'>Profile</h3>
          </div>
        </div>

        <hr className='m-t-0 m-b-sm' />

        <div className='tab-content'>
          <div role='tabpanel' className='tab-pane active' id='traffic'>
            <div className='row text-center m-t-md'>
              <div className='col-sm-4 m-b-md'>
                <div className='w-lg m-x-auto'>
                </div>
              </div>
              <div className='col-sm-4 m-b-sm'>
                <div className='w-lg m-x-auto'>
                  <img src={image ? 'data:image/png;base64, ' + image : 'http://localhost:3000/usep-logo.png'} alt='' className='img-circle img-responsive' />
                </div>
                <strong className='text-muted'>{profile ? profile.get('StudentNo') : 'Empty'}</strong>
                <h3>{profile ? upperCase(profile.get('LastName')) + ', ' + profile.get('FirstName') + ' ' + profile.get('MiddleName') : ''}</h3>
              </div>
              <div className='col-sm-4 m-b-md'>
                <div className='w-lg m-x-auto'>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='hr-divider m-t m-b-lg'>
          <h3 className='hr-divider-content hr-divider-heading'>Personal Information</h3>
        </div>

        <hr className='m-t-0 m-b-md' />

      </div>
    )
  }
}

Profile.propTypes = {

}

export default Profile
