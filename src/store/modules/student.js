import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_STUDENT = 'api/CREATE_STUDENT'
export const CREATE_STUDENT_SUCCESS = 'api/CREATE_STUDENT_SUCCESS'
export const CREATE_STUDENT_FAIL = 'api/CREATE_STUDENT_FAIL'
export const GET_STUDENTS = 'api/GET_STUDENTS'
export const GET_STUDENTS_SUCCESS = 'api/GET_STUDENTS_SUCCESS'
export const GET_STUDENTS_FAIL = 'api/GET_STUDENTS_FAIL'
export const GET_STUDENT = 'api/GET_STUDENT'
export const GET_STUDENT_SUCCESS = 'api/GET_STUDENT_SUCCESS'
export const GET_STUDENT_FAIL = 'api/GET_STUDENT_FAIL'
export const DELETE_STUDENT = 'api/DELETE_STUDENT'
export const DELETE_STUDENT_SUCCESS = 'api/DELETE_STUDENT_SUCCESS'
export const DELETE_STUDENT_FAIL = 'api/DELETE_STUDENT_FAIL'
export const GET_STUDENT_EXTRA_DETAILS = 'api/GET_STUDENT_EXTRA_DETAILS'
export const GET_STUDENT_EXTRA_DETAILS_SUCCESS = 'api/GET_STUDENT_EXTRA_DETAILS_SUCCESS'
export const GET_STUDENT_EXTRA_DETAILS_FAIL = 'api/GET_STUDENT_EXTRA_DETAILS_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getProfiles (page = 1, count = 10, filter) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/profiles?page=${page}&count=${count}&filter=${filter}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_STUDENTS, GET_STUDENTS_SUCCESS, GET_STUDENTS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function getProfile (id) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/profile/${id}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_STUDENT, GET_STUDENT_SUCCESS, GET_STUDENT_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function searchProfiles (keyword, filter) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/profiles/search?keyword=${keyword}&filter=${filter}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_STUDENT, GET_STUDENT_SUCCESS, GET_STUDENT_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function updateProfile (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/profile',
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_STUDENT,
          CREATE_STUDENT_SUCCESS,
          CREATE_STUDENT_FAIL]
      }
    })
  }
}

export function getProfileExtraDetails (id=0, termId=0) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/profile/extra/${id}/${termId}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_STUDENT_EXTRA_DETAILS, GET_STUDENT_EXTRA_DETAILS_SUCCESS, GET_STUDENT_EXTRA_DETAILS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export const actions = {
  getProfiles,
  updateProfile,
  searchProfiles
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_STUDENT ] = state => {
  return state.merge({
    creatingProfile: true,
    creatingProfileSuccess: false,
    createProfileError: null
  })
}

actionHandlers[ CREATE_STUDENT_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingProfile: false,
    creatingProfileSuccess: true,
    createProfileError: null,
    profile: action.payload.data.profile
  })
}

actionHandlers[ CREATE_STUDENT_FAIL ] = (state, action) => {
  return state.merge({
    creatingProfile: false,
    creatingProfileSuccess: false,
    createProfileError: action.payload.response.error
  })
}

actionHandlers[ GET_STUDENTS ] = state => {
  return state.merge({
    fetchingProfiles: true,
    fetchingProfilesSuccess: false,
    fetchProfilesError: null,
    creatingProfileSuccess: false
  })
}

actionHandlers[ GET_STUDENTS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingProfiles: false,
    fetchingProfilesSuccess: true,
    fetchProfilesError: null,
    profiles: action.payload.data.profiles
  })
}

actionHandlers[ GET_STUDENTS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingProfiles: false,
    fetchingProfilesSuccess: false,
    fetchProfilesError: action.payload.response.error
  })
}

actionHandlers[ GET_STUDENT ] = state => {
  return state.merge({
    fetchingProfile: true,
    creatingProfile: false,
    fetchingProfileExtra: false,
    creatingProfileSuccess: false,
    fetchingProfileSuccess: false,
    fetchProfileError: null
  })
}

actionHandlers[ GET_STUDENT_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingProfile: false,
    fetchingProfileSuccess: true,
    fetchProfileError: null,
    profile: action.payload.data.profile
  })
}

actionHandlers[ GET_STUDENT_FAIL ] = (state, action) => {
  return state.merge({
    fetchingProfile: false,
    fetchingProfileSuccess: false,
    fetchProfileError: action.payload.response.error
  })
}

actionHandlers[ GET_STUDENT_EXTRA_DETAILS ] = state => {
  return state.merge({
    fetchingProfile: false,
    fetchingProfileExtra: true,
    creatingProfile: false,
    creatingProfileSuccess: false,
    fetchingProfileSuccess: false,
    fetchingProfileExtraSuccess: false,
    fetchProfileError: null,
    fetchProfileExtraError: null
  })
}

actionHandlers[ GET_STUDENT_EXTRA_DETAILS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingProfileExtra: false,
    fetchingProfileExtraSuccess: true,
    fetchProfileExtraError: null,
    extraDetails: action.payload.data
  })
}

actionHandlers[ GET_STUDENT_EXTRA_DETAILS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingProfileExtra: false,
    fetchingProfileExtraSuccess: false,
    fetchProfileExtraError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  profile: null,
  extraDetails: null,
  profiles: null,
  creatingProfile: false,
  createProfileError: false,
  creatingProfileSuccess: false,
  fetchingProfiles: false,
  fetchProfilesError: false,
  fetchingProfilesSuccess: false,
  fetchingProfile: false,
  fetchProfileError: false,
  fetchingProfileSuccess: false,
  fetchingProfileExtra: false,
  fetchProfileExtraError: false,
  fetchingProfileExtraSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

