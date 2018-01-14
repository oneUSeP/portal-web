import { connect } from 'react-redux'

import Profile from '../components/Profile'

import {
  getProfiles,
  updateProfile,
  getProfile,
  searchProfiles
} from 'store/modules/student'

const mapActionCreators = {
  getProfiles,
  updateProfile,
  getProfile,
  searchProfiles
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.student.get('profile'),
  profiles: state.student.get('profiles'),
  createProfileError: state.student.get('createProfileError'),
  creatingProfileSuccess: state.student.get('creatingProfileSuccess'),
  fetchingProfiles: state.student.get('fetchingProfiles'),
  fetchProfilesError: state.student.get('fetchProfilesError'),
  fetchingProfilesSuccess: state.student.get('fetchingProfilesSuccess'),
  fetchingProfile: state.student.get('fetchingProfile'),
  fetchProfileError: state.student.get('fetchProfileError'),
  fetchingProfileSuccess: state.student.get('fetchingProfileSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Profile)

