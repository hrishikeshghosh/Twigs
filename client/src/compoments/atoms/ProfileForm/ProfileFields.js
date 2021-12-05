import React from 'react'
import { IconButton } from '@material-ui/core'
const ProfileFields = props => {
  return (
    <div className='profile-field-root'>
      <div className='profile-field-label-box'>
        <p className='profile-field-label'>{props.label}:</p>
      </div>
      <div className='profile-field-input-box'>
        {props.name === 'bio' ? (
          <textarea
            className='profile-field-input'
            name={props.name}
            onChange={props.handleChange}
            type={props.type}
            required={props.required}
            defaultValue={props.defaultValue}
            placeholder={props.placeholder}
            cols={40}
            rows={8}
          />
        ) : props.name === 'password' ? (
          <>
            {' '}
            <input
              className='profile-field-input'
              name={props.name}
              onChange={props.handleChange}
              type={props.type}
              required={props.required}
                defaultValue={props.defaultValue}
                placeholder={props.placeholder}
            />
            <IconButton
              onClick={e => props.togglePasswordVisibility(e)}
              style={{ fontSize: '0.9rem', padding: '0' }}
            >
              {props.type === 'password' ? (
                <i className='far fa-eye-slash'></i>
              ) : (
                <i className='far fa-eye'></i>
              )}
            </IconButton>
          </>
        ) : (
          <input
            className='profile-field-input'
            name={props.name}
            onChange={props.handleChange}
            type={props.type}
            required={props.required}
            defaultValue={props.defaultValue}
          />
        )}
      </div>
    </div>
  )
}

export default ProfileFields
