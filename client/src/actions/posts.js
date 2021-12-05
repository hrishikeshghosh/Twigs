import * as api from '../api'
import {
  FETCHSINGLEPOST,
  CREATEPOST,
  UPDATEPOST,
  DELETEPOST,
  START_LOADING,
  END_LOADING,
  LIKEPOST,
  DISLIKEPOST,
  COMMENTPOST,
  FETCHCOMMENTS,
  REPLYCOMMENT,
  START_REPLY_LOADING,
  END_REPLY_LOADING,
  START_FETCH_COMMENT_LOAD,
  END_FETCH_COMMENT_LOAD,
  LIKECOMMENT,
  SEARCHBYPOSTNAME,
  START_LOAD_SINGLEPOST,
  END_LOAD_SINGLEPOST,
  SEARCHPROFILEBYNAME
} from '../constants/actionTypes'

export const getSinglePost = (id, type) => async dispatch => {
  try {
    dispatch({ type: START_LOAD_SINGLEPOST })
    const { data } = await api.getSinglePost(id, type)
    dispatch({ type: FETCHSINGLEPOST, payload: data })
    dispatch({ type: END_LOAD_SINGLEPOST })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (newpost, type) => async dispatch => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.createPost(newpost, type)
    console.log(data)
    dispatch({ type: CREATEPOST, payload: data, section: type })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const updatePost = (id, editedPost, type) => async dispatch => {
  try {
    console.log(id)
    const { data } = await api.updatePost(id, editedPost, type)
    dispatch({ type: UPDATEPOST, payload: data, section: type })
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = (id, type) => async dispatch => {
  try {
    await api.deletePost(id, type)
    dispatch({ type: DELETEPOST, payload: id, section: type })
  } catch (error) {
    console.log(error)
  }
}

export const likePost = (id, type) => async dispatch => {
  try {
    const { data } = await api.likePost(id, type)
    dispatch({ type: LIKEPOST, payload: data, section: type })
    return data.post.likes
  } catch (error) {
    console.log(error)
  }
}

export const dislikePost = (id, type) => async dispatch => {
  try {
    const { data } = await api.dislikePost(id, type)
    dispatch({ type: DISLIKEPOST, payload: data, section: type })
    return data.post.dislikes
  } catch (error) {
    console.log(error)
  }
}

export const fetchComments = (id, type) => async dispatch => {
  try {
    dispatch({ type: START_FETCH_COMMENT_LOAD })
    const { data } = await api.fetchComments(id, type)
    dispatch({ type: FETCHCOMMENTS, payload: data })
    dispatch({ type: END_FETCH_COMMENT_LOAD })
  } catch (error) {
    console.log(error)
  }
}

export const commentPost = (id, comment, type) => async dispatch => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.commentPost(id, comment, type)
    dispatch({ type: COMMENTPOST, payload: data })
    dispatch({ type: END_LOADING })
    return data
  } catch (error) {}
}

export const replyPost = (
  postId,
  commentId,
  reply_text,
  type
) => async dispatch => {
  try {
    dispatch({ type: START_REPLY_LOADING })
    const { data } = await api.replyPost(postId, commentId, reply_text, type)
    dispatch({ type: REPLYCOMMENT, payload: data })
    dispatch({ type: END_REPLY_LOADING })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const likeComment = (postID, commentID, type) => async dispatch => {
  try {
    const { data } = await api.LikeComment(postID, commentID, type)
    dispatch({ type: LIKECOMMENT, payload: data, section: type })
    return data.post.comments
  } catch (error) {
    console.log(error)
  }
}

export const dislikeComment = (postID, commentID, type) => async dispatch => {
  try {
    const { data } = await api.DislikeComment(postID, commentID, type)
    dispatch({ type: DISLIKEPOST, payload: data, section: type })
    return data.post.comments
  } catch (error) {
    console.log(error)
  }
}

export const fetchDataBySearch = searchQuery => async dispatch => {
  try {
    const { data } = await api.fetchDataBySearch(searchQuery)
    if (!data.profile || data === []) {
      dispatch({ type: SEARCHBYPOSTNAME, payload: data.data })
    } else {
      dispatch({ type: SEARCHPROFILEBYNAME, payload: data })
    }
    return data
  } catch (error) {
    console.log(error)
  }
}
