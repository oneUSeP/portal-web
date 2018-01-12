import TableContainer from './containers/TableContainer'
import { UserIsAuthenticated, UserIsAdmin } from 'utils/authWrappers'

export default (store) => ({
  path: 'tables',
  component: UserIsAuthenticated(UserIsAdmin(TableContainer))
})
