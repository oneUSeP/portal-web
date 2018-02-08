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
  ayterms: state.grade.get('ayterms'),
  extraDetails: state.student.get('extraDetails'),
  fetchingGrades: state.grade.get('fetchingGrades'),
  fetchingGradesSuccess: state.grade.get('fetchingGradesSuccess'),
  fetchingAyTermsSuccess: state.grade.get('fetchingAyTermsSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Grade)

