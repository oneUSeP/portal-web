import { UserAuthWrapper } from 'redux-auth-wrapper'

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: auth => {
    return auth && auth.get('user')
  }
})

export const UserIsAdmin = UserAuthWrapper({
  authSelector: state => state.auth,
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: auth => {
    if (!auth) {
      return false
    }

    const user = auth.get('user')

    if (!user) {
      return false
    }

    return user.get('role') === 'admin'
  },
  failureRedirectPath: '/dashboard',
  allowRedirectBack: false
})

// export const UserIsNotAdmin = UserAuthWrapper({
//   authSelector: state => state.auth,
//   wrapperDisplayName: 'UserIsAuthenticated',
//   predicate: auth => {
//     if (!auth) {
//       return false
//     }

//     const user = auth.get('user')

//     if (!user) {
//       return false
//     }

//     return user.get('role') !== 'admin'
//   },
//   failureRedirectPath: '/dashboard',
//   allowRedirectBack: false
// })

export const UserIsStudent = UserAuthWrapper({
  authSelector: state => state.auth,
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: auth => {
    if (!auth) {
      return false
    }

    const user = auth.get('user')

    if (!user) {
      return false
    }

    return user.get('role') === 'student'
  },
  failureRedirectPath: '/dashboard',
  allowRedirectBack: false
})

// export const UserIsNotStudent = UserAuthWrapper({
//   authSelector: state => state.auth,
//   wrapperDisplayName: 'UserIsAuthenticated',
//   predicate: auth => {
//     if (!auth) {
//       return false
//     }

//     const user = auth.get('user')

//     if (!user) {
//       return false
//     }

//     return user.get('role') !== 'student'
//   },
//   failureRedirectPath: '/dashboard',
//   allowRedirectBack: false
// })

export const UserIsEmployee = UserAuthWrapper({
  authSelector: state => state.auth,
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: auth => {
    if (!auth) {
      return false
    }

    const user = auth.get('user')

    if (!user) {
      return false
    }

    return user.get('role') === 'employee'
  },
  failureRedirectPath: '/dashboard',
  allowRedirectBack: false
})

// export const UserIsNotEmployee = UserAuthWrapper({
//   authSelector: state => state.auth,
//   wrapperDisplayName: 'UserIsAuthenticated',
//   predicate: auth => {
//     if (!auth) {
//       return false
//     }

//     const user = auth.get('user')

//     if (!user) {
//       return false
//     }

//     return user.get('role') !== 'employee'
//   },
//   failureRedirectPath: '/dashboard',
//   allowRedirectBack: false
// })

