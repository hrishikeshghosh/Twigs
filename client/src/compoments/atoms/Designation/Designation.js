import React from 'react'
import DESIGNATION_SETTER from '../../../Helper/DESIGNATION_SETTER'
const Designation = ({ designation, size }) => {
  return (
    <div className='designation-div-root' style={{ padding: 0 }}>
      <i
        className='fas fa-hat-wizard designation-icon'
        style={{
          fontSize: { size },
          color: DESIGNATION_SETTER(designation),
          padding: 0,
          margin: '0 5px'
        }}
      ></i>
    </div>
  )
}

export default Designation
