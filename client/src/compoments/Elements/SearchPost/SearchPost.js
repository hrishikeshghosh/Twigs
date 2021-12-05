import { IconButton } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import EachSearchedPost from './EachSearchedPost/EachSearchedPost'
import './style.css'
const SearchPost = ({ showSearchAction, setShowSearchAction }) => {
  const history = useHistory()
  useEffect(() => {
    if (showSearchAction) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [showSearchAction])

  const { data, loading } = useSelector(state => state.search)

  return (
    <div
      className='search-post-root'
      style={showSearchAction ? { display: 'block' } : { display: 'none' }}
    >
      <IconButton
        style={{
          margin: '1%',
          position: 'absolute',
          zIndex: '1',
          color: 'red'
        }}
        onClick={e => {
          e.preventDefault()
          setShowSearchAction(prevState => !prevState)
          history.goBack()
        }}
      >
        <i className='fas fa-times'></i>
      </IconButton>
      <div className='search-post-container'>
        {data.length ? (
          data.map(eachData => (
            <EachSearchedPost
              title={eachData.title}
              author={eachData.creatorName}
              tags={eachData.tags}
              media={eachData.media}
              createdAt={eachData.createdAt}
              overview={eachData.content.substring(0, 100)}
              likes={eachData.likes.length}
              dislikes={eachData.dislikes.length}
              postID={eachData?._id}
              type={eachData?.type}
            />
          ))
        ) : (
          <div className='no-search-div'>
            <i
              className='fas fa-exclamation-triangle'
              style={{ fontSize: '2.5rem', margin: '0 3%' }}
            ></i>
            <p
              style={{
                fontSize: '2.5rem',
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                fontWeight: 900
              }}
            >
              Not Found!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPost
