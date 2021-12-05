import * as api from '../api'
import {
  END_LOADING,
  FETCHFEED,
  SEARCH_POST,
  START_LOADING
} from '../constants/actionTypes'

export const getPosts = () => async dispatch => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.getPosts()
    dispatch({ type: FETCHFEED, payload: data })
    dispatch({ type: END_LOADING })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const searchPosts = searchQuery => async dispatch => {
  try {
    // dispatch({ type: START_LOADING });
    const { data } = await api.fetchDataBySearch(searchQuery)
    dispatch({ type: SEARCH_POST, payload: data })
    // dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error)
  }
}
