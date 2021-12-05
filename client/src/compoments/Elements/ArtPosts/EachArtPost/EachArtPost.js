import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import Menu from '../../../atoms/postMenu/Menu'
import './style.css'
import TOKEN_DECODER from '../../../../Helper/TOKEN_DECODER'
import USERDATA from '../../../../Helper/USERDATA'
const EachArtPost = ({
  title,
  tags,
  createdAt,
  media,
  overview,
  creator,
  id,
  postlikes,
  postdislikes,
  setContentID,
  profileimg,
  name,
  role
}) => {
  const userID = TOKEN_DECODER(USERDATA()?.token).id
  const history = useHistory()

  const openArt = e => {
    e.preventDefault()
    history.push(`/contents/arts/${id}`)
  }

  return (
    <div className='each-art-root'>
      <div className='each-art-container' onClick={openArt}>
        <img className='image-display' src={media} alt='123'></img>
      </div>

      <div className='image-details'>
        <div className='image-personal-detail-box'>
          <Avatar
            className='artist-avatar'
            style={{ height: '1.8rem', width: '1.8rem' }}
            src={profileimg}
          />
          <div className='each-art-details'>
            <p className='each-art-title'>{title}</p>
            <p className='artist-name'>{name}</p>
            <p className='artist-role'>{role}</p>
            <div className='likes-display'></div>
          </div>
        </div>

        <Menu
          setContentID={setContentID}
          postID={id}
          userID={userID}
          creatorID={creator}
          title={title}
          author={name}
          tags={tags}
          type={1}
        />
      </div>
    </div>
  )
}

export default EachArtPost
