import GradesContainer from './containers/GradesContainer'
import { UserIsAuthenticated, UserIsAdmin, UserIsEmployee, UserIsStudent } from 'utils/authWrappers'

export default (store) => ({
  path: 'grades/:termId/:termTitle',
  component: UserIsAuthenticated(UserIsStudent(GradesContainer))
})
