import { connect } from 'react-redux'

import DashboardLayout from '../components/DashboardLayout'

import { logout } from 'store/modules/auth'

const mapActionCreators = {
  logout
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user'),
  auth: state.auth
})

export default connect(mapStateToProps, mapActionCreators)(DashboardLayout)

