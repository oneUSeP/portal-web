import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_CAMPUS = 'api/CREATE_CAMPUS'
export const CREATE_CAMPUS_SUCCESS = 'api/CREATE_CAMPUS_SUCCESS'
export const CREATE_CAMPUS_FAIL = 'api/CREATE_CAMPUS_FAIL'
export const GET_CAMPUSES = 'api/GET_CAMPUSES'
export const GET_CAMPUSES_SUCCESS = 'api/GET_CAMPUSES_SUCCESS'
export const GET_CAMPUSES_FAIL = 'api/GET_CAMPUSES_FAIL'
export const DELETE_CAMPUS = 'api/DELETE_CAMPUS'
export const DELETE_CAMPUS_SUCCESS = 'api/DELETE_CAMPUS_SUCCESS'
export const DELETE_CAMPUS_FAIL = 'api/DELETE_CAMPUS_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getCampuses (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/campuses?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_CAMPUSES, GET_CAMPUSES_SUCCESS, GET_CAMPUSES_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function createCampus (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/campus',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_CAMPUS,
          CREATE_CAMPUS_SUCCESS,
          CREATE_CAMPUS_FAIL]
      }
    })
  }
}

export function updateCampus (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/campus',
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_CAMPUS,
          CREATE_CAMPUS_SUCCESS,
          CREATE_CAMPUS_FAIL]
      }
    })
  }
}

export function deleteCampus (id) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/campus/${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        types: [
          DELETE_CAMPUS,
          DELETE_CAMPUS_SUCCESS,
          DELETE_CAMPUS_FAIL]
      }
    })
  }
}

export const actions = {
  getCampuses,
  createCampus,
  deleteCampus,
  updateCampus
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_CAMPUS ] = state => {
  return state.merge({
    creatingCampus: true,
    creatingCampusSuccess: false,
    createCampusError: null,
    deletingCampusSuccess: false
  })
}

actionHandlers[ CREATE_CAMPUS_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingCampus: false,
    creatingCampusSuccess: true,
    createCampusError: null,
    campus: action.payload.data.campus
  })
}

actionHandlers[ CREATE_CAMPUS_FAIL ] = (state, action) => {
  return state.merge({
    creatingCampus: false,
    creatingCampusSuccess: false,
    createCampusError: action.payload.response.error
  })
}

actionHandlers[ GET_CAMPUSES ] = state => {
  return state.merge({
    fetchingCampuses: true,
    fetchingCampusesSuccess: false,
    getCampusesError: null,
    creatingCampusSuccess: false,
    deletingCampusSuccess: false
  })
}

actionHandlers[ GET_CAMPUSES_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingCampuses: false,
    fetchingCampusesSuccess: true,
    getCampusesError: null,
    campuses: action.payload.data.campuses
  })
}

actionHandlers[ GET_CAMPUSES_FAIL ] = (state, action) => {
  return state.merge({
    fetchingCampuses: false,
    fetchingCampusesSuccess: false,
    getCampusesError: action.payload.response.error
  })
}

actionHandlers[ DELETE_CAMPUS ] = state => {
  return state.merge({
    deletingCampus: true,
    deletingCampusSuccess: false,
    deleteCampusError: null
  })
}

actionHandlers[ DELETE_CAMPUS_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingCampus: false,
    deletingCampusSuccess: true,
    deleteCampusError: null
  })
}

actionHandlers[ DELETE_CAMPUS_FAIL ] = (state, action) => {
  return state.merge({
    deletingCampus: false,
    deletingCampusSuccess: false,
    deleteCampusError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  campus: null,
  createCampusError: false,
  creatingCampusSuccess: false,
  campuses: null,
  getCampusesError: false,
  fetchingCampusesSuccess: false,
  deleteCampusError: false,
  deletingCampusSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

