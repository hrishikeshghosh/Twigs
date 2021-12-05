import React, { useEffect } from 'react'
import EachPost from './EachPost/EachPost'
import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import './style.css'

const Posts = ({ setContentID, setShowLoading }) => {
  const { blogs, Loading } = useSelector(state => state.posts)
  useEffect(() => {
    blogs.reverse()
  }, [blogs])

  useEffect(() => {
    if (Loading) {
    } else {
      return
    }
  }, [blogs.length, Loading])

  return (
    <div className='blog-feed' id='blog-feed'>
      <div className='blog-feed-container'>
        <div
          className='post-loader-box'
          style={
            Loading
              ? {
                  transform: 'translateY(0%)',
                  visibility: 'visible',
                  opacity: 1
                }
              : {
                  transform: 'translateY(-100%)',
                  visibility: 'collapse',
                  opacity: 0
                }
          }
        >
          <CircularProgress
            className='post-loader'
            style={{
              color: '#e5007e',
              display: 'block',
              margin: '0 auto'
            }}
          />
        </div>
        {blogs.length ? (
          blogs.map(blog => (
            <EachPost
              title={blog.title}
              createdAt={blog.createdAt}
              media={blog.media}
              tags={blog.tags}
              overview={blog.content}
              creatorID={blog.creatorID}
              creatorImage={blog.creatorImage}
              creatorName={blog.creatorName}
              creatorRole={blog.creatorRole}
              id={blog._id}
              postlikes={blog.likes}
              postdislikes={blog.dislikes}
              setContentID={setContentID}
            />
          ))
        ) : (
          <div className='no-post-box'>
            <i className='fas fa-sticky-note'></i>
            <h1 className='no-post-text'>Create a Blog!</h1>
            <h5 className='no-post-text-2'>
              or follow some writers to see new posts
            </h5>
          </div>
        )}
      </div>
    </div>
  )
}
export default Posts
