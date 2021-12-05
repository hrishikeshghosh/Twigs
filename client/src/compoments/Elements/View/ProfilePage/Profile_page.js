import React, { useEffect, useState } from 'react'
import { Avatar, Divider, Grow, LinearProgress } from '@material-ui/core'
import { useParams, useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import { fetchProfile } from '../../../../actions/profile'
import './style.css'
import TOKEN_DECODER from '../../../../Helper/TOKEN_DECODER'
import FANDF from '../../../atoms/FANDFBUTTONS/FANDF'
import DESIGNATION_SETTER from '../../../../Helper/DESIGNATION_SETTER'
import ProfileContents from '../../../atoms/ProfileContents/ProfileContents'
import TYPE from '../../../../Helper/TYPE'
import Designation from '../../../atoms/Designation/Designation'

const ProfilePage = ({ viewPost }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const [active, setActive] = useState(0)
  const [section, setSection] = useState(null)
  const userID = TOKEN_DECODER(
    JSON.parse(localStorage.getItem('profile'))?.token
  ).id

  const { profileData, blogs, arts, Loading } = useSelector(
    state => state.profile
  )

  useEffect(() => {
    dispatch(fetchProfile(id))
  }, [id, dispatch])

  useEffect(() => {
    if (TYPE() === 0) {
      setSection(0)
      setActive(0)
    } else {
      setSection(1)
      setActive(1)
    }
  }, [])

  if (Loading) {
    return (
      <div className='profile-page-root' style={{ height: '90vh' }}>
        <LinearProgress className='profile-page-loader' />;
      </div>
    )
  } else if (profileData) {
    return (
      <Grow in>
        <div className='profile-page-root'>
          <div className='profile-details-root'>
            <div className='profile-picture-holder'>
              <Avatar
                className='profile-page-profile-image'
                src={profileData?.imageUrl}
                style={{ height: '200px', width: '200px' }}
              />
            </div>
            <div className='profile-details-holder'>
              <div className='profile-name-box'>
                <h1 className='profile-name'>{profileData.name}</h1>
                {profileData.verified && (
                  <VerifiedUserIcon
                    className='profilepage-verified-badge'
                    style={{ color: '#3C8DAD' }}
                  />
                )}
                <div className='profile-interaction-box'>
                  <div className='profile-interaction-box-left'>
                    {profileData?._id === userID ? (
                      <button
                        className='profile-edit-button'
                        onClick={e => {
                          e.preventDefault()
                          history.push(`/profile/edit/${profileData._id}`)
                        }}
                      >
                        <i
                          className='fas fa-user-edit'
                          style={{ color: 'whiteSmoke', fontSize: '0.8rem' }}
                        ></i>
                        <p className='interaction-state'>Edit Profile</p>
                      </button>
                    ) : (
                      <div className='fandf-container'>
                        <FANDF
                          followers={profileData?.followers}
                          userID={userID}
                          postID={id}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='profile-reach-box'>
                <div className='content-detail'>
                  <i
                    className='fas fa-folder-open'
                    style={{ color: 'rgb(141, 140, 140)', fontSize: '0.9rem' }}
                  ></i>

                  <p className='content-text'>contents</p>

                  <p className='content-number'>
                    {profileData.contents.length}
                  </p>
                </div>
                <div className='followers-detail'>
                  <i
                    className='fas fa-star'
                    style={{ color: 'rgb(141, 140, 140)', fontSize: '0.9rem' }}
                  ></i>

                  <p className='followers-text'> followers</p>
                  <p className='followers-number'>
                    {' '}
                    {profileData.followers.length}
                  </p>
                </div>
                <div className='following-detail'>
                  <i
                    className='fas fa-user-friends'
                    style={{ color: 'rgb(141, 140, 140)', fontSize: '0.9rem' }}
                  ></i>
                  <p className='following-text'>following</p>

                  <p className='following-number'>
                    {' '}
                    {profileData.following.length}
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  color: 'black'
                }}
              >
                Role:
              </p>
              <p className='profile-role'>{profileData?.role}</p>
              <div className='profile-description-box'>
                <p
                  style={{
                    fontFamily:
                      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    color: 'black'
                  }}
                >
                  About:
                </p>
                <p className='profile-description'>
                  {profileData?.profileDesc}
                </p>
              </div>
              <p
                style={{
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  color: 'black'
                }}
              >
                Designation:
              </p>
              <div className='designation-detail'>
                <Designation
                  size='5rem'
                  designation={profileData.designation}
                />
                <p className='designation-text'>{profileData.designation}</p>
              </div>
            </div>
          </div>
          <Divider style={{ margin: '2% 10% 0 10%' }} />
          <div className='post-type-router-box'>
            <button
              className={`tablink ${active === 0 && 'active-tab'}`}
              onClick={e => {
                e.preventDefault()
                sessionStorage.setItem('_s', 0)
                setActive(0)
                setSection(0)
              }}
            >
              <i className='fas fa-pen-nib' style={{ fontSize: '0.9rem' }}></i>
              <p style={{ margin: '0 8%' }}>blogs</p>
            </button>
            <button
              className={`tablink ${active === 1 && 'active-tab'}`}
              onClick={e => {
                e.preventDefault()
                sessionStorage.setItem('_s', 1)
                setActive(1)
                setSection(1)
              }}
            >
              <i className='fas fa-palette' style={{ fontSize: '0.9rem' }}></i>
              <p style={{ margin: '0 8%' }}>arts</p>
            </button>
          </div>
          {profileData.contents.length ? (
            <ProfileContents
              contents={section === 0 ? blogs : arts}
              section={section}
            />
          ) : (
            <div
              style={{
                width: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <i className='fi-sr-browser'></i>
              <h1 className='no-post-text'>No post</h1>
            </div>
          )}
        </div>
      </Grow>
    )
  } else {
    return (
      <div className='profile-page-root' style={{ height: '90vh' }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)'
          }}
        >
          <i className='fas fa-exclamation-triangle'></i>
          <h1> Profile Not found!</h1>
        </div>
      </div>
    )
  }
}

export default ProfilePage
