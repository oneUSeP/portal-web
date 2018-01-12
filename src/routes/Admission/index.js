import AdmissionContainer from './containers/AdmissionContainer'
import { UserIsAuthenticated, UserIsAdmin } from 'utils/authWrappers'

export default (store) => ({
  path: 'admissions',
  component: UserIsAuthenticated(UserIsAdmin(AdmissionContainer))
})
