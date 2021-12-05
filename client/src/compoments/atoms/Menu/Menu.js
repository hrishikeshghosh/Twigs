import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Divider } from '@material-ui/core'
import USERDATA from '../../../Helper/USERDATA'
import TOKEN_DECODER from '../../../Helper/TOKEN_DECODER'
import {
  CLOSE_EMAIL_BOX,
  LOGOUT,
  OPEN_EMAIL_BOX
} from '../../../constants/actionTypes'
import { useSelector } from 'react-redux'
import './style.css'

function Rating ({ setSection }) {
  const userData = USERDATA()
  const userID = TOKEN_DECODER(userData?.token)?.id
  const history = useHistory()
  const dispatch = useDispatch()
  const { Open } = useSelector(state => state.emailbox)

  const handleEmailBox = e => {
    e.preventDefault()
    if (Open) {
      dispatch({ type: CLOSE_EMAIL_BOX })
    } else {
      dispatch({ type: OPEN_EMAIL_BOX })
    }
  }

  const logout = e => {
    e.preventDefault()
    dispatch({ type: LOGOUT })
    history.replace('/auth')
  }

  return (
    <div className='menu-box-root'>
      <div
        className='menu-routes'
        onClick={e => {
          e.preventDefault()
          history.push(`/profile/${userID}`)
        }}
      >
        <i className='fas fa-user-circle sidebar-icon'></i>
        <p className='nest-route sidebar-text'>My Nest</p>
      </div>
      <div
        className='menu-routes'
        onClick={e => {
          e.preventDefault()
          setSection(2)
          history.push('/Home/library')
        }}
      >
        <i className='fas fa-box sidebar-icon'></i>
        <p className='nest-route sidebar-text'>My Library</p>
      </div>

      <div className='menu-routes' onClick={e => logout(e)}>
        <i className='fas fa-power-off sidebar-icon'></i>
        <p className='nest-route sidebar-text'>Log Out</p>
      </div>
      <Divider style={{ margin: '8px' }} />
      <div className='menu-routes' onClick={e => handleEmailBox(e)}>
        <i className='fas fa-question-circle sidebar-icon'></i>
        <p className='nest-route sidebar-text'>Help</p>
      </div>
      <div className='menu-routes' onClick={e => handleEmailBox(e)}>
        <i className='fas fa-star-half-alt sidebar-icon'></i>
        <p className='nest-route sidebar-text'>Feedback</p>
      </div>
      <div className='menu-routes' onClick={e => handleEmailBox(e)}>
        <i className='fas fa-bug sidebar-icon'></i>
        <p className='nest-route sidebar-text'>Report Problem</p>
      </div>
    </div>
  )
}

export default Rating
