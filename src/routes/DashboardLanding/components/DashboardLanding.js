import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DashboardLanding extends Component {

  handleLogout = (e) => {
    this.props.logout()
  }

  render () {
    return (
      <div></div>
    )
  }
}

DashboardLanding.propTypes = {

}

export default DashboardLanding
