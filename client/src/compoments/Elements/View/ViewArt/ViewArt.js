import React from 'react'
import { Grid, Grow } from '@material-ui/core'
import testimg2 from '../../../../images/test_img3.jpg'
import './style.css'
import RightComp from './RightComp'

const ViewArt = () => {
  return (
    <Grow in>
      <div className='view-art-root'>
        <Grid container alignContent='center' alignItems='strech'>
          <Grid item xs={12} sm={8}>
            <div className='view-art-left-root'>
              <div className='view-art-imager-holder'>
                <img className='view-art-image' src={testimg2} alt='1234' />
                <div className='view-art-image-description-box'>
                  <h5 className='view-art-image-title'>
                    A Journey to mainlands
                  </h5>
                  <p>#journey#mocha#locha#kocha</p>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <RightComp />
          </Grid>
        </Grid>
      </div>
    </Grow>
  )
}

export default ViewArt
