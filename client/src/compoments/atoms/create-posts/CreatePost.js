import React from 'react'
import { Avatar } from '@material-ui/core'
import { Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './style.css'

function CreatePost (props) {
  const user = JSON.parse(localStorage.getItem('profile'))
  const openWorkstation = e => {
    e.preventDefault()
    props.setisDisplayed('visible')
  }

  return (
    <div>
      {user ? (
        <div className='create-post'>
          <div className='create-post-sub-1'>
            <Avatar
              className='create-post-avatar'
              src={user?.result?.imageUrl}
              style={{
                height: '2.0rem',
                width: '2.0rem'
              }}
            />
            <div className='twig-box' onClick={e => openWorkstation(e)}>
              <p>Create a new twig</p>
            </div>
          </div>
          <Divider className='create-post-divider' style={{ margin: '5%' }} />
          <div className='create-post-sub-2'>
            <button
              className='write-button create-post-button'
              onClick={e => openWorkstation(e)}
            >
              <i className='fas fa-pen-alt cp-icon'></i>
              <p className='cp-button-name'>Write</p>
            </button>
            <div
              style={{
                height: 'inherit',
                width: '1px',
                backgroundColor: 'rgb(185, 185, 185)'
              }}
            ></div>
            <button className='paint-button create-post-button'>
              <i className='fas fa-paint-brush cp-icon'></i>
              <p className='cp-button-name'>Paint</p>
            </button>
          </div>
        </div>
      ) : (
        <div className='create-post'>
          <h4 className='create-post-sign-in-test'>Please Sign in to Branch</h4>
          <Link to='/auth'>
            <button className='create-post-sign-in-button'>Sign in</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default CreatePost
