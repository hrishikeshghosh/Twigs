import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { listFollowersAndFollowings } from '../../../actions/profile'

const FANDF = ({ followers, userID, postID }) => {
  const dispatch = useDispatch()
  const [following, setFollowing] = useState(false)
  useEffect(() => {
    const index = followers.findIndex(id => id === String(userID))
    if (index !== -1) {
      setFollowing(true)
    } else {
      setFollowing(false)
    }
  }, [followers, userID])

  const handleFollowButton = async e => {
    e.preventDefault()
    const newFollowers = await dispatch(listFollowersAndFollowings(postID))
    const index = newFollowers.findIndex(id => id === String(userID))
    if (index !== -1) {
      setFollowing(true)
    } else {
      setFollowing(false)
    }
  }

  return (
    <div className='profile-interaction-button-root'>
      {following ? (
        <button className='profile-interaction-button'>
          <p className='interaction-state'>Following</p>
          <i className='fi-rr-check'></i>
        </button>
      ) : (
        <button
          className='profile-interaction-button'
          onClick={e => handleFollowButton(e)}
        >
          <i className='fi-rr-user-add'></i>
          <p className='interaction-state'>Follow</p>
        </button>
      )}
    </div>
  )
}

export default FANDF
