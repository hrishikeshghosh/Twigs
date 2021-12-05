import React from 'react'
import logo from '../../../images/TwigsLogo.png'

import './style.css'
const LoadingScreen = () => {
  return (
    <div className='loading-screen-root'>
      <div className='loading-image-holder'>
        <img className='loading-image' src={logo} alt='logo'></img>
      </div>
      <div className='water-mark-box'>
        <p className='water-mark-static'>Developed By,</p>
        &nbsp;
        <p className='water-mark-name'>Hrishikesh Ghosh</p>
      </div>
    </div>
  )
}

export default LoadingScreen
