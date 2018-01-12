import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_CIVILSTATUS = 'api/CREATE_CIVILSTATUS'
export const CREATE_CIVILSTATUS_SUCCESS = 'api/CREATE_CIVILSTATUS_SUCCESS'
export const CREATE_CIVILSTATUS_FAIL = 'api/CREATE_CIVILSTATUS_FAIL'
export const GET_CIVILSTATUSES = 'api/GET_CIVILSTATUSES'
export const GET_CIVILSTATUSES_SUCCESS = 'api/GET_CIVILSTATUSES_SUCCESS'
export const GET_CIVILSTATUSES_FAIL = 'api/GET_CIVILSTATUSES_FAIL'
export const DELETE_CIVILSTATUS = 'api/DELETE_CIVILSTATUS'
export const DELETE_CIVILSTATUS_SUCCESS = 'api/DELETE_CIVILSTATUS_SUCCESS'
export const DELETE_CIVILSTATUS_FAIL = 'api/DELETE_CIVILSTATUS_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getCivilStatuses (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/civilstatuses?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_CIVILSTATUSES, GET_CIVILSTATUSES_SUCCESS, GET_CIVILSTATUSES_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function createCivilStatus (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/civilstatus',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_CIVILSTATUS,
          CREATE_CIVILSTATUS_SUCCESS,
          CREATE_CIVILSTATUS_FAIL]
      }
    })
  }
}

export function updateCivilStatus (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/civilstatus',
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_CIVILSTATUS,
          CREATE_CIVILSTATUS_SUCCESS,
          CREATE_CIVILSTATUS_FAIL]
      }
    })
  }
}

export function deleteCivilStatus (id) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/civilstatus/${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        types: [
          DELETE_CIVILSTATUS,
          DELETE_CIVILSTATUS_SUCCESS,
          DELETE_CIVILSTATUS_FAIL]
      }
    })
  }
}

export const actions = {
  getCivilStatuses,
  createCivilStatus,
  deleteCivilStatus,
  updateCivilStatus
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_CIVILSTATUS ] = state => {
  return state.merge({
    creatingCivilStatus: true,
    creatingCivilStatusSuccess: false,
    createCivilStatusError: null,
    deletingCivilStatusSuccess: false
  })
}

actionHandlers[ CREATE_CIVILSTATUS_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingCivilStatus: false,
    creatingCivilStatusSuccess: true,
    createCivilStatusError: null,
    civilstatus: action.payload.data.civilstatus
  })
}

actionHandlers[ CREATE_CIVILSTATUS_FAIL ] = (state, action) => {
  return state.merge({
    creatingCivilStatus: false,
    creatingCivilStatusSuccess: false,
    createCivilStatusError: action.payload.response.error
  })
}

actionHandlers[ GET_CIVILSTATUSES ] = state => {
  return state.merge({
    fetchingCivilStatuses: true,
    fetchingCivilStatusesSuccess: false,
    getCivilStatusesError: null,
    creatingCivilStatusSuccess: false,
    deletingCivilStatusSuccess: false
  })
}

actionHandlers[ GET_CIVILSTATUSES_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingCivilStatuses: false,
    fetchingCivilStatusesSuccess: true,
    getCivilStatusesError: null,
    civilstatuses: action.payload.data.civilstatuses
  })
}

actionHandlers[ GET_CIVILSTATUSES_FAIL ] = (state, action) => {
  return state.merge({
    fetchingCivilStatuses: false,
    fetchingCivilStatusesSuccess: false,
    getCivilStatusesError: action.payload.response.error
  })
}

actionHandlers[ DELETE_CIVILSTATUS ] = state => {
  return state.merge({
    deletingCivilStatus: true,
    deletingCivilStatusSuccess: false,
    deleteCivilStatusError: null
  })
}

actionHandlers[ DELETE_CIVILSTATUS_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingCivilStatus: false,
    deletingCivilStatusSuccess: true,
    deleteCivilStatusError: null
  })
}

actionHandlers[ DELETE_CIVILSTATUS_FAIL ] = (state, action) => {
  return state.merge({
    deletingCivilStatus: false,
    deletingCivilStatusSuccess: false,
    deleteCivilStatusError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  civilstatus: null,
  createCivilStatusError: false,
  creatingCivilStatusSuccess: false,
  civilstatuses: null,
  getCivilStatusesError: false,
  fetchingCivilStatusSuccess: false,
  deleteCivilStatusError: false,
  deletingCivilStatusSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

