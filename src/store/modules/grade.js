import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const GET_ME_AYTERMS = 'api/GET_ME_AYTERMS'
export const GET_ME_AYTERMS_SUCCESS = 'api/GET_ME_AYTERMS_SUCCESS'
export const GET_ME_AYTERMS_FAIL = 'api/GET_ME_AYTERMS_FAIL'
export const GET_ME_GRADES = 'api/GET_ME_GRADES'
export const GET_ME_GRADES_SUCCESS = 'api/GET_ME_GRADES_SUCCESS'
export const GET_ME_GRADES_FAIL = 'api/GET_ME_GRADES_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getAyTerms (studentId = 0) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/me/ayterms/${studentId}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_ME_AYTERMS, GET_ME_AYTERMS_SUCCESS, GET_ME_AYTERMS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function getGrades (studentId = 0, termId = 0, progClass = 0) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/me/grades/${studentId}/${termId}?progClass=${progClass}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_ME_GRADES, GET_ME_GRADES_SUCCESS, GET_ME_GRADES_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export const actions = {
  getAyTerms,
  getGrades
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ GET_ME_AYTERMS ] = state => {
  return state.merge({
    fetchingAyTerms: true,
    fetchingAyTermsSuccess: false,
    fetchAyTermsError: null
  })
}

actionHandlers[ GET_ME_AYTERMS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingAyTerms: false,
    fetchingAyTermsSuccess: true,
    fetchAyTermsError: null,
    ayterms: action.payload.data
  })
}

actionHandlers[ GET_ME_AYTERMS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingAyTerms: false,
    fetchingAyTermsSuccess: false,
    fetchAyTermsError: action.payload.response.error
  })
}

actionHandlers[ GET_ME_GRADES ] = state => {
  return state.merge({
    fetchingGrades: true,
    fetchingGradesSuccess: false,
    fetchGradesError: null
  })
}

actionHandlers[ GET_ME_GRADES_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingGrades: false,
    fetchingGradesSuccess: true,
    fetchGradesError: null,
    grades: action.payload.data
  })
}

actionHandlers[ GET_ME_GRADES_FAIL ] = (state, action) => {
  return state.merge({
    fetchingGrades: false,
    fetchingGradesSuccess: false,
    fetchGradesError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  grades: null,
  fetchingGrades: false,
  fetchGradesError: false,
  fetchingGradesSuccess: false,
  ayterms: null,
  fetchingAyTerms: false,
  fetchAyTermsError: false,
  fetchingAyTermsSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

