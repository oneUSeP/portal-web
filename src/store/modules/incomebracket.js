import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_INCOMEBRACKET = 'api/CREATE_INCOMEBRACKET'
export const CREATE_INCOMEBRACKET_SUCCESS = 'api/CREATE_INCOMEBRACKET_SUCCESS'
export const CREATE_INCOMEBRACKET_FAIL = 'api/CREATE_INCOMEBRACKET_FAIL'
export const GET_INCOMEBRACKETS = 'api/GET_INCOMEBRACKETS'
export const GET_INCOMEBRACKETS_SUCCESS = 'api/GET_INCOMEBRACKETS_SUCCESS'
export const GET_INCOMEBRACKETS_FAIL = 'api/GET_INCOMEBRACKETS_FAIL'
export const DELETE_INCOMEBRACKET = 'api/DELETE_INCOMEBRACKET'
export const DELETE_INCOMEBRACKET_SUCCESS = 'api/DELETE_INCOMEBRACKET_SUCCESS'
export const DELETE_INCOMEBRACKET_FAIL = 'api/DELETE_INCOMEBRACKET_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getIncomeBrackets (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/incomebrackets?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_INCOMEBRACKETS, GET_INCOMEBRACKETS_SUCCESS, GET_INCOMEBRACKETS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function createIncomeBracket (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/incomebracket',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_INCOMEBRACKET,
          CREATE_INCOMEBRACKET_SUCCESS,
          CREATE_INCOMEBRACKET_FAIL]
      }
    })
  }
}

export function updateIncomeBracket (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/incomebracket',
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_INCOMEBRACKET,
          CREATE_INCOMEBRACKET_SUCCESS,
          CREATE_INCOMEBRACKET_FAIL]
      }
    })
  }
}

export function deleteIncomeBracket (id) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/incomebracket/${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        types: [
          DELETE_INCOMEBRACKET,
          DELETE_INCOMEBRACKET_SUCCESS,
          DELETE_INCOMEBRACKET_FAIL]
      }
    })
  }
}

export const actions = {
  getIncomeBrackets,
  createIncomeBracket,
  deleteIncomeBracket,
  updateIncomeBracket
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_INCOMEBRACKET ] = state => {
  return state.merge({
    creatingIncomeBracket: true,
    creatingIncomeBracketSuccess: false,
    createIncomeBracketError: null,
    deletingIncomeBracketSuccess: false
  })
}

actionHandlers[ CREATE_INCOMEBRACKET_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingIncomeBracket: false,
    creatingIncomeBracketSuccess: true,
    createIncomeBracketError: null,
    incomebracket: action.payload.data.incomebracket
  })
}

actionHandlers[ CREATE_INCOMEBRACKET_FAIL ] = (state, action) => {
  return state.merge({
    creatingIncomeBracket: false,
    creatingIncomeBracketSuccess: false,
    createIncomeBracketError: action.payload.response.error
  })
}

actionHandlers[ GET_INCOMEBRACKETS ] = state => {
  return state.merge({
    fetchingIncomeBrackets: true,
    fetchingIncomeBracketsSuccess: false,
    getIncomeBracketsError: null,
    creatingIncomeBracketSuccess: false,
    deletingIncomeBracketSuccess: false
  })
}

actionHandlers[ GET_INCOMEBRACKETS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingIncomeBrackets: false,
    fetchingIncomeBracketsSuccess: true,
    getIncomeBracketsError: null,
    incomebrackets: action.payload.data.incomebrackets
  })
}

actionHandlers[ GET_INCOMEBRACKETS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingIncomeBrackets: false,
    fetchingIncomeBracketsSuccess: false,
    getIncomeBracketsError: action.payload.response.error
  })
}

actionHandlers[ DELETE_INCOMEBRACKET ] = state => {
  return state.merge({
    deletingIncomeBracket: true,
    deletingIncomeBracketSuccess: false,
    deleteIncomeBracketError: null
  })
}

actionHandlers[ DELETE_INCOMEBRACKET_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingIncomeBracket: false,
    deletingIncomeBracketSuccess: true,
    deleteIncomeBracketError: null
  })
}

actionHandlers[ DELETE_INCOMEBRACKET_FAIL ] = (state, action) => {
  return state.merge({
    deletingIncomeBracket: false,
    deletingIncomeBracketSuccess: false,
    deleteIncomeBracketError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  incomebracket: null,
  createIncomeBracketError: false,
  creatingIncomeBracketSuccess: false,
  incomebrackets: null,
  getIncomeBracketsError: false,
  fetchingIncomeBracketSuccess: false,
  deleteIncomeBracketError: false,
  deletingIncomeBracketSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

