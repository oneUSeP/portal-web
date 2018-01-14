import React, { Component } from 'react'
import ProfileForm from './ProfileForm'
import upperCase from 'upper-case'
import Loading from '../../../../components/common/Loading'

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
      <div className='container'>
        <div className='dashhead'>
          <div className='dashhead-titles'>
            <h6 className='dashhead-subtitle'>USEP-KMSD | USEP-Portal</h6>
            <h3 className='dashhead-title'>Profile</h3>
          </div>
        </div>

        <hr className='m-t-0 m-b-sm' />

        <div className='tab-content'>
          <div className='text-center'><Loading hidden={!fetchingProfile} /></div>
          {!fetchingProfile ? <div role='tabpanel' className='tab-pane active' id='traffic'>
            <div className='row m-t-md'>
              <div className='col-sm-4 m-b-md'>
                <div className='w-lg m-x-auto'>
                </div>
              </div>
              <div className='col-sm-4 m-b-sm'>
                <div className='w-lg m-x-auto'>
                {!fetchingProfile
                  ? <div style={{position: 'relative', height: '0', paddingBottom: '100%', overflow: 'hidden', borderRadius: '50%'}}><img src={image ? 'data:image/png;base64, ' + image : 'http://localhost:3000/usep-logo.png'} alt='' style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', textAlign: 'left !important'}} /></div>
                  : null}
                </div>
                {!fetchingProfile ? <div className='text-center'>
                  <strong className='text-muted'>{profile ? profile.get('StudentNo') : 'Empty'}</strong>
                  <h3>{profile ? upperCase(profile.get('LastName')) + ', ' + profile.get('FirstName') + ' ' + (profile.get('MiddleName') ? profile.get('MiddleName') : '') + (profile.get('ExtName') ? ', ' + profile.get('ExtName') : '') : ''}</h3>
                </div> : null}
              </div>
              <div className='col-sm-4 m-b-md'>
                <div className='w-lg m-x-auto'>
                </div>
              </div>
            </div>
          </div> : null}
        </div>

       {!fetchingProfile ? <div className='hr-divider m-t m-b-lg'>
          <h3 className='hr-divider-content hr-divider-heading'>Personal Information</h3>
        </div> : null}

        {!fetchingProfile ? <hr className='m-t-0 m-b-md' /> : null}

      </div>
    )
  }
}

Profile.propTypes = {

}

export default Profile
