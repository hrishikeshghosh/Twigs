import React from 'react'
import { Grid } from '@material-ui/core'
import PublicIcon from '@material-ui/icons/Public'
import './style.css'
import moment from 'moment'
import { useHistory } from 'react-router'
import TEXTDECODER from '../../../../Helper/TEXT_DECODER'

const EachSearchedPost = ({
  title,
  overview,
  media,
  likes,
  dislikes,
  author,
  tags,
  createdAt,
  type,
  postID
}) => {
  const history = useHistory()
  const viewPost = e => {
    e.preventDefault()
    if (type === '0') {
      history.push(`/contents/blogs/${postID}`)
    } else if (type === '1') {
      history.push(`/contents/arts/${postID}`)
    }
  }

  return (
    <div className='each-search-post-root'>
      <Grid container alignContent='center' alignItems='stretch'>
        <Grid
          item
          sm={6}
          xs={12}
          style={{ backgroundColor: 'rgb(220, 220, 220)' }}
        >
          <div className='search-media-container'>
            <img className='search-media' src={media} alt='search' />
          </div>
        </Grid>
        <Grid
          item
          sm={6}
          xs={12}
          style={{ backgroundColor: 'rgb(220, 220, 220)' }}
        >
          <div className='search-title-box'>
            <p className='search-title'>{title}</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '2% 0'
              }}
            >
              <p className='search-author'>Hrishikesh Ghosh</p>
              <div className='search-createdAt'>
                <PublicIcon
                  style={{
                    color: 'whitesmoke',
                    fontSize: '0.9rem'
                  }}
                />
                <p className='search-static-texts'>Published On</p>
                <p className='search-static-texts'>
                  {' '}
                  {createdAt && moment(createdAt).fromNow()}
                </p>
                &nbsp;
                <p className='search-static-texts'>
                  &middot; &nbsp; {type === '0' ? 'BLOG' : 'ART'}
                </p>
              </div>
            </div>

            <div className='search-tags-box'>
              {tags.map(eachTag => (
                <p className='search-tags'>{eachTag}</p>
              ))}
            </div>

            <div className='search-like-box'>
              <p className='search-like-texts'>
                {likes} {likes.length >= 2 ? 'likes' : 'like'}
              </p>
              <p className='search-like-texts'>
                {dislikes} {dislikes.length >= 2 ? 'dislikes' : 'dislike'}
              </p>
              <button
                className='search-go-to-post-button'
                onClick={e => viewPost(e)}
              >
                View Post
              </button>
            </div>
          </div>
          <div className='search-overview-box'>
            <p
              style={{
                width: '100%',
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                fontSize: '1.5rem',
                fontWeight: 800,
                marginBottom: '2%'
              }}
            >
              Overview
            </p>
            <p>{TEXTDECODER(overview)}...</p>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default EachSearchedPost
