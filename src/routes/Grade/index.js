import GradesContainer from './containers/GradesContainer'
import { UserIsAuthenticated, UserIsAdmin, UserIsEmployee, UserIsStudent } from 'utils/authWrappers'

export default (store) => ({
  path: 'grades/:termId',
  component: UserIsAuthenticated(UserIsStudent(GradesContainer))
})
