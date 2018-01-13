import DashboardLandingContainer from './containers/DashboardLandingContainer'
import { UserIsAuthenticated, UserIsAdmin } from 'utils/authWrappers'

// Sync route definition
export default {
  component: UserIsAuthenticated(DashboardLandingContainer)
}
