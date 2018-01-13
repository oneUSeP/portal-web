import ProfileContainer from './containers/ProfileContainer'
import { UserIsAuthenticated, UserIsAdmin, UserIsEmployee, UserIsStudent } from 'utils/authWrappers'

export default (store) => ({
  path: 'me',
  component: UserIsAuthenticated(UserIsStudent(ProfileContainer))
})
