import { connect } from 'react-redux'

import DashboardLanding from '../components/DashboardLanding'

import { logout } from 'store/modules/auth'

const mapActionCreators = {
  logout
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user'),
  extraDetails: state.student.get('extraDetails'),
  fetchingProfileExtraSuccess: state.student.get('fetchingProfileExtraSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(DashboardLanding)
