import React, { useState } from 'react'
import { IconButton } from '@material-ui/core'
import './style.css'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../../actions/posts'
import TYPE from '../../../Helper/TYPE'
import { addTolib } from '../../../actions/profile'

import AlertToast from '../FormToast/AlertToast'
const Menu = ({
  setContentID,
  postID,
  userID,
  creatorID,
  title,
  tags,
  author,
  type
}) => {
  const dispatch = useDispatch()
  const [postMenuOpen, setPostMenuOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  const initateButtonClick = e => {
    e.preventDefault()
    if (!postMenuOpen) {
      setPostMenuOpen(true)
    } else {
      setPostMenuOpen(false)
    }
  }

  const FireEditAction = e => {
    setPostMenuOpen(false)
    e.preventDefault()
    setContentID({ id: postID, type: type })
  }
  const FireDeleteAction = e => {
    e.preventDefault()
    setPostMenuOpen(false)
    setAlertOpen(true)
  }
  const FireLibAction = e => {
    setPostMenuOpen(false)
    e.preventDefault()
    const creds = { tags: tags, title: title, author: author }
    dispatch(addTolib(postID, creds))
  }

  return (
    <div>
      {alertOpen && (
        <AlertToast
          message='Do you want to delete the post?'
          pos='YES'
          neg='NO'
          dispatch_action={true}
          setAlertAction={deletePost(postID, TYPE())}
          showALertBox={setAlertOpen}
        />
      )}
      <div className='post-menu-root'>
        <div
          className={
            postMenuOpen ? 'post-menu-button open' : 'post-menu-button'
          }
          id='post-menu-button'
          onClick={e => initateButtonClick(e)}
        >
          <div className='post-menu-child'></div>

          {}
        </div>

        <div
          className='post-menu-options'
          style={postMenuOpen ? { zIndex: '2' } : { zIndex: '-1' }}
        >
          {creatorID === userID && (
            <div
              className='opt opt-1'
              style={
                postMenuOpen
                  ? {
                      transform: 'translate(0%)',
                      opacity: 100,
                      zIndex: 2
                    }
                  : {
                      transform: 'translate(-100%)',
                      opacity: 0,
                      zIndex: -1
                    }
              }
            >
              <IconButton
                className='post-menu-opt-btns'
                onClick={e => {
                  if (postMenuOpen) {
                    FireEditAction(e)
                  }
                }}
              >
                <i
                  className='far fa-edit '
                  style={{ fontSize: '1.0rem', color: 'white' }}
                ></i>
              </IconButton>
              <p className='opt-name'>Edit Post</p>
            </div>
          )}

          {creatorID === userID && (
            <div
              className='opt opt-2'
              style={
                postMenuOpen
                  ? { transform: 'translate(0%)', opacity: 100, zIndex: 2 }
                  : { transform: 'translate(-100%)', opacity: 0, zIndex: -1 }
              }
            >
              <IconButton
                className='post-menu-opt-btns '
                onClick={e => {
                  if (postMenuOpen) {
                    FireDeleteAction(e)
                  }
                }}
              >
                <i
                  className='fas fa-trash '
                  style={{ fontSize: '1.0rem', color: 'white' }}
                ></i>
              </IconButton>
              <p className='opt-name'>Delete Post</p>
            </div>
          )}

          <div
            className='opt opt-3'
            style={
              postMenuOpen
                ? { transform: 'translate(0%)', opacity: 100, zIndex: 2 }
                : { transform: 'translate(-100%)', opacity: 0, zIndex: -1 }
            }
          >
            <IconButton
              className='post-menu-opt-btns '
              onClick={e => {
                if (postMenuOpen) {
                  FireLibAction(e)
                }
              }}
            >
              <i
                className='fas fa-bookmark '
                style={{ fontSize: '1.0rem', color: 'white' }}
              ></i>
            </IconButton>
            <p className='opt-name'>Save Post</p>
          </div>

          <div
            className='opt opt-4'
            style={
              postMenuOpen
                ? { transform: 'translate(0%)', opacity: 100, zIndex: 2 }
                : { transform: 'translate(-100%)', opacity: 0, zIndex: -1 }
            }
          >
            <IconButton
              className='post-menu-opt-btns '
              // onClick={(e) => alert("123")}
            >
              <i
                className='far fa-flag '
                style={{ fontSize: '1.0rem', color: 'white' }}
              ></i>
            </IconButton>
            <p className='opt-name'>Report Problem</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
