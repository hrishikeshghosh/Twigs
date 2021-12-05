import axios from 'axios'

const API = axios.create({ baseURL: `https://twigs-server.herokuapp.com/` })

API.interceptors.request.use(req => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }
  return req
})

//feed paths
export const getPosts = () => API.get('https://twigs-server.herokuapp.com/feed')
export const fetchDataBySearch = searchQuery =>
  API.get(`https://twigs-server.herokuapp.com/feed/search?query=${searchQuery}`)

//post paths
export const createPost = (newPost, type) =>
  API.post(`https://twigs-server.herokuapp.com/posts?type=${type}`, newPost)
export const updatePost = (id, editedPost, type) =>
  API.patch(
    `https://twigs-server.herokuapp.com/posts/${id}?type=${type}`,
    editedPost
  )
export const getSinglePost = (id, type) =>
  API.get(`https://twigs-server.herokuapp.com/posts/${id}?type=${type}`)
export const deletePost = (id, type) =>
  API.delete(`https://twigs-server.herokuapp.com/posts/${id}?type=${type}`)
export const likePost = (id, type) =>
  API.patch(`https://twigs-server.herokuapp.com/posts/like/${id}?type=${type}`)
export const dislikePost = (id, type) =>
  API.patch(
    `https://twigs-server.herokuapp.com/posts/dislike/${id}?type=${type}`
  )
export const fetchComments = (id, type) =>
  API.get(
    `https://twigs-server.herokuapp.com/posts/fetchComments/${id}?type=${type}`
  )
export const commentPost = (id, comment, type) =>
  API.patch(
    `https://twigs-server.herokuapp.com/posts/comments/${id}?type=${type}`,
    comment
  )
export const replyPost = (postID, commentID, replyText, type) =>
  API.patch(
    `https://twigs-server.herokuapp.com/posts/replies/${postID}/${commentID}?type=${type}`,
    replyText
  )
export const LikeComment = (postID, commentID, type) =>
  API.patch(
    `https://twigs-server.herokuapp.com/posts/commentLikes/${postID}/${commentID}?type=${type}`
  )
export const DislikeComment = (postID, commentID, type) =>
  API.patch(
    `https://twigs-server.herokuapp.com/posts/commentDislikes/${postID}/${commentID}?type=${type}`
  )

//auth paths
export const signin = formData =>
  axios.post('https://twigs-server.herokuapp.com/auth/signin', formData)
export const signup = formData =>
  axios.post('https://twigs-server.herokuapp.com/auth/signup', formData)

//profile paths
export const fetchProfile = id =>
  API.get(`https://twigs-server.herokuapp.com/profile/${id}`)
export const setprofile = (id, profileData) =>
  API.patch(
    `https://twigs-server.herokuapp.com/profile/${id}/profileDetails`,
    profileData
  )
export const updatePasswords = (id, passwordSet) =>
  API.patch(
    `https://twigs-server.herokuapp.com/profile/${id}/profilePassword`,
    passwordSet
  )
export const deleteprofile = id => API.delete(`profile/${id}`)
export const listFollowersAndFollowings = id =>
  API.patch(`https://twigs-server.herokuapp.com/profile/${id}/listFandF`)
export const addToLibrary = (postID, creds) => {
  return API.patch(
    `https://twigs-server.herokuapp.com/profile/addToLib/${postID}`,
    creds
  )
}
export const searchLibrary = (search, id) => {
  return API.get(
    `https://twigs-server.herokuapp.com/profile/${id}/librarySearch?search=${search}`
  )
}
export const clearLibrary = userID => {
  return API.delete(
    `https://twigs-server.herokuapp.com/profile/clearLibrary/${userID}`
  )
}

export const RemovePostFromLib = postID => {
  return API.patch(
    `https://twigs-server.herokuapp.com/profile/removePostFromLibrary/${postID}`
  )
}

//Support paths

export const GetEmailAPI = () => {
  return API.get('https://twigs-server.herokuapp.com/support')
}
