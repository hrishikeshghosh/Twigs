import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import moment from 'moment'
import { useHistory } from 'react-router'
import './style.css'
import VWReplybox from '../VW_ReplyBox/VWReplybox'
import USERDATA from '../../../../Helper/USERDATA'
import TOKEN_DECODER from '../../../../Helper/TOKEN_DECODER'
import { useDispatch } from 'react-redux'
import { dislikeComment, likeComment } from '../../../../actions/posts'
import TYPE from '../../../../Helper/TYPE'
const VWEachComment = ({
  profileID,
  name,
  profile_img,
  comment,
  date,
  postID,
  commentID,
  repliesCount,
  detail,
  commentlikes,
  commentdislikes
}) => {
  const userData = USERDATA()
  const history = useHistory()
  const userID = TOKEN_DECODER(userData?.token).id
  const dispatch = useDispatch()
  const [likes, setLikes] = useState([])
  const [dislikes, setDislikes] = useState([])
  const [replyBoxClosed, setReplyBoxClosed] = useState(true)

  useEffect(() => {
    setLikes(commentlikes)
    setDislikes(commentdislikes)
  }, [commentlikes, commentdislikes])

  const toggleReplyButton = e => {
    e.preventDefault()
    setReplyBoxClosed(prevState => !prevState)
  }

  const handleLikeButton = async e => {
    e.preventDefault()
    const likeIndex = likes.findIndex(id => id === String(userID))
    if (likeIndex === -1) {
      const newLikes = await dispatch(likeComment(postID, commentID, TYPE()))
      newLikes.forEach(element => {
        if (element?._id === commentID) {
          const filterDislikes = element.comment_dislikes.filter(
            id => id !== String(userID)
          )
          setLikes(element.comment_likes)
          setDislikes(filterDislikes)
        }
      })
    }
  }

  const handleDisLikeButton = async e => {
    e.preventDefault()
    const dislikeIndex = dislikes.findIndex(id => id === String(userID))
    if (dislikeIndex === -1) {
      const newdisLikes = await dispatch(
        dislikeComment(postID, commentID, TYPE())
      )
      newdisLikes.forEach(element => {
        if (element?._id === commentID) {
          const filterLikes = element.comment_likes.filter(
            id => id !== String(userID)
          )
          setDislikes(element.comment_dislikes)
          setLikes(filterLikes)
        }
      })
    }
  }

  return (
    <div className='view-post-each-comment-root'>
      <section className='each-comment-header'>
        <div className='each-comment-header-left'>
          <Avatar className='each-comment-user-avatar' src={profile_img} />
          <div className='each-comment-user-name-box'>
            <p
              className='each-comment-user-name'
              onClick={e => {
                e.preventDefault()
                history.push(`/profile/${profileID}`)
              }}
            >
              {name}
            </p>
            <p className='each-comment-user-role'>Creator</p>
          </div>
        </div>
        <div className='each-comment-header-right'>
          <p className='commented-at'> {moment(date).fromNow()}</p>
        </div>
      </section>
      <section className='each-comment-body'>
        <p className='each-comment-comment-text'>{comment}</p>
      </section>
      <section className='each-comment-footer'>
        <IconButton
          className='each-comment-footer-buttons'
          onClick={e => handleLikeButton(e)}
        >
          <i
            className='fas fa-thumbs-up each-comment-footer-icons'
            style={likes.includes(String(userID)) ? { color: '#2a6999' } : null}
          ></i>
        </IconButton>
        <p>
          {likes.length} {likes.length >= 2 ? 'likes' : 'like'}
        </p>
        <IconButton
          className='each-comment-footer-buttons'
          onClick={e => handleDisLikeButton(e)}
        >
          <i
            class='fas fa-thumbs-down each-comment-footer-icons'
            style={
              dislikes.includes(String(userID)) ? { color: '#2a6999' } : null
            }
          ></i>
        </IconButton>
        <p>
          {' '}
          {dislikes.length} {dislikes.length >= 2 ? 'dislikes' : 'dislike'}
        </p>
        <IconButton
          className='each-comment-footer-buttons'
          onClick={e => toggleReplyButton(e)}
        >
          <i class='fas fa-reply each-comment-footer-icons'></i>
        </IconButton>
        <p>
          {repliesCount} {repliesCount >= 2 ? 'replies' : 'reply'}
        </p>
      </section>
      <section
        className='each-comment-reply-box'
        style={replyBoxClosed ? { display: 'none' } : { display: 'block' }}
      >
        <VWReplybox postID={postID} commentID={commentID} detail={detail} />
      </section>
    </div>
  )
}

export default VWEachComment
