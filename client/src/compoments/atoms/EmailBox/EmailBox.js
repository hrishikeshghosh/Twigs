import React, { useState, useEffect } from 'react'
import emailjs from 'emailjs-com'
import './style.css'
import { Divider, IconButton, LinearProgress } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_EMAIL_BOX } from '../../../constants/actionTypes'
import USERDATA from '../../../Helper/USERDATA'
import TOKEN_DECODER from '../../../Helper/TOKEN_DECODER'
import { EMAILAPI } from '../../../actions/support'

const EmailBox = () => {
  const { Open } = useSelector(state => state.emailbox)
  const dispatch = useDispatch()
  const userData = USERDATA()
  const [ApiData, setApiData] = useState(null)
  const token = TOKEN_DECODER(userData?.token)

  const [formDetails, setFormDetails] = useState({
    user_name: '',
    user_email: token?.email,
    message: ''
  })

  useEffect(() => {
    const callApi = async () => {
      const data = await dispatch(EMAILAPI())
      setApiData(data)
    }

    callApi()
  }, [dispatch])

  const sendEmail = e => {
    e.preventDefault()
    emailjs.init(ApiData.email_user_id)
    emailjs
      .send(ApiData.email_service_ID, ApiData.email_template_id, formDetails)
      .then(() => {
        dispatch({ type: CLOSE_EMAIL_BOX })
        alert('Message Sent!')
      })
      .catch(err => console.log(err))
  }

  return (
    <div
      className='email-box-root'
      style={
        Open
          ? { transform: 'translateY(0%)', opacity: '100%' }
          : { transform: 'translateY(-150%)', opacity: 0 }
      }
    >
      <div className='email-box-header'>
        <h2
          style={{ textAlign: 'justified', flexGrow: 1, margin: '0 5% 0 5%' }}
        >
          Communicate With us!
        </h2>
        <IconButton
          onClick={e => {
            e.preventDefault()
            dispatch({ type: CLOSE_EMAIL_BOX })
          }}
          style={{ margin: '0 2% 0 2%', color: 'white', padding: 0 }}
        >
          <ClearIcon />
        </IconButton>
      </div>
      <form onSubmit={sendEmail}>
        <div className='email-box-body'>
          <div className='receiver-box'>
            <p
              style={{
                textAlign: 'left',
                fontFamily: "'Open Sans', -apple-system",
                fontWeight: 900,
                color: 'grey'
              }}
            >
              To:
            </p>
            <p
              style={{
                marginLeft: '5%',
                textAlign: 'left',
                flexGrow: 1,
                fontFamily: "'Open Sans', -apple-system",
                fontWeight: 900,
                color: 'grey'
              }}
            >
              Twigs Administration
            </p>
          </div>
          <Divider style={{ margin: '16px' }} />

          <div className='sender-box'>
            <p
              style={{
                textAlign: 'left',
                fontFamily: "'Open Sans', -apple-system",
                fontWeight: 900,
                color: 'grey'
              }}
            >
              From:
            </p>
            <p
              style={{
                marginLeft: '5%',
                textAlign: 'left',
                flexGrow: 1,
                fontFamily: "'Open Sans', -apple-system",
                fontWeight: 900,
                color: 'grey'
              }}
            >
              {token?.email}
            </p>

            {/* <input
              style={{ display: 'none' }}
              name='user_email'
              value={formDetails.user_email}
              onChange={e =>
                setFormDetails({ ...formDetails, user_email: e.target.value })
              }
            /> */}
          </div>

          <div className='text-area-box'>
            <textarea
              name='message'
              className='email-box-text-area'
              placeholder='Communicate with us'
              rows={12}
              value={formDetails.message}
              onChange={e =>
                setFormDetails({ ...formDetails, message: e.target.value })
              }
            />
          </div>
          <div style={{ padding: '16px' }}>
            <button
              className='email-box-button'
              type='submit'
              disabled={formDetails.message === '' ? true : false}
              style={
                formDetails.message === ''
                  ? {
                      backgroundColor: 'rgb(95, 94, 94)'
                    }
                  : {
                      backgroundColor: 'black'
                    }
              }
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EmailBox
