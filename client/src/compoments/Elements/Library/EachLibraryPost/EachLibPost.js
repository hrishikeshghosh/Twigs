import React from 'react'
import { IconButton } from '@material-ui/core'
import './style.css'
import { useDispatch } from 'react-redux'
import { RemovePostFromLibrary } from '../../../../actions/profile'

const EachLibPost = ({
  postIMG,
  title,
  author,
  likes,
  dislikes,
  savedAt,
  description,
  postID
}) => {
  const dispatch = useDispatch()
  return (
    <div className='each-lib-root'>
      <img
        src={
          postIMG
            ? postIMG
            : 'https://firebasestorage.googleapis.com/v0/b/twigs-7e94a.appspot.com/o/posts%2Fconstants%2FNoImagePost.png?alt=media&token=d880ed7e-9c87-40b0-a0cd-7c5596fc3282'
        }
        alt={`thumbnail`}
        className='lib-post-image'
      />
      <section className='lib-detail-box'>
        <div className='lib-detail-box-heading'>
          <p className='lib-detail-box-title'>{title}</p>

          <div className='lib-sub-detail-box'>
            <p className='lib-detail-box-author'>{author}</p>
            &nbsp; &middot; &nbsp;
            <p className='lib-detail-box-likes'>
              {likes} {likes.length >= 2 ? 'likes' : 'like'}
            </p>
            &nbsp;
            <p className='lib-detail-box-dislikes'>
              {dislikes} {dislikes.length >= 2 ? 'dislikes' : 'dislike'}
            </p>
          </div>
        </div>
        <div className='lib-detail-box-desc'>
          <p className='lib-post-desc'>{description}...</p>
        </div>
      </section>
      <div className='lib-content-btns'>
        <IconButton
          className='delete-lib-content-btn'
          style={{
            fontSize: '1.2rem',
            color: '#ff2442',
            fontWeight: 'lighter'
          }}
          onClick={e => {
            e.preventDefault()
            dispatch(RemovePostFromLibrary(postID))
          }}
        >
          <i className='far fa-trash-alt'></i>
        </IconButton>
      </div>
    </div>
  )
}

export default EachLibPost
