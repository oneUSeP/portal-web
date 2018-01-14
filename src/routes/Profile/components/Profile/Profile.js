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
      <div className='container'>
      <div className='dashhead'>
        <div className='dashhead-titles'>
          <h6 className='dashhead-subtitle'>USEP-KMSD | USEP-Portal</h6>
          <h3 className='dashhead-title'>Profile</h3>
        </div>
      </div>

      <hr className='m-t-0 m-b-lg' />

      <div className='tab-content'>
        <div role='tabpanel' className='tab-pane active' id='traffic'>
          <div className='row text-center m-t-md'>
            <div className='col-sm-4 m-b-md'>
              <div className='w-lg m-x-auto'>
              </div>
            </div>
            <div className='col-sm-4 m-b-md'>
              <div className='w-lg m-x-auto'>
                <canvas
                  className='ex-graph'
                  width='200' height='200'
                  data-chart='doughnut'
                  data-value="[{ value: 330, color: '#42a5f5', label: 'Recurring' }, { value: 30, color: '#1bc98e', label: 'New' }]"
                  data-segment-stroke-color='#222'>
                </canvas>
              </div>
              <strong className='text-muted'>2012-98365</strong>
              <h3>Glevinzon D. Dapal</h3>
            </div>
            <div className='col-sm-4 m-b-md'>
              <div className='w-lg m-x-auto'>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='hr-divider m-t m-b'>
        <h3 className='hr-divider-content hr-divider-heading'>Personal Information</h3>
      </div>

      <div className='row statcards m-t-md m-b text-xs-center text-md-left'>
        <div className='col-xs-6 col-sm-3 statcard m-b'>
          <h3 className='statcard-number text-success'>
            12,938
            <small className='delta-indicator delta-positive'>5%</small>
          </h3>
          <span className='statcard-desc'>Page views</span>
        </div>
        <div className='col-xs-6 col-sm-3 statcard m-b'>
          <h3 className='statcard-number text-danger'>
            758
            <small className='delta-indicator delta-negative'>1.3%</small>
          </h3>
          <span className='statcard-desc'>Downloads</span>
        </div>
        <div className='col-xs-6 col-sm-3 statcard m-b'>
          <h3 className='statcard-number text-success'>
            1,293
            <small className='delta-indicator delta-positive'>6.75%</small>
          </h3>
          <span className='statcard-desc'>Sign-ups</span>
        </div>
        <div className='col-xs-6 col-sm-3 statcard m-b'>
          <h3 className='statcard-number text-danger'>
            758
            <small className='delta-indicator delta-negative'>1.3%</small>
          </h3>
          <span className='statcard-desc'>Downloads</span>
        </div>
      </div>

      <hr className='m-t-0 m-b-md' />

      <div className='row'>
        <div className='col-md-4 m-b-md'>
          <div className='list-group'>
            <h4 className='list-group-header'>
              Countries
            </h4>

              <a className='list-group-item' href='#'>
                <span className='list-group-progress' style={{width: '62.4%'}} ></span>
                <span className='pull-right text-muted'>62.4%</span>
                United States
              </a>

              <a className='list-group-item' href='#'>
                <span className='list-group-progress' style={{width: '15.0%'}}></span>
                <span className='pull-right text-muted'>15.0%</span>
                India
              </a>

          </div>
          <a href='#' className='btn btn-primary-outline'>All countries</a>
        </div>
        <div className='col-md-4 m-b-md'>
          <div className='list-group'>
            <h4 className='list-group-header'>
              Most visited pages
            </h4>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>3,929,481</span>
                / (Logged out)
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>1,143,393</span>
                / (Logged in)
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>938,287</span>
                /tour
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>749,393</span>
                /features/something
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>695,912</span>
                /features/another-thing
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>501,938</span>
                /users/username
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>392,842</span>
                /page-title
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>298,183</span>
                /some/page-slug
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>193,129</span>
                /another/directory/and/page-title
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>93,382</span>
                /one-more/page/directory/file-name
              </a>

          </div>
          <a href='#' className='btn btn-primary-outline'>View all pages</a>
        </div>
        <div className='col-md-4 m-b-md'>
          <div className='list-group'>
            <h4 className='list-group-header'>
              Devices and resolutions
            </h4>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>3,929,481</span>
                Desktop (1920x1080)
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>1,143,393</span>
                Desktop (1366x768)
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>938,287</span>
                Desktop (1440x900)
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>749,393</span>
                Desktop (1280x800)
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>695,912</span>
                Tablet (1024x768)
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>501,938</span>
                Tablet (768x1024)
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>392,842</span>
                Phone (320x480)
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>298,183</span>
                Phone (720x450)
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>193,129</span>
                Desktop (2560x1080)
              </a>

              <a className='list-group-item' href='#'>
                <span className='pull-right text-muted'>93,382</span>
                Desktop (2560x1600)
              </a>

          </div>
          <a href='#' className='btn btn-primary-outline'>View all devices</a>
        </div>
      </div>

      </div>
    )
  }
}

Profile.propTypes = {

}

export default Profile
