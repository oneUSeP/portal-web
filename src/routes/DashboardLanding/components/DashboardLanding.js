import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Card} from 'antd'

class DashboardLanding extends Component {

  handleLogout = (e) => {
    this.props.logout()
  }

  render () {
    let {extraDetails} = this.props
    return (
      <div>
        <Card loading={!this.props.fetchingProfileExtraSuccess} title={extraDetails && extraDetails.get('StudentName')} style={{ width: '34%' }}>
          <p>{extraDetails && extraDetails.get('CollegeName')}</p>
          <p>{extraDetails && extraDetails.get('Program')}</p>
          <p>{extraDetails && extraDetails.get('Curriculum')}</p>
          <p>{extraDetails && extraDetails.get('YearLevel')}</p>
          <p>{extraDetails && extraDetails.get('SectionName')}</p>
        </Card>
      </div>
    )
  }
}

DashboardLanding.propTypes = {

}

export default DashboardLanding
