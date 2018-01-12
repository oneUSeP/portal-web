import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_AYTERM = 'api/CREATE_AYTERM'
export const CREATE_AYTERM_SUCCESS = 'api/CREATE_AYTERM_SUCCESS'
export const CREATE_AYTERM_FAIL = 'api/CREATE_AYTERM_FAIL'
export const GET_AYTERMS = 'api/GET_AYTERMS'
export const GET_AYTERMS_SUCCESS = 'api/GET_AYTERMS_SUCCESS'
export const GET_AYTERMS_FAIL = 'api/GET_AYTERMS_FAIL'
export const DELETE_AYTERM = 'api/DELETE_AYTERM'
export const DELETE_AYTERM_SUCCESS = 'api/DELETE_AYTERM_SUCCESS'
export const DELETE_AYTERM_FAIL = 'api/DELETE_AYTERM_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getAyTerms (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/ayterms?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_AYTERMS, GET_AYTERMS_SUCCESS, GET_AYTERMS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function createAyTerm (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/ayterm',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_AYTERM,
          CREATE_AYTERM_SUCCESS,
          CREATE_AYTERM_FAIL]
      }
    })
  }
}

export function updateAyTerm (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/ayterm',
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_AYTERM,
          CREATE_AYTERM_SUCCESS,
          CREATE_AYTERM_FAIL]
      }
    })
  }
}

export function deleteAyTerm (id) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/ayterm/${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        types: [
          DELETE_AYTERM,
          DELETE_AYTERM_SUCCESS,
          DELETE_AYTERM_FAIL]
      }
    })
  }
}

export const actions = {
  getAyTerms,
  createAyTerm,
  deleteAyTerm,
  updateAyTerm
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_AYTERM ] = state => {
  return state.merge({
    creatingAyTerm: true,
    creatingAyTermSuccess: false,
    createAyTermError: null,
    deletingAyTermSuccess: false
  })
}

actionHandlers[ CREATE_AYTERM_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingAyTerm: false,
    creatingAyTermSuccess: true,
    createAyTermError: null,
    ayterm: action.payload.data.ayterm
  })
}

actionHandlers[ CREATE_AYTERM_FAIL ] = (state, action) => {
  return state.merge({
    creatingAyTerm: false,
    creatingAyTermSuccess: false,
    createAyTermError: action.payload.response.error
  })
}

actionHandlers[ GET_AYTERMS ] = state => {
  return state.merge({
    fetchingAyTerms: true,
    fetchingAyTermsSuccess: false,
    getAyTermsError: null,
    creatingAyTermSuccess: false,
    deletingAyTermSuccess: false
  })
}

actionHandlers[ GET_AYTERMS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingAyTerms: false,
    fetchingAyTermsSuccess: true,
    getAyTermsError: null,
    ayterms: action.payload.data.ayterms
  })
}

actionHandlers[ GET_AYTERMS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingAyTerms: false,
    fetchingAyTermsSuccess: false,
    getAyTermsError: action.payload.response.error
  })
}

actionHandlers[ DELETE_AYTERM ] = state => {
  return state.merge({
    deletingAyTerm: true,
    deletingAyTermSuccess: false,
    deleteAyTermError: null
  })
}

actionHandlers[ DELETE_AYTERM_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingAyTerm: false,
    deletingAyTermSuccess: true,
    deleteAyTermError: null
  })
}

actionHandlers[ DELETE_AYTERM_FAIL ] = (state, action) => {
  return state.merge({
    deletingAyTerm: false,
    deletingAyTermSuccess: false,
    deleteAyTermError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  ayterm: null,
  createAyTermError: false,
  creatingAyTermSuccess: false,
  ayterms: null,
  getAyTermsError: false,
  fetchingAyTermSuccess: false,
  deleteAyTermError: false,
  deletingAyTermSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

