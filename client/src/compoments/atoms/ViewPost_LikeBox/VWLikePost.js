import React, { useState, useEffect } from 'react'
import { likePost, dislikePost } from '../../../actions/posts'
import TYPE from '../../../Helper/TYPE'

import './style.css'
import { IconButton } from '@material-ui/core'
import USERDATA from '../../../Helper/USERDATA'
import TOKEN_DECODER from '../../../Helper/TOKEN_DECODER'
import { useDispatch } from 'react-redux'

const VWLikePost = ({ id, likeCount, dislikeCount, copyrightname }) => {
  const userData = USERDATA()
  const userID = TOKEN_DECODER(userData?.token).id
  const dispatch = useDispatch()
  const [likes, setLikes] = useState([])
  const [dislikes, setDislikes] = useState([])
  let likesCounter = likes.length
  let dislikesCounter = dislikes.length

  useEffect(() => {
    setLikes(likeCount)
    setDislikes(dislikeCount)
  }, [likeCount, dislikeCount])

  const handleLikeClick = async e => {
    e.preventDefault()
    const likeindex = likes.findIndex(id => id === String(userID))

    if (likeindex === -1) {
      const newLikes = await dispatch(likePost(id, TYPE()))
      const filterDislikes = await dislikes.filter(id => id !== String(userID))
      setDislikes(filterDislikes)
      setLikes(newLikes)
    }
  }

  const handleDislikeClick = async e => {
    e.preventDefault()
    const dislikeindex = dislikes.findIndex(id => id === String(userID))
    if (dislikeindex === -1) {
      const newDislikes = await dispatch(dislikePost(id, TYPE()))
      const filterlikes = likes.filter(id => id !== String(userID))
      setLikes(filterlikes)
      setDislikes(newDislikes)
    }
  }

  return (
    <div className='like-box-root'>
      <div className='like-box-left'>
        <div className='like-box-like-section'>
          <IconButton
            className='like-box-buttons'
            onClick={e => handleLikeClick(e)}
          >
            {likes.includes(String(userID)) ? (
              <i className='fas fa-thumbs-up liked'></i>
            ) : (
              <i className='far fa-thumbs-up '></i>
            )}
          </IconButton>

          <div className='count-text-box'>
            <p className='like-box-count-texts'>{likesCounter}</p>
            <p className='like-box-static-texts'>
              {' '}
              {likes?.length >= 2 ? 'likes' : 'like'}
            </p>
          </div>
        </div>
        <div className='like-box-dislike-section'>
          <IconButton
            className='like-box-buttons'
            onClick={e => handleDislikeClick(e)}
          >
            {dislikes.includes(String(userID)) ? (
              <i class='fas fa-thumbs-down disliked'></i>
            ) : (
              <i className='far fa-thumbs-down'></i>
            )}
          </IconButton>

          <div className='count-text-box'>
            <p className='like-box-count-texts'>{dislikesCounter}</p>
            <p className='like-box-static-texts'>
              {' '}
              {dislikes?.length >= 2 ? 'dislikes' : 'dislike'}
            </p>
          </div>
        </div>
      </div>
      <div className='like-box-right'>
        <p className='post-copyright-text'>&copy; {copyrightname}</p>
      </div>
    </div>
  )
}

export default VWLikePost
