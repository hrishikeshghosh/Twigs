import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import TEXTENCODER from '../../../Helper/TEXT_ENCODER'
import TEXTDECODER from '../../../Helper/TEXT_DECODER'
import { createPost, updatePost } from '../../../actions/posts'
import { IconButton, Avatar, Divider, MenuItem } from '@material-ui/core'

import CachedIcon from '@material-ui/icons/Cached'
import ClearIcon from '@material-ui/icons/Clear'

import CancelIcon from '@material-ui/icons/Cancel'

import './style.css'
import AlertToast from '../../atoms/FormToast/AlertToast'

const BUCKETAPI = axios.create({
  baseURL: 'https://twigs-bucket.herokuapp.com/'
})

const initialData = {
  title: '',
  content: '',
  media: null,
  tags: ''
}

function Form (props) {
  const node = useRef()
  const dispatch = useDispatch()
  const [formSection, setFormSection] = useState(
    JSON.parse(sessionStorage.getItem('_s'))
  )
  const [postImage, setpostImage] = useState(null)
  const [formData, setFormData] = useState(initialData)
  const [media, setMedia] = useState(null)
  const [showDraftToast, setDraftToast] = useState(false)
  const userData = JSON.parse(localStorage.getItem('profile'))
  const editPost = useSelector(state =>
    props.contentID.id
      ? props.contentID.type === 0
        ? state.posts.blogs.find(
            selectedPost => selectedPost?._id === props.contentID.id
          )
        : state.posts.arts.find(
            selectedPost => selectedPost?._id === props.contentID.id
          )
      : null
  )

  useEffect(() => {
    if (props.isDisplayed === 'visible') {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [props.isDisplayed])

  useEffect(() => {
    if (editPost) {
      props.setisDisplayed('visible')
      setFormSection(JSON.parse(sessionStorage.getItem('_s')))
      setFormData({
        ...editPost,
        tags: editPost?.tags.join(' '),
        content: TEXTDECODER(editPost?.content)
          .map(each => each.props.children)
          .join('')
      })
      setpostImage(editPost?.media)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editPost])

  useEffect(() => {
    if (!showDraftToast) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDraftToast])

  const handlePostButtonAbility = () => {
    if (formSection === 1) {
      if (
        formData.content === '' ||
        postImage === null ||
        formData.title === ''
      ) {
        return true
      } else {
        return false
      }
    } else {
      if (formData.title === '' || formData.content === '') {
        return true
      } else {
        return false
      }
    }
  }

  const handlesection = e => {
    e.preventDefault()
    if (formSection === 0) {
      setFormSection(1)
    } else {
      setFormSection(0)
    }
  }

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return
    }

    props.setisDisplayed('hidden')
    // clearForm();
    // setpostImage(null);
  }

  const ENCODEIMAGE = async file => {
    setMedia(file)
    if (file) {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        setpostImage(reader.result)
        // setFormData({ ...formData, media: reader.result });
      }
      reader.onerror = function (error) {}
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (props.contentID.id) {
      console.log(props.contentID.id)
      if (media) {
        const mediaData = new FormData()
        mediaData.append('media', media)
        await BUCKETAPI.patch(
          `https://twigs-bucket.herokuapp.com/post_media`,
          mediaData
        ).then(result => {
          dispatch(
            updatePost(
              props.contentID.id,
              {
                ...formData,
                type: formSection,
                creatorName: userData?.result?.name,
                creatorImage: userData?.result?.imageUrl,
                creatorRole: userData?.result?.role,
                content: TEXTENCODER(formData?.content),
                media: result?.data?.downloadable_Link
              },
              formSection
            )
          )
        })
      } else {
        dispatch(
          updatePost(
            props.contentID.id,
            {
              ...formData,
              type: formSection,
              creatorName: userData?.result?.name,
              creatorImage: userData?.result?.imageUrl,
              creatorRole: userData?.result?.role,
              content: TEXTENCODER(formData?.content)
            },
            formSection
          )
        )
      }
    } else {
      if (media) {
        const mediaData = new FormData()
        mediaData.append('media', media)
        BUCKETAPI.post(
          `https://twigs-bucket.herokuapp.com/post_media`,
          mediaData
        ).then(result => {
          dispatch(
            createPost(
              {
                ...formData,
                type: formSection,
                media: result?.data?.data,
                creatorName: userData?.result?.name,
                creatorImage: userData?.result?.imageUrl,
                creatorRole: userData?.result?.role
              },
              formSection,
              mediaData
            )
          )
        })
      } else {
        console.log(formData)
        dispatch(
          createPost(
            {
              ...formData,
              type: formSection,
              creatorName: userData?.result?.name,
              creatorImage: userData?.result?.imageUrl,
              creatorRole: userData?.result?.role,
              media: null
            },
            formSection
          )
        )
      }
    }
    clearForm()
  }

  const clearForm = () => {
    console.log('clearing form')
    props.setContentID({ id: null, type: 0 })
    setpostImage(null)
    setMedia(null)
    document.getElementsByClassName('form-content-area')[0].value = ''
    // document.querySelector(".form-content-area").setAttribute("value", "");
    setFormData({ title: '', content: '', media: null, tags: '' })
    props.setisDisplayed('hidden')
  }

  const AskDraft = () => {
    if (formData.content !== '') {
      setDraftToast(true)
    } else {
      clearForm()
    }
  }

  return (
    <div>
      {showDraftToast && (
        <AlertToast
          message='Do you want to Discard this Post?'
          pos='Continue Editing'
          neg='Discard Post'
          setAlertAction={clearForm}
          dispatch_action={false}
          showALertBox={setDraftToast}
        />
      )}
      <div className='form' style={{ visibility: props.isDisplayed }}>
        <form
          autoComplete='off'
          noValidate
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
          <div ref={node} className='form-root'>
            <div className='form-header'>
              <h4 className='form-title'>Create a twig</h4>
              <IconButton
                onClick={e => {
                  e.preventDefault()
                  // props.setisDisplayed("hidden");
                  AskDraft()
                }}
              >
                <ClearIcon />
              </IconButton>
            </div>
            <Divider />
            <div className='form-body'>
              <div className='creator-box'>
                <Avatar
                  src={userData?.result?.imageUrl}
                  className='creator-avatar'
                />
                <div className='creator-sub-box'>
                  <h4 className='creator-username'>{userData?.result?.name}</h4>
                  <h5 className='creator-role'>{userData?.result.role}</h5>
                </div>
                <div
                  className='form-select-post-type'
                  type='button'
                  onClick={e => handlesection(e)}
                >
                  <p
                    style={{
                      fontFamily: "'Open Sans',-apple-system",
                      fontWeight: 900,
                      fontSize: '1.0rem'
                    }}
                  >
                    {formSection === 0 ? 'Blog' : 'Art'}
                  </p>
                  <CachedIcon style={{ margin: '0 2% 0 2%' }} />
                </div>
              </div>
              <div className='form-text-box'>
                <div className='form-title-holder'>
                  <input
                    className='form-title-area'
                    placeholder='Title'
                    required={true}
                    value={formData.title}
                    onChange={e => {
                      setFormData({ ...formData, title: e.target.value })
                    }}
                  />
                </div>
                <textarea
                  id='form-text-area'
                  className='form-content-area'
                  placeholder={
                    formSection === 0
                      ? 'Create a twig in the divine tree of art'
                      : 'Caption your art (max 200 characters)'
                  }
                  rows={12}
                  maxLength={formSection === 1 && 200}
                  required={true}
                  defaultValue={formData.content}
                  onChange={e => {
                    setFormData({
                      ...formData,
                      content: TEXTENCODER(e.target.value)
                    })
                  }}
                />

                <div className='form-footer-area'>
                  <input
                    className='form-tags'
                    placeholder='place tags seperated by spaces'
                    value={formData.tags}
                    onChange={e => {
                      setFormData({
                        ...formData,
                        tags: e.currentTarget.value
                      })
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='form-footer'>
              <div
                className='form-image-container'
                style={
                  postImage !== null
                    ? { display: 'block' }
                    : { display: 'none' }
                }
              >
                <IconButton
                  className='cancel-img-button'
                  onClick={e => {
                    e.preventDefault()
                    setpostImage(null)
                    setMedia(null)
                  }}
                >
                  <CancelIcon />
                </IconButton>
                <img
                  className='selected-image'
                  src={postImage}
                  alt=''
                  style={
                    postImage === null
                      ? { display: 'none' }
                      : { display: 'block' }
                  }
                />
              </div>

              <div
                className='resource-box-root'
                onDragEnter={e => e.preventDefault()}
                onDragLeave={e => e.preventDefault()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  e.preventDefault()
                  ENCODEIMAGE(e.dataTransfer.files[0])
                }}
              >
                <div className='resource-box'>
                  <p>Drag images here or</p>
                  <label htmlFor='image_input'>
                    <h4 className='browse-btn'>browse</h4>
                  </label>
                </div>

                <input
                  id='image_input'
                  type='file'
                  accept='image/*'
                  onChange={e => ENCODEIMAGE(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>
              <button
                className='post-button'
                type='submit'
                disabled={handlePostButtonAbility()}
              >
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form
