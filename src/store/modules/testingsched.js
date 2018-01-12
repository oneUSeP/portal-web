import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_TESTINGSCHED = 'api/CREATE_TESTINGSCHED'
export const CREATE_TESTINGSCHED_SUCCESS = 'api/CREATE_TESTINGSCHED_SUCCESS'
export const CREATE_TESTINGSCHED_FAIL = 'api/CREATE_TESTINGSCHED_FAIL'
export const GET_TESTINGSCHEDS = 'api/GET_TESTINGSCHEDS'
export const GET_TESTINGSCHEDS_SUCCESS = 'api/GET_TESTINGSCHEDS_SUCCESS'
export const GET_TESTINGSCHEDS_FAIL = 'api/GET_TESTINGSCHEDS_FAIL'
export const DELETE_TESTINGSCHED = 'api/DELETE_TESTINGSCHED'
export const DELETE_TESTINGSCHED_SUCCESS = 'api/DELETE_TESTINGSCHED_SUCCESS'
export const DELETE_TESTINGSCHED_FAIL = 'api/DELETE_TESTINGSCHED_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getTestingScheds (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/scheds?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_TESTINGSCHEDS, GET_TESTINGSCHEDS_SUCCESS, GET_TESTINGSCHEDS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function createTestingSched (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/scheds',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_TESTINGSCHED,
          CREATE_TESTINGSCHED_SUCCESS,
          CREATE_TESTINGSCHED_FAIL]
      }
    })
  }
}

export function updateTestingSched (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/testingsched',
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_TESTINGSCHED,
          CREATE_TESTINGSCHED_SUCCESS,
          CREATE_TESTINGSCHED_FAIL]
      }
    })
  }
}

export function deleteTestingSched (id) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/testingsched/${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        types: [
          DELETE_TESTINGSCHED,
          DELETE_TESTINGSCHED_SUCCESS,
          DELETE_TESTINGSCHED_FAIL]
      }
    })
  }
}

export const actions = {
  getTestingScheds,
  createTestingSched,
  deleteTestingSched,
  updateTestingSched
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_TESTINGSCHED ] = state => {
  return state.merge({
    creatingTestingSched: true,
    creatingTestingSchedSuccess: false,
    createTestingSchedError: null,
    deletingTestingSchedSuccess: false
  })
}

actionHandlers[ CREATE_TESTINGSCHED_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingTestingSched: false,
    creatingTestingSchedSuccess: true,
    createTestingSchedError: null,
    testingsched: action.payload.data.testingsched
  })
}

actionHandlers[ CREATE_TESTINGSCHED_FAIL ] = (state, action) => {
  return state.merge({
    creatingTestingSched: false,
    creatingTestingSchedSuccess: false,
    createTestingSchedError: action.payload.response.error
  })
}

actionHandlers[ GET_TESTINGSCHEDS ] = state => {
  return state.merge({
    fetchingTestingScheds: true,
    fetchingTestingSchedsSuccess: false,
    getTestingSchedsError: null,
    creatingTestingSchedSuccess: false,
    deletingTestingSchedSuccess: false
  })
}

actionHandlers[ GET_TESTINGSCHEDS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingTestingScheds: false,
    fetchingTestingSchedsSuccess: true,
    getTestingSchedsError: null,
    scheds: action.payload.data.scheds
  })
}

actionHandlers[ GET_TESTINGSCHEDS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingTestingScheds: false,
    fetchingTestingSchedsSuccess: false,
    getTestingSchedsError: action.payload.response.error
  })
}

actionHandlers[ DELETE_TESTINGSCHED ] = state => {
  return state.merge({
    deletingTestingSched: true,
    deletingTestingSchedSuccess: false,
    deleteTestingSchedError: null
  })
}

actionHandlers[ DELETE_TESTINGSCHED_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingTestingSched: false,
    deletingTestingSchedSuccess: true,
    deleteTestingSchedError: null
  })
}

actionHandlers[ DELETE_TESTINGSCHED_FAIL ] = (state, action) => {
  return state.merge({
    deletingTestingSched: false,
    deletingTestingSchedSuccess: false,
    deleteTestingSchedError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  testingsched: null,
  createTestingSchedError: false,
  creatingTestingSchedSuccess: false,
  scheds: null,
  getTestingSchedsError: false,
  fetchingTestingSchedSuccess: false,
  deleteTestingSchedError: false,
  deletingTestingSchedSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

