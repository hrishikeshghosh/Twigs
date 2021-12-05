import React from 'react'
import EachProfileContent from './EachProfileContent/EachProfileContent'
import './style.css'
const ProfileContents = ({ contents, section }) => {
  return (
    <div className='profile-contents-container'>
      <div
        className='profile-contents-root'
        style={
          contents.length >= 3
            ? { justifyContent: 'center' }
            : { justifyContent: 'start' }
        }
      >
        {contents.length !== 0 ? (
          contents.map(content => (
            <EachProfileContent
              media={content?.media}
              title={content?.title}
              likes={content?.likes}
              dislikes={content?.dislikes}
              createdAt={content?.createdAt}
              comments={content?.comments}
              postID={content?._id}
              section={section}
            />
          ))
        ) : (
          <p>No Post</p>
        )}
      </div>
    </div>
  )
}

export default ProfileContents
