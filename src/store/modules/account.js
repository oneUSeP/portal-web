import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const GET_ACCOUNTS = 'api/GET_ACCOUNTS'
export const GET_ACCOUNTS_SUCCESS = 'api/GET_ACCOUNTS_SUCCESS'
export const GET_ACCOUNTS_FAIL = 'api/GET_ACCOUNTS_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getAccounts (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/accounts?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_ACCOUNTS, GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export const actions = {
  getAccounts
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ GET_ACCOUNTS ] = state => {
  return state.merge({
    fetchingAccounts: true,
    fetchingAccountsSuccess: false,
    fetchAccountsError: null
  })
}

actionHandlers[ GET_ACCOUNTS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingAccounts: false,
    fetchingAccountsSuccess: true,
    fetchAccountsError: null,
    accounts: action.payload.data.accounts
  })
}

actionHandlers[ GET_ACCOUNTS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingAccounts: false,
    fetchingAccountsSuccess: false,
    fetchAccountsError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  accounts: null,
  fetchingAccounts: false,
  fetchAccountsError: false,
  fetchingAccountsSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

