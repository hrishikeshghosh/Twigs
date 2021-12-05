import React from 'react'
import { IconButton } from '@material-ui/core'

const Fields = props => {
  return (
    <div className='auth-field-input-grid'>
      <props.icon className='auth-icons' />
      <input
        className='auth-field'
        name={props.name}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        type={props.type}
        required
      />
      {props.name === 'password' && (
        <IconButton onClick={e => props.togglePasswordVisibility(e)}>
          {props.type === 'password' ? (
            <i className='far fa-eye-slash'></i>
          ) : (
            <i className='far fa-eye'></i>
          )}
        </IconButton>
      )}
    </div>
  )
}

export default Fields
