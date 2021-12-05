import React from 'react'
import { Avatar } from '@material-ui/core'
import './style.css'
const RightComp = () => {
  return (
    <div className='right-comp-root'>
      <div className='right-comp-block-one'>
        <div className='view-art-image-creator-desc-box'>
          <div className='art-name-box'>
            <Avatar
              style={{
                height: '6rem',
                width: '6rem'
              }}
            />
            <div classname='art-name-role-holder'>
              <p className='art-static-texts'>Artist</p>
              <h4 className='art-name'>Hrishikesh Ghosh</h4>
              <p className='art-role'>Creator</p>
              <p className='art-static-texts'>Date</p>
              <p className='art-date'>10th June 1990</p>
            </div>
          </div>
        </div>
      </div>
      <div className='right-comp-block-two'>
        <h3 className='right-comp-image-title'> A Journey to mainlands</h3>
        <p className='art-caption'>
          Your lungs fill & spread themselves,
          <br />
          wings of pink blood, and your bones
          <br />
          empty themselves and become hollow.
          <br />
          When you breathe in you’ll lift like a balloon
          <br />
          and your heart is light too & huge,
          <br />
          beating with pure joy, pure helium.
          <br />
          The sun’s white winds blow through you,
          <br />
          there’s nothing above you,
          <br />
          you see the earth now as an oval jewel,
          <br />
          radiant & seablue with love.
          <br />
        </p>
        <p className='art-tags'>#love#yourself#best</p>
      </div>
      <div className='right-comp-block-three'></div>
    </div>
  )
}

export default RightComp
