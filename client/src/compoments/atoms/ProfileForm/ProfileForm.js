import React, { useState } from 'react'
import BucketApi from '../../../Helper/BUCKET_API'
import { Avatar, Divider } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import {
  setProfile,
  updatePassword,
  deleteAccount
} from '../../../actions/profile'
import ImageSearchIcon from '@material-ui/icons/ImageSearch'
import InputField from './ProfileFields'
import TOKEN_DECODER from '../../../Helper/TOKEN_DECODER'
import './style.css'
import { SUCCESS_MESSAGE } from '../../../constants/actionTypes'

const initialPasswordValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
}

const ProfileForm = () => {
  const userData = JSON.parse(localStorage.getItem('profile'))
  const [newdata, setNewData] = useState(userData?.result)
  const [password, setPassword] = useState(initialPasswordValues)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [profileImage, setprofileImage] = useState(newdata.imageUrl)
  const [profileMedia, setProfileMedia] = useState(null)
  const { error, passwordSuccess } = useSelector(state => state.profile)
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const handleChange = () => {}

  const ENCODEIMAGE = async e => {
    if (e.target.files[0]) {
      var reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = function () {
        setprofileImage(reader.result)
        setProfileMedia(e.target.files[0])
        // setNewData({ ...newdata, imageUrl: reader.result });
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    }
  }

  const handleInformationSubmit = async e => {
    e.preventDefault()

    if (profileMedia) {
      const mediaData = new FormData()
      mediaData.append('uid', id)
      mediaData.append('profile', profileMedia)
      await BucketApi.post('/profile_image_media', mediaData).then(result => {
        dispatch(
          setProfile(id, {
            ...newdata,
            imageUrl: result?.data?.data
          })
        )
      })
    } else {
      dispatch(setProfile(id, newdata))
    }
    history.replace('/Home/blogs')
  }

  const handlePasswordSubmit = e => {
    dispatch(updatePassword(id, password))
    setPassword(initialPasswordValues)
  }

  const HandledeleteAccount = async e => {
    dispatch(deleteAccount(id))
    history.replace('/auth')
  }

  return (
    <div className='profile-form-root'>
      <div className='profile-form-container'>
        <h2 className='profile-form-headings'>Profile Image</h2>
        <div className='profile-form-image-box'>
          <Avatar
            className='profile-form-avatar'
            src={profileImage}
            style={{
              height: '200px',
              width: '200px'
            }}
          />
          <div>
            <label htmlFor='profile_image_selector'>
              <div className='profile-image-button'>
                <ImageSearchIcon />
                Choose Image
              </div>
            </label>
            <input
              id='profile_image_selector'
              type='file'
              accept='image/*'
              onChange={ENCODEIMAGE}
              style={{ display: 'none' }}
            />
            <p
              style={{
                fontFamily: "'Open Sans', -apple-system",
                fontSize: '0.8rem',
                fontWeight: '900',
                color: 'gray'
              }}
            >
              Choose an image to change your profile picture
            </p>
          </div>
        </div>
        <h2 className='profile-form-headings'>Profile Information</h2>
        <div className='profile-form-information-box'>
          <InputField
            label='Name'
            name='name'
            defaultValue={newdata.name}
            handleChange={e => setNewData({ ...newdata, name: e.target.value })}
            type='text'
            required={false}
            placeholder='Change Your Name'
          />
          <InputField
            label='Role'
            name='role'
            placeholder='Tag yourself Unique'
            defaultValue={newdata.role}
            handleChange={e => setNewData({ ...newdata, role: e.target.value })}
            type='text'
            required={false}
          />
          <InputField
            label='Email'
            name='email'
            placeholder='Change Your Email'
            defaultValue={TOKEN_DECODER(userData?.token).email}
            handleChange={handleChange}
            type='email'
            required={false}
          />
          <InputField
            label='Bio'
            name='bio'
            placeholder='Write Something About Yourself'
            defaultValue={newdata.profileDesc}
            handleChange={e =>
              setNewData({ ...newdata, profileDesc: e.target.value })
            }
            type='text'
            required={false}
          />
          <div className='profile-form-information-footer'>
            <button
              className='edit-profile-button'
              onClick={handleInformationSubmit}
            >
              Commit Detail Changes
            </button>
          </div>
        </div>
        <h2 className='profile-form-headings'>Password Information</h2>
        <div className='profile-form-password-box'>
          <InputField
            label='Old PassWord'
            name='password'
            defaultValue={password.oldPassword}
            handleChange={e =>
              setPassword({ ...password, oldPassword: e.target.value })
            }
            type={passwordVisible ? 'text' : 'password'}
            required={false}
            togglePasswordVisibility={() =>
              setPasswordVisible(prevState => !prevState)
            }
          />
          <InputField
            label='new Password'
            name='password'
            defaultValue={password.newPassword}
            handleChange={e =>
              setPassword({ ...password, newPassword: e.target.value })
            }
            type={passwordVisible ? 'text' : 'password'}
            required={false}
            togglePasswordVisibility={() =>
              setPasswordVisible(prevState => !prevState)
            }
          />
          <InputField
            label='Confirm New Password'
            name='confirmPassword'
            defaultValue={password.confirmPassword}
            handleChange={e =>
              setPassword({ ...password, confirmPassword: e.target.value })
            }
            type='password'
            required={false}
          />
        </div>
        <div className='profile-form-password-footer'>
          <button
            className='edit-profile-button'
            onClick={handlePasswordSubmit}
          >
            Commit Password Change
          </button>

          {error && (
            <p className='profile-form-error-message'>&#10006;{error}</p>
          )}
          {passwordSuccess && (
            <p className='profile-form-success-message'>
              &#10004;{passwordSuccess}
            </p>
          )}
        </div>
        <h2 className='profile-form-headings'>Account Destruct Options</h2>
        <div className='profile-form-footer'>
          {/* <div className="profile-form-disable">
          <div className="profile-form-disable-title">
            <p style={{ fontWeight: "600" }}>
              Disable Your Account temporarily as we do not send you any
              notification and no process in your account get's accessed
              anywhere before your authentication. All your Data will be saved
              during this tenure
            </p>
            <br />
            <p style={{ fontWeight: "bolder", color: "red" }}>
              &#10033;Account Get'
              s deleted Automatically after 30 days of
              deactivation
            </p>
          </div>
          <div className="profile-form-disable-button">
            <button className="destruct-buttons">
              <p>Disable my account</p>
            </button>
          </div>
        </div> */}
          <Divider style={{ margin: '16px' }} />
          <div className='profile-form-delete'>
            <div className='profile-form-delete-title'>
              <p style={{ fontWeight: '600' }}>
                Delete your account permanantly and wipe all your works and
                data.
              </p>
              <br />
              <p style={{ fontWeight: 'bolder', color: 'red' }}>
                &#10033;Account cannot be revived anyhow
              </p>
            </div>
            <div className='profile-form-delete-button'>
              <button
                className='destruct-buttons'
                onClick={HandledeleteAccount}
              >
                <p>Delete my account</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm
