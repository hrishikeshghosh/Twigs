import React from 'react'
import { Avatar } from '@material-ui/core'
import moment from 'moment'
import './style.css'
const VWeachreply = ({ name, profileImg, reply, date }) => {
  return (
    <div className='view-post-each-reply-root'>
      <section className='each-reply-header'>
        <div className='each-reply-header-left'>
          <Avatar className='each-reply-user-avatar' src={profileImg} />
          <div className='each-reply-user-name-box'>
            <p className='each-reply-user-name'>{name}</p>
            <p className='each-reply-user-role'>Creator</p>
          </div>
        </div>
        <div className='each-reply-header-right'>
          <p className='reply-at'>{moment(date).fromNow()}</p>
        </div>
      </section>
      <section className='each-reply-body'>
        <p className='each-reply-reply-text'>{reply}</p>
      </section>
    </div>
  )
}

export default VWeachreply
