import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import TopBar from '../components/Dashboard/TopBar'

const Analytics = () => {
  return (
    <div className='grid gap-4 p-4 grid-cols-1 md:grid-cols-[220px,_1fr]'>
      <Sidebar/>
      <div className='rounded-lg px-2'>
        <TopBar/>
        <div className='h-1/2 flex justify-center items-center text-2xl text-pink-400'>
          Available soon...
        </div>
      </div>
    </div>
  )
}

export default Analytics