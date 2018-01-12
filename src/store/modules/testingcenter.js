import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_TESTINGCENTER = 'api/CREATE_TESTINGCENTER'
export const CREATE_TESTINGCENTER_SUCCESS = 'api/CREATE_TESTINGCENTER_SUCCESS'
export const CREATE_TESTINGCENTER_FAIL = 'api/CREATE_TESTINGCENTER_FAIL'
export const GET_TESTINGCENTERS = 'api/GET_TESTINGCENTERS'
export const GET_TESTINGCENTERS_SUCCESS = 'api/GET_TESTINGCENTERS_SUCCESS'
export const GET_TESTINGCENTERS_FAIL = 'api/GET_TESTINGCENTERS_FAIL'
export const DELETE_TESTINGCENTER = 'api/DELETE_TESTINGCENTER'
export const DELETE_TESTINGCENTER_SUCCESS = 'api/DELETE_TESTINGCENTER_SUCCESS'
export const DELETE_TESTINGCENTER_FAIL = 'api/DELETE_TESTINGCENTER_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getTestingCenters (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/testingcenters?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_TESTINGCENTERS, GET_TESTINGCENTERS_SUCCESS, GET_TESTINGCENTERS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function createTestingCenter (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/testingcenter',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_TESTINGCENTER,
          CREATE_TESTINGCENTER_SUCCESS,
          CREATE_TESTINGCENTER_FAIL]
      }
    })
  }
}

export function updateTestingCenter (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/testingcenter',
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_TESTINGCENTER,
          CREATE_TESTINGCENTER_SUCCESS,
          CREATE_TESTINGCENTER_FAIL]
      }
    })
  }
}

export function deleteTestingCenter (id) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/testingcenter/${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        types: [
          DELETE_TESTINGCENTER,
          DELETE_TESTINGCENTER_SUCCESS,
          DELETE_TESTINGCENTER_FAIL]
      }
    })
  }
}

export const actions = {
  getTestingCenters,
  createTestingCenter,
  deleteTestingCenter,
  updateTestingCenter
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_TESTINGCENTER ] = state => {
  return state.merge({
    creatingTestingCenter: true,
    creatingTestingCenterSuccess: false,
    createTestingCenterError: null,
    deletingTestingCenterSuccess: false
  })
}

actionHandlers[ CREATE_TESTINGCENTER_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingTestingCenter: false,
    creatingTestingCenterSuccess: true,
    createTestingCenterError: null,
    testingcenter: action.payload.data.testingcenter
  })
}

actionHandlers[ CREATE_TESTINGCENTER_FAIL ] = (state, action) => {
  return state.merge({
    creatingTestingCenter: false,
    creatingTestingCenterSuccess: false,
    createTestingCenterError: action.payload.response.error
  })
}

actionHandlers[ GET_TESTINGCENTERS ] = state => {
  return state.merge({
    fetchingTestingCenters: true,
    fetchingTestingCentersSuccess: false,
    getTestingCentersError: null,
    creatingTestingCenterSuccess: false,
    deletingTestingCenterSuccess: false
  })
}

actionHandlers[ GET_TESTINGCENTERS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingTestingCenters: false,
    fetchingTestingCentersSuccess: true,
    getTestingCentersError: null,
    testingcenters: action.payload.data.testingcenters
  })
}

actionHandlers[ GET_TESTINGCENTERS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingTestingCenters: false,
    fetchingTestingCentersSuccess: false,
    getTestingCentersError: action.payload.response.error
  })
}

actionHandlers[ DELETE_TESTINGCENTER ] = state => {
  return state.merge({
    deletingTestingCenter: true,
    deletingTestingCenterSuccess: false,
    deleteTestingCenterError: null
  })
}

actionHandlers[ DELETE_TESTINGCENTER_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingTestingCenter: false,
    deletingTestingCenterSuccess: true,
    deleteTestingCenterError: null
  })
}

actionHandlers[ DELETE_TESTINGCENTER_FAIL ] = (state, action) => {
  return state.merge({
    deletingTestingCenter: false,
    deletingTestingCenterSuccess: false,
    deleteTestingCenterError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  testingcenter: null,
  createTestingCenterError: false,
  creatingTestingCenterSuccess: false,
  testingcenters: null,
  getTestingCentersError: false,
  fetchingTestingCenterSuccess: false,
  deleteTestingCenterError: false,
  deletingTestingCenterSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

