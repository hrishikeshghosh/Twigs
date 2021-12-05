import React, { useEffect, useState } from 'react'
import JWTdecode from 'jwt-decode'
import {
  LOGOUT,
  MENU_OPEN,
  SUCCESS_MESSAGE
} from '../../../constants/actionTypes'
import logo from '../../../images/TwigsLogo.png'
import { Avatar, IconButton } from '@material-ui/core'
import AppbarMenu from '../../atoms/AppbarMenu/AppbarMenu'
import SearchIcon from '@material-ui/icons/Search'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import NotificationsIcon from '@material-ui/icons/Notifications'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import USERDATA from '../../../Helper/USERDATA'
import { searchPosts } from '../../../actions/feed'

const AppBar = ({ setsection, section }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const userData = USERDATA()
  const token = userData?.token
  const [background, setBackground] = useState(true)
  const [isFullScreen, setisFullScreen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [search, setSearch] = useState('')
  const [userID, setUserID] = useState(null)

  const BringMenu = () => {
    dispatch({ type: MENU_OPEN })
  }

  useEffect(() => {
    if (section === 1) {
      setActiveTab(1)
    } else {
      setActiveTab(0)
    }
  }, [section])

  useEffect(() => {
    if (!background) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [background])

  useEffect(() => {
    const screenWidth = window.innerWidth

    if (screenWidth <= 720) {
      setisFullScreen(false)
    } else {
      setisFullScreen(true)
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('profile') === null) {
      logout()
    }
  })

  useEffect(() => {
    if (token) {
      const decoded = JWTdecode(token)
      setUserID(decoded.id)
      if (decoded.exp * 1000 < new Date().getTime()) {
        logout()
      }
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const initiateSearch = async () => {
    if (search.trim()) {
      dispatch(searchPosts(search))
    }
  }

  const pressenterKey = e => {
    if (e.keyCode === 13) {
      initiateSearch()
      history.push(`/Home/search?query=${search}`)
    }
  }

  const logout = () => {
    dispatch({ type: LOGOUT })
    setUserID(null)
    history.push('/auth')
  }

  return (
    <div className='appbar-root'>
      <header className='appbar'>
        {/* LEFT COMPONENT */}
        <div className='left-component'>
          <div className='brand'>
            <h2 className='brand-name'>twigs</h2>
            <img className='img-logo' src={logo} alt='logo' />
            <p className='version-name'>V.0 BETA</p>
          </div>
          <div className='right-subdivision-left'>
            <button
              className={`navlink ${activeTab === 0 && 'active'}`}
              onClick={e => {
                e.preventDefault()
                setActiveTab(0)
                setsection(0)
                sessionStorage.setItem('_s', 0)
                history.push('/')
              }}
            >
              <i className='fas fa-pen-nib navicon'></i>
              <p style={{ marginTop: '2%' }}>Blogs</p>
            </button>
            <button
              className={`navlink ${activeTab === 1 && 'active'}`}
              onClick={e => {
                e.preventDefault()
                setActiveTab(1)
                setsection(1)
                sessionStorage.setItem('_s', 1)
                history.push('/Home/arts')
              }}
            >
              <i className='fas fa-palette navicon'></i>
              <p style={{ marginTop: '2%' }}>Arts</p>
            </button>{' '}
          </div>
        </div>
        {/* RIGHT COMPONENT */}

        <div className='right-component'>
          <div className='search-box'>
            <SearchIcon style={{ color: 'grey' }} />
            <input
              className='search-input'
              type='text'
              placeholder='Search Twigs'
              onKeyDown={pressenterKey}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className='right-subdivision-right'>
            <button
              className='notification-button navlink'
              onClick={e => {
                e.preventDefault()
                dispatch({
                  type: SUCCESS_MESSAGE,
                  message: 'Feature Coming Soon!',
                  status: 100
                })
              }}
            >
              <NotificationsIcon className='navicon' />
            </button>
            {userData ? (
              <div
                className='appbar-avatar-box'
                style={{ cursor: 'pointer' }}
                onClick={e => BringMenu(e)}
              >
                <Avatar
                  className='appbar-avatar'
                  src={userData?.result?.imageUrl}
                  alt={userData?.result?.name}
                  style={{ height: '35px', width: '35px' }}
                />
              </div>
            ) : isFullScreen ? (
              <button
                className='account-button navlink'
                onClick={e => {
                  e.preventDefault()
                  history.push('/auth')
                }}
              >
                <AccountCircleIcon className='navicon' />
                <p style={{ fontSize: '0.7rem', width: '100%' }}>Sign in</p>
              </button>
            ) : (
              <IconButton
                className='mobile-signin-btn'
                onClick={e => {
                  e.preventDefault()
                  history.push('/auth')
                }}
              >
                <MeetingRoomIcon />
              </IconButton>
            )}
          </div>
        </div>
      </header>
      {/* {menuVisible && (
          <div className="right-nav-box">
            <AppbarMenu translate={0} BringMenu={BringMenu} />
          </div>
        )} */}
    </div>
  )
}

export default AppBar
