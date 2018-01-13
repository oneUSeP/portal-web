
import { UserIsAuthenticated, UserIsAdmin } from 'utils/authWrappers'
import DashboardLayoutContainer from '../../layouts/DashboardLayout/containers/DashboardLayoutContainer'
import DashboardLanding from '../DashboardLanding'
import AccountRoute from '../Account'
import ProfileRoute from '../Profile'

export const createRoutes = (store) => ({
  path: '/dashboard',
  onEnter: async (nextState, replace, cb) => {
    const auth = JSON.parse(localStorage.getItem('reduxPersist:auth'))
    if (auth && auth.accessToken) {
      const authActions = require('store/modules/auth').actions
      await store.dispatch(authActions.load(auth.accessToken))
    }
    cb()
  },
  component: UserIsAuthenticated(DashboardLayoutContainer),
  indexRoute: DashboardLanding,
  childRoutes: [
    AccountRoute(store),
    ProfileRoute(store)
  ]
})

export default createRoutes
