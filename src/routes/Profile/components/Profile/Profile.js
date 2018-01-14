import React, { Component } from 'react'
import ProfileForm from './ProfileForm'

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
      <div className='container-fluid container-fluid-spacious' style={{marginTop: '0%'}} >
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>USEP-KMSD | USEP Portal</h6>
              <h3 className='dashhead-title'>Profile</h3>
            </div>
          </div>
        </div>

        <div className='col-sm-12 content'>
          <div className='hr-divider'>
            <h3 className='hr-divider-content hr-divider-heading'>
              Personal Information
            </h3>
          </div>

          <div className='row'>
            <div className='col-sm-6 col-md-3'>
              <div className='w-lg m-x-auto'>
                <img src={'data:image/png;base64, ' + image || 'http://localhost:3000/usep-logo.png'} alt='' className='img-circle img-responsive' />
              </div>
            </div>
            <div className='col-sm-6 col-md-9'>
              <ul className='list-group text-center'>
                <li className='list-group-item'>Cras justo odio</li>
                <li className='list-group-item'>Dapibus ac facilisis in</li>
                <li className='list-group-item'>Morbi leo risus</li>
                <li className='list-group-item'>Porta ac consectetur ac</li>
                <li className='list-group-item'>Vestibulum at eros</li>
                <li className='list-group-item'>Cras justo odio</li>
                <li className='list-group-item'>Dapibus ac facilisis in</li>
                <li className='list-group-item'>Morbi leo risus</li>
                <li className='list-group-item'>Porta ac consectetur ac</li>
                <li className='list-group-item'>Vestibulum at eros</li>
                <li className='list-group-item'>Cras justo odio</li>
                <li className='list-group-item'>Dapibus ac facilisis in</li>
                <li className='list-group-item'>Morbi leo risus</li>
                <li className='list-group-item'>Porta ac consectetur ac</li>
                <li className='list-group-item'>Vestibulum at eros</li>
                <li className='list-group-item'>Cras justo odio</li>
                <li className='list-group-item'>Dapibus ac facilisis in</li>
                <li className='list-group-item'>Morbi leo risus</li>
                <li className='list-group-item'>Porta ac consectetur ac</li>
                <li className='list-group-item'>Vestibulum at eros</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {

}

export default Profile
