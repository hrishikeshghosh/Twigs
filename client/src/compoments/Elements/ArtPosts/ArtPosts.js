import React, { useEffect, useState } from 'react'
import EachArtPost from './EachArtPost/EachArtPost'
import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import './style.css'

const ArtPosts = ({
  setIsDisplayed,
  setContentID,
  setShowLoading,
  fetched
}) => {
  const [postAvailable, setPostAvailable] = useState(true)
  const { arts, Loading } = useSelector(state => state.posts)

  useEffect(() => {
    arts.reverse()
  }, [arts])

  return (
    <div className='art-section-root'>
      {postAvailable ? (
        <div className='art-feed'>
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
          {arts.length
            ? arts.map(art => (
                <EachArtPost
                  key={art._id}
                  createdAt={art.createdAt}
                  media={art.media}
                  overview={art.content}
                  creator={art.creatorID}
                  id={art._id}
                  tags={art.tags}
                  postlikes={art.likes}
                  postdislikes={art.dislikes}
                  setContentID={setContentID}
                  profileimg={art.creatorImage}
                  name={art.creatorName}
                  role={art.creatorRole}
                  setIsDisplayed={setIsDisplayed}
                  title={art.title}
                />
              ))
            : setPostAvailable(false)}
        </div>
      ) : (
        <div className='no-post-box'>
          <i className='fas fa-paint-roller'></i>
          <h1 className='no-post-text'>Paint an Art!</h1>
          <h5 className='no-post-text-2'>
            or follow some Artists to see new posts
          </h5>
        </div>
      )}
    </div>
  )
}

export default ArtPosts
