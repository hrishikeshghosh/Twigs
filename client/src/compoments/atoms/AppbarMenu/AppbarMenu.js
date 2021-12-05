import React, { useEffect, useRef, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import USERDATA from '../../../Helper/USERDATA'
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded'
import TOKEN_DECODER from '../../../Helper/TOKEN_DECODER'
import {
  CLOSE_EMAIL_BOX,
  LOGOUT,
  MENU_CLOSE,
  OPEN_EMAIL_BOX
} from '../../../constants/actionTypes'
import './style.css'

const AppbarMenu = ({ setSection }) => {
  const node = useRef()
  const userData = USERDATA()
  const userID = TOKEN_DECODER(userData?.token)?.id
  const history = useHistory()
  const dispatch = useDispatch()
  const { menu_state } = useSelector(state => state.menu)
  const [isFullScreen, setisFullScreen] = useState(false)
  const { Open } = useSelector(state => state.emailbox)

  useEffect(() => {
    const screenSize = window.innerWidth
    if (screenSize <= 900) {
      setisFullScreen(false)
    } else {
      setisFullScreen(true)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (menu_state) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [menu_state])

  const closeMenu = () => {
    dispatch({ type: MENU_CLOSE })
  }

  const logout = () => {
    dispatch({ type: LOGOUT })
    history.push('/auth')
  }

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return
    }
    closeMenu()
  }

  const handleEmailBox = e => {
    e.preventDefault()
    closeMenu()
    if (Open) {
      dispatch({ type: CLOSE_EMAIL_BOX })
    } else {
      dispatch({ type: OPEN_EMAIL_BOX })
    }
  }

  return (
    <div
      className={
        menu_state ? 'appbar-menu-background-active' : 'appbar-menu-background'
      }
    >
      <div
        className='appbar-menu-root'
        ref={node}
        style={
          menu_state
            ? { transform: 'translateX(0%)' }
            : { transform: 'translateX(100%)' }
        }
      >
        <div className='appbar-menu-profile'>
          <Avatar
            className='appbar-menu-avatar'
            src={userData?.result?.imageUrl}
            alt={userData?.result?.name}
          />
          <div style={{ flexGrow: 1, margin: '0 5% 0 5%' }}>
            <h5
              style={{
                fontFamily: "'Open Sans',-apple-system",
                fontSize: '1.1rem',
                fontWeight: 900,
                color: 'black',
                textAlign: 'center',
                marginLeft: '4%'
              }}
            >
              {userData?.result?.name}
            </h5>
            <p
              className='goto-nest-link'
              onClick={e => {
                e.preventDefault()
                history.push(`/profile/${userID}`)
                closeMenu()
              }}
            >
              Go to your nest
            </p>
          </div>
          <IconButton
            // style={{ color: "#2B2B2B" }}
            onClick={e => {
              e.preventDefault()
              closeMenu()
            }}
          >
            <ExpandLessRoundedIcon />
          </IconButton>
        </div>
        <div className='appbar-menu-goto-options'>
          {!isFullScreen && (
            <div className='appbar-menu-grp'>
              <p className='appbar-menu-grp-name'>Browse</p>
              <div
                className='appbar-menu-routes'
                onClick={e => {
                  e.preventDefault()
                  setSection(0)
                  history.push('/Home/blogs')
                  closeMenu()
                }}
              >
                <i className='fas fa-pen-nib appbar-sidebar-icon'></i>
                <p className='nest-route appbar-sidebar-text'>Blogs</p>
              </div>

              <div
                className='appbar-menu-routes'
                onClick={e => {
                  e.preventDefault()
                  setSection(1)
                  history.push('/Home/arts')
                  closeMenu()
                }}
              >
                <i className='fas fa-palette appbar-sidebar-icon'></i>
                <p className='nest-route appbar-sidebar-text'>Arts</p>
              </div>
            </div>
          )}
          <div className='appbar-menu-grp'>
            <p className='appbar-menu-grp-name'>Activity</p>
            <div
              className='appbar-menu-routes'
              onClick={e => {
                e.preventDefault()
                setSection(2)
                history.push('/Home/library')
                closeMenu()
              }}
            >
              <i className='fas fa-box appbar-sidebar-icon'></i>
              <p className='nest-route appbar-sidebar-text'>My Library</p>
            </div>

            <div
              className='appbar-menu-routes'
              onClick={e => {
                e.preventDefault()
                closeMenu()
                logout()
              }}
            >
              <i className='fas fa-power-off appbar-sidebar-icon'></i>
              <p className='nest-route appbar-sidebar-text'>Log Out</p>
            </div>
          </div>

          <div className='appbar-menu-grp'>
            <p className='appbar-menu-grp-name'>Support</p>
            <div
              className='appbar-menu-routes'
              onClick={e => handleEmailBox(e)}
            >
              <i className='fas fa-question-circle appbar-sidebar-icon'></i>
              <p className='nest-route appbar-sidebar-text'>Help</p>
            </div>
            <div
              className='appbar-menu-routes'
              onClick={e => handleEmailBox(e)}
            >
              <i className='fas fa-star-half-alt appbar-sidebar-icon'></i>
              <p className='nest-route appbar-sidebar-text'>Feedback</p>
            </div>
            <div
              className='appbar-menu-routes'
              onClick={e => handleEmailBox(e)}
            >
              <i className='fas fa-bug appbar-sidebar-icon'></i>
              <p className='nest-route appbar-sidebar-text'>Report Problem</p>
            </div>
          </div>
        </div>
        <div className='water-mark'>
          <p>Developed by Hrishikesh Ghosh</p>
        </div>
      </div>
    </div>
  )
}

export default AppbarMenu
