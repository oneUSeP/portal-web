import { connect } from 'react-redux'

import DashboardLayout from '../components/DashboardLayout'

import { logout } from 'store/modules/auth'

import {
  getProfile
} from 'store/modules/student'

const mapActionCreators = {
  logout,
  getProfile
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user'),
  auth: state.auth,
  profile: state.student.get('profile'),
})

export default connect(mapStateToProps, mapActionCreators)(DashboardLayout)

