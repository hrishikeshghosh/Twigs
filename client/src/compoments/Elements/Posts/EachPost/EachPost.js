import React from 'react'
import moment from 'moment'
import { Avatar } from '@material-ui/core'
import { StylesProvider } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import TOKEN_DECODER from '../../../../Helper/TOKEN_DECODER'
import Menu from '../../../atoms/postMenu/Menu'
import './style.css'
import TEXTDECODER from '../../../../Helper/TEXT_DECODER'

function EachPost (props) {
  const history = useHistory()
  const userData = JSON.parse(localStorage.getItem('profile'))
  const userID = TOKEN_DECODER(userData?.token).id
  const openBlog = e => {
    e.preventDefault()
    history.push(`/contents/blogs/${props.id}`)
  }

  return (
    <div className='card'>
      <div
        className='card-header'
        onClick={e => openBlog(e)}
        style={
          props.media === null
            ? {
                backgroundImage: `linear-gradient(to bottom, transparent, black),url(https://firebasestorage.googleapis.com/v0/b/twigs-7e94a.appspot.com/o/posts%2Fconstants%2FNoImagePost.png?alt=media&token=d880ed7e-9c87-40b0-a0cd-7c5596fc3282)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }
            : {
                backgroundImage: `linear-gradient(to bottom, transparent, black),url(${props.media})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }
        }
      >
        <div className='card-title-box'>
          <p className='card-title'>{props.title}</p>
          <div>
            {props.createdAt && (
              <p className='card-date' variant='subtitle2' align='left'>
                {moment(props.createdAt).fromNow()}
              </p>
            )}
          </div>

          <div className='card-views-count-box'>
            <div>
              {props.postlikes && (
                <p className='card-views-count'>{props.postlikes.length}</p>
              )}
            </div>

            <p className='card-views-static'>Likes</p>
            <div>
              {props.postdislikes && (
                <p className='card-views-count'>{props.postdislikes.length}</p>
              )}
            </div>

            <p className='card-views-static'>Dislikes</p>
          </div>
        </div>

        <div className='card-desc-box'>
          <p
            style={{
              fontFamily: "'Open Sans',-apple-system",
              fontWeight: 600
            }}
          >
            Overview:
            <div>
              {props.overview && (
                <p style={{ wordWrap: 'break-word' }}>
                  {TEXTDECODER(props.overview.substring(0, 50))}
                </p>
              )}
            </div>
          </p>

          <p>...SEE MORE</p>
        </div>
      </div>
      <div className='card-footer'>
        <Avatar
          className='card-avatar'
          src={props.creatorImage}
          alt={props.title}
          style={{ height: '25px', width: '25px' }}
        />
        <div className='card-footer-title'>
          <p className='card-username'>{props.creatorName}</p>
          <p className='card-role'>{props.creatorRole}</p>
        </div>
        <Menu
          setContentID={props.setContentID}
          postID={props.id}
          userID={userID}
          creatorID={props.creatorID}
          title={props.title}
          author={props.creatorName}
          tags={props.tags}
          type={0}
        />
      </div>
    </div>
  )
}

export default EachPost
