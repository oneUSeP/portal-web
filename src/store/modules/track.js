import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_TRACK = 'api/CREATE_TRACK'
export const CREATE_TRACK_SUCCESS = 'api/CREATE_TRACK_SUCCESS'
export const CREATE_TRACK_FAIL = 'api/CREATE_TRACK_FAIL'
export const GET_TRACKS = 'api/GET_TRACKS'
export const GET_TRACKS_SUCCESS = 'api/GET_TRACKS_SUCCESS'
export const GET_TRACKS_FAIL = 'api/GET_TRACKS_FAIL'
export const DELETE_TRACK = 'api/DELETE_TRACK'
export const DELETE_TRACK_SUCCESS = 'api/DELETE_TRACK_SUCCESS'
export const DELETE_TRACK_FAIL = 'api/DELETE_TRACK_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getTracks (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/tracks?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_TRACKS, GET_TRACKS_SUCCESS, GET_TRACKS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function createTrack (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/track',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_TRACK,
          CREATE_TRACK_SUCCESS,
          CREATE_TRACK_FAIL]
      }
    })
  }
}

export function updateTrack (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/track',
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_TRACK,
          CREATE_TRACK_SUCCESS,
          CREATE_TRACK_FAIL]
      }
    })
  }
}

export function deleteTrack (id) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/track/${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        types: [
          DELETE_TRACK,
          DELETE_TRACK_SUCCESS,
          DELETE_TRACK_FAIL]
      }
    })
  }
}

export const actions = {
  getTracks,
  createTrack,
  deleteTrack,
  updateTrack
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_TRACK ] = state => {
  return state.merge({
    creatingTrack: true,
    creatingTrackSuccess: false,
    createTrackError: null,
    deletingTrackSuccess: false
  })
}

actionHandlers[ CREATE_TRACK_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingTrack: false,
    creatingTrackSuccess: true,
    createTrackError: null,
    track: action.payload.data.track
  })
}

actionHandlers[ CREATE_TRACK_FAIL ] = (state, action) => {
  return state.merge({
    creatingTrack: false,
    creatingTrackSuccess: false,
    createTrackError: action.payload.response.error
  })
}

actionHandlers[ GET_TRACKS ] = state => {
  return state.merge({
    fetchingTracks: true,
    fetchingTracksSuccess: false,
    getTracksError: null,
    creatingTrackSuccess: false,
    deletingTrackSuccess: false
  })
}

actionHandlers[ GET_TRACKS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingTracks: false,
    fetchingTracksSuccess: true,
    getTracksError: null,
    tracks: action.payload.data.tracks
  })
}

actionHandlers[ GET_TRACKS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingTracks: false,
    fetchingTracksSuccess: false,
    getTracksError: action.payload.response.error
  })
}

actionHandlers[ DELETE_TRACK ] = state => {
  return state.merge({
    deletingTrack: true,
    deletingTrackSuccess: false,
    deleteTrackError: null
  })
}

actionHandlers[ DELETE_TRACK_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingTrack: false,
    deletingTrackSuccess: true,
    deleteTrackError: null
  })
}

actionHandlers[ DELETE_TRACK_FAIL ] = (state, action) => {
  return state.merge({
    deletingTrack: false,
    deletingTrackSuccess: false,
    deleteTrackError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  track: null,
  createTrackError: false,
  creatingTrackSuccess: false,
  tracks: null,
  getTracksError: false,
  fetchingTrackSuccess: false,
  deleteTrackError: false,
  deletingTrackSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

