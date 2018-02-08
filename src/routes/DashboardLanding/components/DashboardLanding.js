import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Card} from 'antd'

class DashboardLanding extends Component {

  handleLogout = (e) => {
    this.props.logout()
  }

  render () {
    return (
      <div>
        <Card loading={!this.props.fetchingProfileExtraSuccess} title={this.props.extraDetails && this.props.extraDetails.get('StudentName')} style={{ width: '34%' }}>
          <p>{this.props.extraDetails.get('CollegeName')}</p>
          <p>{this.props.extraDetails.get('Program')}</p>
          <p>{this.props.extraDetails.get('Curriculum')}</p>
          <p>{this.props.extraDetails.get('YearLevel')}</p>
          <p>{this.props.extraDetails.get('SectionName')}</p>
        </Card>
      </div>
    )
  }
}

DashboardLanding.propTypes = {

}

export default DashboardLanding
