import React from 'react'
import Logo from './Logo'
import AccountToggle from './AccountToggle'
import RouteSelect from './RouteSelect'
import Plan from './Plan'
import { updateUserContext } from '../../context/updateUserContext'

const Sidebar = () => {
  updateUserContext();
  return (
    <div className='hidden md:block'>
      <div className='overflow-y-scroll sticky top-2 h-[calc(100vh-24px-48px)]'>
        {/* main side bar content */}
        <Logo/>
        <AccountToggle/>
        <RouteSelect/>
      </div>
      
      {/* todo Plan */}
      <Plan/>
    </div>
  )
}

export default Sidebar