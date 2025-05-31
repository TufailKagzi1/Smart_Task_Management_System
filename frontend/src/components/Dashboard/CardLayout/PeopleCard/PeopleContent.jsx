import React from 'react'

const PeopleContent = ({user,email}) => {
  return (
    <div className=' flex flex-col justify-center items-center leading-tight cursor-pointer py-3'>
      <div className="h-14 w-14 rounded-full bg-[url('https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww')] bg-cover bg-no-repeat bg-center mb-1.5">
      </div>
      <p className='text-sm font-semibold'>{user}</p>
      <p className='icon-color text-sm'>{email}</p>
    </div>
  )
}

export default PeopleContent
