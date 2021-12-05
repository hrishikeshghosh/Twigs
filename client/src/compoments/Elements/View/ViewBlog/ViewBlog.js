import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Divider, LinearProgress, Grow } from '@material-ui/core'
import TEXTDECODER from '../../../../Helper/TEXT_DECODER'
import LikeBox from '../../../atoms/LikeBox/LikeBox'
import Comments from '../../../atoms/Comments/Comments'
import moment from 'moment'
import { fetchComments, getSinglePost } from '../../../../actions/posts'
import './style.css'

const ViewBlog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  useEffect(() => {
    dispatch(getSinglePost(id)).then(dispatch(fetchComments(id)))
  }, [dispatch, id])

  const { detail, Loading } = useSelector(state => state.blogs)
  const [commentBoxClosed, setCommentBox] = useState(true)

  if (detail) {
    return (
      <Grow in>
        <div className='view-blog-root'>
          <div className='view-blog-container'>
            <div className='view-blog-header'>
              <div className='view-blog-header-title-box'>
                <h2 className='view-blog-header-title'>{detail.title}</h2>
              </div>
              <Divider orientation='vertical' className='header-divider' />
              <div className='view-blog-header-author-box'>
                <div className='view-blog-header-author-subdiv-date'>
                  <p className='Date-static'>Date</p>
                  <p className='blog-posted-date'>
                    {moment(detail.createdAt).format('DD MMM, YYYY')}
                  </p>
                </div>
                <div className='view-blog-header-author-subdiv-author'>
                  <p className='Author-static'>Author</p>
                  <p
                    className='blog-posted-author'
                    onClick={e => {
                      e.preventDefault()
                      history.push(`/profile/${detail.creator}`)
                    }}
                  >
                    {detail.name}
                  </p>
                  <p className='blog-posted-author-role'>Creator</p>
                </div>
              </div>
            </div>
            <Divider orientation='horizontal' />
            <div className='view-blog-body'>
              <img className='view-blog-image' src={detail.media} alt='blog' />
              <div className='view-blog-content-box'>
                <p className='view-blog-content'>
                  {TEXTDECODER(detail.content)}
                  {/* {post.content} */}
                </p>
              </div>
              <div className='view-blog-tags' style={{ display: 'flex' }}>
                {detail.tags.length !== 0
                  ? detail.tags.map(eachTag => (
                      <div className='tag-holder'>
                        <i className='fas fa-hashtag'></i>
                        <p className='tags-p'>{eachTag}</p>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <LikeBox id={id} detail={detail} setCommentBox={setCommentBox} />
            <Divider style={{ margin: '16px' }} />
            <div
              className='comment-box-container'
              style={
                commentBoxClosed ? { display: 'none' } : { display: 'block' }
              }
            >
              <Comments id={id} detail={detail} />
            </div>
          </div>
          <div className='related-post-selction'>
            {/* NOT IMPLEMENTING NOW */}
          </div>
        </div>
      </Grow>
    )
  } else if (Loading) {
    return <LinearProgress className='loader' />
  } else {
    return <h1> no post</h1>
  }
}

export default ViewBlog
