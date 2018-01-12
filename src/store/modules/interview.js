import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_INTERVIEW = 'api/CREATE_INTERVIEW'
export const CREATE_INTERVIEW_SUCCESS = 'api/CREATE_INTERVIEW_SUCCESS'
export const CREATE_INTERVIEW_FAIL = 'api/CREATE_INTERVIEW_FAIL'
export const GET_INTERVIEWS = 'api/GET_INTERVIEWS'
export const GET_INTERVIEWS_SUCCESS = 'api/GET_INTERVIEWS_SUCCESS'
export const GET_INTERVIEWS_FAIL = 'api/GET_INTERVIEWS_FAIL'
export const DELETE_INTERVIEW = 'api/DELETE_INTERVIEW'
export const DELETE_INTERVIEW_SUCCESS = 'api/DELETE_INTERVIEW_SUCCESS'
export const DELETE_INTERVIEW_FAIL = 'api/DELETE_INTERVIEW_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getInterviews (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/interviews?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_INTERVIEWS, GET_INTERVIEWS_SUCCESS, GET_INTERVIEWS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function createInterview (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/interview',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_INTERVIEW,
          CREATE_INTERVIEW_SUCCESS,
          CREATE_INTERVIEW_FAIL]
      }
    })
  }
}

export function updateInterview (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/interview',
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_INTERVIEW,
          CREATE_INTERVIEW_SUCCESS,
          CREATE_INTERVIEW_FAIL]
      }
    })
  }
}

export function deleteInterview (id) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/interview/${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        types: [
          DELETE_INTERVIEW,
          DELETE_INTERVIEW_SUCCESS,
          DELETE_INTERVIEW_FAIL]
      }
    })
  }
}

export const actions = {
  getInterviews,
  createInterview,
  deleteInterview,
  updateInterview
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_INTERVIEW ] = state => {
  return state.merge({
    creatingInterview: true,
    creatingInterviewSuccess: false,
    createInterviewError: null,
    deletingInterviewSuccess: false
  })
}

actionHandlers[ CREATE_INTERVIEW_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingInterview: false,
    creatingInterviewSuccess: true,
    createInterviewError: null,
    interview: action.payload.data.interview
  })
}

actionHandlers[ CREATE_INTERVIEW_FAIL ] = (state, action) => {
  return state.merge({
    creatingInterview: false,
    creatingInterviewSuccess: false,
    createInterviewError: action.payload.response.error
  })
}

actionHandlers[ GET_INTERVIEWS ] = state => {
  return state.merge({
    fetchingInterviews: true,
    fetchingInterviewsSuccess: false,
    getInterviewsError: null,
    creatingInterviewSuccess: false,
    deletingInterviewSuccess: false
  })
}

actionHandlers[ GET_INTERVIEWS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingInterviews: false,
    fetchingInterviewsSuccess: true,
    getInterviewsError: null,
    interviews: action.payload.data.interviews
  })
}

actionHandlers[ GET_INTERVIEWS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingInterviews: false,
    fetchingInterviewsSuccess: false,
    getInterviewsError: action.payload.response.error
  })
}

actionHandlers[ DELETE_INTERVIEW ] = state => {
  return state.merge({
    deletingInterview: true,
    deletingInterviewSuccess: false,
    deleteInterviewError: null
  })
}

actionHandlers[ DELETE_INTERVIEW_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingInterview: false,
    deletingInterviewSuccess: true,
    deleteInterviewError: null
  })
}

actionHandlers[ DELETE_INTERVIEW_FAIL ] = (state, action) => {
  return state.merge({
    deletingInterview: false,
    deletingInterviewSuccess: false,
    deleteInterviewError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  interview: null,
  createInterviewError: false,
  creatingInterviewSuccess: false,
  interviews: null,
  getInterviewsError: false,
  fetchingInterviewsSuccess: false,
  deleteInterviewError: false,
  deletingInterviewSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

