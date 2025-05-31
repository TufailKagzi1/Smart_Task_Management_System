import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import TopBar from '../components/Dashboard/TopBar'
import UserDashboardLayout from '../components/User Dashboard/UserDashboardLayout'

const User = () => {
  return (
    <div className='grid gap-4 p-4 grid-cols-1 md:grid-cols-[220px,_1fr] '>
      <Sidebar/>
      <div className='rounded-lg px-2'>
        <TopBar/>
        <UserDashboardLayout/>
    </div>
    </div>
  )
}

export default User
