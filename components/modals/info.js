import React from 'react'
import CloseBtn from '../close-btn'

const Info = ({ closeFn }) => {
  return (
    <div className='overlay'>
        <CloseBtn closeModalFunction={closeFn} />
        <h2 className='text-center'>About the Garden</h2>
    </div>
  )
}

export default Info