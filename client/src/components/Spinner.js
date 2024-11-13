import React from 'react'
import { Spin } from 'antd'

function Spinner() {
  return (
    <div className='spinner-parent'>
        <Spin className='spinner' size='large' />
    </div>
  )
}

export default Spinner