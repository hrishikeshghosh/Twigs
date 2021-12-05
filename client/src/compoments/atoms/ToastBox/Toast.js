import { IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SUCCESS_MESSAGE } from '../../../constants/actionTypes'
import './style.css'

const Toast = () => {
  const dispatch = useDispatch()
  const { message, status } = useSelector(state => state.message)
  const [stat, setStat] = useState(null)

  const colorCodes = ['#50CB93', '#FF4848', '#3D84B8']
  const iconCodes = [
    'fa-check-circle',
    'fa-exclamation-circle',
    'fa-info-circle'
  ]

  useEffect(() => {
    const collapseToast = () => {
      setStat(null)
      dispatch({ type: SUCCESS_MESSAGE, message: '', status: null })
    }
    if (status === 200) {
      setStat(0)
      setTimeout(() => collapseToast(), 5000)
    } else if (status === 400) {
      setStat(1)
      setTimeout(() => collapseToast(), 5000)
    } else if (status === 100) {
      setStat(2)
      setTimeout(() => collapseToast(), 5000)
    } else {
      setStat(null)
    }
  }, [status, dispatch])

  const setIconAndColor = () => {
    switch (stat) {
      case 0:
        return {
          icon: iconCodes[0],
          color: colorCodes[0],
          classname: 'toast-success'
        }
      case 1:
        return {
          icon: iconCodes[1],
          color: colorCodes[1],
          classname: 'toast-error'
        }
      case 2:
        return {
          icon: iconCodes[2],
          color: colorCodes[2],
          classname: 'toast-info'
        }
      default:
        return {
          icon: iconCodes[0],
          color: colorCodes[0],
          classname: 'toast-success'
        }
    }
  }

  const closeToast = e => {
    e.preventDefault()
    setStat(null)
    dispatch({ type: SUCCESS_MESSAGE, message: '', status: null })
  }

  return (
    <div className='toast-pos-root'>
      <div
        className={`toast-root ${setIconAndColor().classname}`}
        style={
          stat !== null
            ? { transform: 'translateY(0%)', visibility: 'visible', opacity: 1 }
            : {
                transform: 'translateY(-100%)',
                visibility: 'collapse',
                opacity: 0
              }
        }
      >
        <IconButton
          className='close-toast-btn'
          onClick={e => closeToast(e)}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            color: 'rgb(189, 189, 189)'
          }}
        >
          <i className='fas fa-times'></i>
        </IconButton>
        <div className='toast-container'>
          <section className='toast-left'>
            <i
              className={`fas ${setIconAndColor().icon} stat-icon`}
              style={{ color: setIconAndColor().color }}
            ></i>
          </section>
          <div
            className='toast-divider'
            style={{ backgroundColor: setIconAndColor().color }}
          ></div>
          <section className='toast-right'>
            <div className='toast-details'>
              <p className='toast-heading'>{message}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Toast
