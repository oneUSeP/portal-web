import HomeContainer from './containers/HomeContainer'
import { UserIsAuthenticated, UserIsAdmin } from 'utils/authWrappers'

// Sync route definition
export default {
  component: UserIsAuthenticated(HomeContainer)
}
