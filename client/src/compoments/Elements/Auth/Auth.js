import React, { useState } from 'react'
import Fields from './Fields'
import FaceRoundedIcon from '@material-ui/icons/FaceRounded'
import EmailRoundedIcon from '@material-ui/icons/EmailRounded'
import LockRoundedIcon from '@material-ui/icons/LockRounded'
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded'
import { LinearProgress } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../../images/TwigsLogo.png'
import { signin, signup } from '../../../actions/auth'
import './style.css'

const initialData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Auth = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  let errors = useSelector(state => state.error)
  const { Loading } = useSelector(state => state.auth)
  const [isSignup, setisSignup] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [formData, setFormData] = useState(initialData)

  const handleSubmit = e => {
    e.preventDefault()
    if (isSignup) {
      dispatch(signup(formData, history))
    } else {
      dispatch(signin(formData, history))
    }
  }

  const handleAuthchange = e => {
    e.preventDefault()
    setisSignup(prevState => !prevState)
  }

  const handlepasswordToggle = e => {
    e.preventDefault()
    setPasswordVisible(prevState => !prevState)
  }

  return (
    <div className='auth_root'>
      <div className='sign-up-bg'>
        <div className='auth-box-root'>
          <div className='auth-box-container'>
            {errors && (
              <div className='auth-error-box'>
                <div className='auth-error-icon'>
                  <ErrorOutlineRoundedIcon style={{ color: 'white' }} />
                </div>
                <div className='auth-error-detail'>
                  <h5 className='auth-error-heading'>Authentication Error</h5>
                  <p className='auth-error-desc'>{errors}</p>
                </div>
              </div>
            )}

            <div className='auth-box'>
              <div className='auth-style-box'>
                <h2 className='auth-header-text'>
                  <img className='auth-app-logo' src={logo} alt='logo'></img>
                  {isSignup
                    ? 'Get Started With Twigs'
                    : 'Login To Your Account'}
                </h2>
                <p className='auth-header-intro'>
                  Let's start twigging in some branches of art
                </p>
              </div>
              <form
                style={{ padding: '32px 16px 0px 16px' }}
                onSubmit={handleSubmit}
              >
                {isSignup && (
                  <Fields
                    name='fullName'
                    placeholder='Full Name'
                    handleChange={e =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    type='text'
                    icon={FaceRoundedIcon}
                  />
                )}

                <Fields
                  name='email'
                  placeholder='Email'
                  handleChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  type='email'
                  icon={EmailRoundedIcon}
                />
                <Fields
                  name='password'
                  placeholder='Password'
                  handleChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  type={passwordVisible ? 'text' : 'password'}
                  togglePasswordVisibility={handlepasswordToggle}
                  icon={LockRoundedIcon}
                />
                {isSignup && (
                  <>
                    <Fields
                      name='confirmPassword'
                      placeholder='Confirm Password'
                      handleChange={e =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value
                        })
                      }
                      type='password'
                      icon={LockRoundedIcon}
                    />
                    <p className='pasword-authenticator-text'>
                      use minimum of 8 characters with a mix of numbers,
                      alphabets and symbols
                    </p>
                  </>
                )}

                {Loading ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LinearProgress
                      style={{ width: '40%', alignSelf: 'center' }}
                    />
                  </div>
                ) : (
                  <button className='jwt-auth-button' type='submit'>
                    {isSignup ? 'Get Started' : 'Sign in'}
                  </button>
                )}

                <div className='auth-switcher'>
                  <p className='auth-switcher-header'>
                    {isSignup
                      ? 'Already have an account?'
                      : 'Do not have an account?'}
                  </p>
                  <p
                    className='auth-switcher-link'
                    onClick={e => handleAuthchange(e)}
                  >
                    {isSignup ? 'Login' : 'Sign up'}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
