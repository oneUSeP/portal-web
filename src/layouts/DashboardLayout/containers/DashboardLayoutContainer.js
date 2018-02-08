import { connect } from 'react-redux'

import DashboardLayout from '../components/DashboardLayout'

import { logout } from 'store/modules/auth'

import {
  getProfile,
  getProfileExtraDetails
} from 'store/modules/student'
import {
  getAyTerms
} from 'store/modules/grade'

const mapActionCreators = {
  logout,
  getProfile,
  getAyTerms,
  getProfileExtraDetails
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user'),
  auth: state.auth,
  profile: state.student.get('profile'),
  ayterms: state.grade.get('ayterms'),
  fetchingAyTerms: state.grade.get('fetchingAyTerms'),
  fetchingAyTermsSuccess: state.grade.get('fetchingAyTermsSuccess'),
  fetchingProfileSuccess: state.student.get('fetchingProfileSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(DashboardLayout)

