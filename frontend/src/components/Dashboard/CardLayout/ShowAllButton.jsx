import React from 'react'
import { Link } from 'react-router-dom'

const ShowAllButton = () => {
  return (
    <Link to={'/mytask'}>
    <div className='border rounded-lg text-center py-1 bg-[#EDF1F1]'>
      <p className='text-[#3D6663] cursor-pointer hover:text-slate-900 transition-colors'>Show All</p>
    </div>
    </Link>
  )
}

export default ShowAllButton
