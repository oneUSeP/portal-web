import {
  connect
} from 'react-redux'

import Admission from '../components/Admission'
import {
  getAdmissions,
  createAdmission,
  updateAdmission,
  deleteAdmission,
  searchAdmissions,
  getTestingSchedsCount
} from 'store/modules/admission'
import {
  getAyTerms,
  createAyTerm,
  updateAyTerm,
  deleteAyTerm
} from 'store/modules/ayterm'
import {
  getTestingScheds,
  createTestingSched,
  updateTestingSched,
  deleteTestingSched
} from 'store/modules/testingsched'
import {
  getCampuses,
  createCampus,
  updateCampus,
  deleteCampus
} from 'store/modules/campus'
import {
  getCivilStatuses,
  createCivilStatus,
  updateCivilStatus,
  deleteCivilStatus
} from 'store/modules/civilstatus'
import {
  getIncomeBrackets,
  createIncomeBracket,
  updateIncomeBracket,
  deleteIncomeBracket
} from 'store/modules/incomebracket'
import {
  getTracks,
  createTrack,
  updateTrack,
  deleteTrack
} from 'store/modules/track'
import {
  getStrands,
  createStrand,
  updateStrand,
  deleteStrand
} from 'store/modules/strand'
import {
  getTestingCenters,
  createTestingCenter,
  updateTestingCenter,
  deleteTestingCenter
} from 'store/modules/testingcenter'
import {
  getInterviews,
  createInterview,
  updateInterview,
  deleteInterview
} from 'store/modules/interview'
const mapActionCreators = {
  getAdmissions,
  createAdmission,
  updateAdmission,
  deleteAdmission,
  getAyTerms,
  getCampuses,
  getCivilStatuses,
  getIncomeBrackets,
  getTracks,
  getStrands,
  getTestingCenters,
  searchAdmissions,
  getInterviews,
  getTestingScheds,
  getTestingSchedsCount
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  admissions: state.admission.get('admissions'),
  creatingAdmissionSuccess: state.admission.get('creatingAdmissionSuccess'),
  deletingAdmissionSuccess: state.admission.get('deletingAdmissionSuccess'),
  fetchingAdmissionsSuccess: state.admission.get('fetchingAdmissionsSuccess'),
  ayterms: state.ayterm.get('ayterms'),
  campuses: state.campus.get('campuses'),
  civilstatuses: state.civilstatus.get('civilstatuses'),
  incomebrackets: state.incomebracket.get('incomebrackets'),
  strands: state.strand.get('strands'),
  tracks: state.track.get('tracks'),
  testingcenters: state.testingcenter.get('testingcenters'),
  interviews: state.interview.get('interviews'),
  scheds: state.testingsched.get('scheds'),
  fetchingTestingSchedsSuccess: state.testingsched.get('fetchingTestingSchedsSuccess'),
  schedsCount: state.admission.get('schedsCount'),
  fetchingTestingSchedsCountSuccess: state.admission.get('fetchingTestingSchedsCountSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Admission)
