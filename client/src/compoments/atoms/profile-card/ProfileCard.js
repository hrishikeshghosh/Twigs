import React from 'react'
import './style.css'
import { Divider, IconButton, Avatar } from '@material-ui/core'
import { useHistory } from 'react-router'
import Designation from '../Designation/Designation'
import Verified from '../Verified/Verified'
import TOKEN_DECODER from '../../../Helper/TOKEN_DECODER'

function ProfileInfo () {
  const history = useHistory()
  const userData = JSON.parse(localStorage.getItem('profile'))
  const userID = TOKEN_DECODER(userData?.token)?.id

  return (
    <div className='profile-card-root'>
      <Avatar
        className='profile-card-prof-image'
        src={userData?.result?.imageUrl}
        alt='profile'
        style={{
          height: '150px',
          width: '150px'
        }}
      />
      {/* <Divider style={{ width: "100%", margin: "0 5%" }} /> */}
      <div className='detail-box'>
        <h3
          className='profile-card-username'
          onClick={e => {
            e.preventDefault()
            history.push(`/profile/${userID}`)
          }}
        >
          {userData?.result?.name}
        </h3>
        <p className='profile-card-role'>{userData?.result?.role}</p>
        <p className='profile-card-bio'>{userData?.result?.profileDesc}</p>
      </div>
      <Divider style={{ width: '100%' }} />
      <div className='profile-card-end'>
        <div className='profile-card-followers-list'>
          <i className='fas fa-user-friends profile-card-icons'></i>
          <p className='follower-text'>{userData?.result?.followers?.length}</p>
          <div className='profilecard-badge-box'>
            {/* {userData?.result?.verified && <Verified />} */}
            <Verified size='1.2rem' />
            <Designation
              designation={userData?.result?.designation}
              size='1.2rem'
            />
          </div>
        </div>
        <IconButton
          className='share-profile'
          onClick={e => {
            e.preventDefault()
            navigator.clipboard.writeText(
              window.location.origin + '/profile/' + userID
            )
          }}
        >
          <i className='fas fa-link' style={{ fontSize: '15px' }}></i>
        </IconButton>
      </div>
    </div>
  )
}

export default ProfileInfo
