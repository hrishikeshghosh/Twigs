import React from 'react'
import { useHistory } from 'react-router-dom'
import './style.css'
const EachProfileContent = ({
  section,
  media,
  title,
  likes,
  dislikes,
  createdAt,
  comments,
  postID
}) => {
  const history = useHistory()

  const handlePostClick = e => {
    e.preventDefault()
    if (section === 0) history.push(`/contents/blogs/${postID}`)
    if (section === 1) history.push(`/contents/arts/${postID}`)
  }
  return (
    <div
      className='each-profile-content-root'
      style={
        media
          ? {
              backgroundImage: `linear-gradient(to bottom, transparent, black),url(${media})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }
          : {
              backgroundImage: `linear-gradient(to bottom, transparent, black),url(https://firebasestorage.googleapis.com/v0/b/twigs-7e94a.appspot.com/o/posts%2Fconstants%2FNoImagePost.png?alt=media&token=d880ed7e-9c87-40b0-a0cd-7c5596fc3282)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }
      }
      onClick={e => handlePostClick}
    >
      <div className='profilebox-detail-box'>
        {section === 0 ? (
          <i
            className='fas fa-pen-nib'
            style={{ fontSize: '0.8rem', color: 'whitesmoke' }}
          ></i>
        ) : (
          <i
            className='fas fa-palette'
            style={{ fontSize: '0.8rem', color: 'whitesmoke' }}
          ></i>
        )}

        <p
          style={{
            width: 'inherit',
            fontFamily: 'Open Sans',
            fontSize: '0.9rem',
            fontWeight: '900',
            color: 'white',
            margin: '0 5%',
            flexWrap: 'wrap',
            lineBreak: 'break'
          }}
        >
          {title}
        </p>
      </div>
    </div>
  )
}

export default EachProfileContent
