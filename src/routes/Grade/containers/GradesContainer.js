import { connect } from 'react-redux'

import Grade from '../components/Grade'

import {
  getGrades,
} from 'store/modules/grade'

const mapActionCreators = {
  getGrades,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  grades: state.grade.get('grades'),
  fetchingGrades: state.grade.get('fetchingGrades'),
  fetchingGradesSuccess: state.grade.get('fetchingGradesSuccess'),
})

export default connect(mapStateToProps, mapActionCreators)(Grade)

