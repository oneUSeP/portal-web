import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_STRAND = 'api/CREATE_STRAND'
export const CREATE_STRAND_SUCCESS = 'api/CREATE_STRAND_SUCCESS'
export const CREATE_STRAND_FAIL = 'api/CREATE_STRAND_FAIL'
export const GET_STRANDS = 'api/GET_STRANDS'
export const GET_STRANDS_SUCCESS = 'api/GET_STRANDS_SUCCESS'
export const GET_STRANDS_FAIL = 'api/GET_STRANDS_FAIL'
export const DELETE_STRAND = 'api/DELETE_STRAND'
export const DELETE_STRAND_SUCCESS = 'api/DELETE_STRAND_SUCCESS'
export const DELETE_STRAND_FAIL = 'api/DELETE_STRAND_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getStrands (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/strands?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_STRANDS, GET_STRANDS_SUCCESS, GET_STRANDS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function createStrand (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/strand',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_STRAND,
          CREATE_STRAND_SUCCESS,
          CREATE_STRAND_FAIL]
      }
    })
  }
}

export function updateStrand (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/strand',
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_STRAND,
          CREATE_STRAND_SUCCESS,
          CREATE_STRAND_FAIL]
      }
    })
  }
}

export function deleteStrand (id) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/strand/${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        types: [
          DELETE_STRAND,
          DELETE_STRAND_SUCCESS,
          DELETE_STRAND_FAIL]
      }
    })
  }
}

export const actions = {
  getStrands,
  createStrand,
  deleteStrand,
  updateStrand
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_STRAND ] = state => {
  return state.merge({
    creatingStrand: true,
    creatingStrandSuccess: false,
    createStrandError: null,
    deletingStrandSuccess: false
  })
}

actionHandlers[ CREATE_STRAND_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingStrand: false,
    creatingStrandSuccess: true,
    createStrandError: null,
    strand: action.payload.data.strand
  })
}

actionHandlers[ CREATE_STRAND_FAIL ] = (state, action) => {
  return state.merge({
    creatingStrand: false,
    creatingStrandSuccess: false,
    createStrandError: action.payload.response.error
  })
}

actionHandlers[ GET_STRANDS ] = state => {
  return state.merge({
    fetchingStrands: true,
    fetchingStrandsSuccess: false,
    getStrandsError: null,
    creatingStrandSuccess: false,
    deletingStrandSuccess: false
  })
}

actionHandlers[ GET_STRANDS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingStrands: false,
    fetchingStrandsSuccess: true,
    getStrandsError: null,
    strands: action.payload.data.strands
  })
}

actionHandlers[ GET_STRANDS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingStrands: false,
    fetchingStrandsSuccess: false,
    getStrandsError: action.payload.response.error
  })
}

actionHandlers[ DELETE_STRAND ] = state => {
  return state.merge({
    deletingStrand: true,
    deletingStrandSuccess: false,
    deleteStrandError: null
  })
}

actionHandlers[ DELETE_STRAND_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingStrand: false,
    deletingStrandSuccess: true,
    deleteStrandError: null
  })
}

actionHandlers[ DELETE_STRAND_FAIL ] = (state, action) => {
  return state.merge({
    deletingStrand: false,
    deletingStrandSuccess: false,
    deleteStrandError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  strand: null,
  createStrandError: false,
  creatingStrandSuccess: false,
  strands: null,
  getStrandsError: false,
  fetchingStrandSuccess: false,
  deleteStrandError: false,
  deletingStrandSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

