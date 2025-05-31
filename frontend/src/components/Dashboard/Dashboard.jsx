import React from 'react'
import TopBar from './TopBar'
import StatusBar from './Status bar/StatusBar'
import CardLayout from './CardLayout/CardLayout'

const Dashboard = () => {
  return (
    <div className='rounded-lg px-2'>
        <TopBar/>
        <StatusBar/>
        <CardLayout/>
    </div>
  )
}

export default Dashboard
