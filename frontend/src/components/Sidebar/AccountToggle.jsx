import React, { useContext } from 'react'
import { UserContext } from '../../context/user'

const AccountToggle = () => {

  const { user } = useContext(UserContext);
  
  return (
    <div className='border-y-2 border-dotted mt-4 p-2 '>
      <button className='py-2 bg-[#DCE3E3] flex gap-2 p-0.5 relative rounded w-full items-center'>
        <img src="/Images/images.jfif" alt="profile" className='size-6 ml-1 image' />
        <span className=' pl-2 font-semibold capitalize'>{user.name}</span>
        {/* icons for switching profile */}
      </button>
    </div>
  )
}

export default AccountToggle 
