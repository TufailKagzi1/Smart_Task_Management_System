import React from 'react'
import Search from './Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import { NavLink, useResolvedPath } from 'react-router-dom'


const TopBar = () => {

  let path = useResolvedPath().pathname;

  let PageTitle = "";

  if (path == "/") PageTitle = "Home";
  if (path == "/mytask") PageTitle = "Tasks";
  if (path == "/task/create") PageTitle = "Create Task";
  if (path.startsWith("/task")) PageTitle = "Task";
  if (path.startsWith("/user")) PageTitle = "Profile";
  if (path.startsWith("/notes")) PageTitle = "Notes";
  if (path.startsWith("/analytics")) PageTitle = "Analytics";

  return (
    <div>
      <div className='flex justify-between items-center gap-4 px-2 mb-4'>
        <div className="">
          <span className='font-bold text-lg block'>{PageTitle}</span>
          <span className='text-gray-400 text-sm hidden md1:block'>Monitor all your project and task here</span>
        </div>
        <div className="flex gap-4 items-center">
          <Search />
          <div className="flex gap-3 h-full items-center border-x border-solid border-[#d9ebe9] px-2">
            <NavLink to={'/user'}>
              <FontAwesomeIcon icon={faGear} size='lg' color='#72908D' />
            </NavLink>
            <FontAwesomeIcon icon={faCircleQuestion} size='lg' color='#72908D' />
          </div>
          <NavLink to='/user'>
            <div className="h-full items-center">
              <img src="\Images\images.jfif" alt="profile" className='size-8 image-extra-round' />
            </div>
          </NavLink>
        </div>
      </div>

      <div className='md:hidden'>
        <nav className='flex gap-4 justify-center pb-2 flex-wrap'>
          <NavLink to={"/"} ><span className="font-semibold">Home</span></NavLink>
          <NavLink to={"/mytask"}><span className="font-semibold">My Tasks</span></NavLink>
          <NavLink to={"/notes"}><span className="font-semibold">My Notes</span></NavLink>
          <NavLink to={"/analytics"}><span className="font-semibold">Analytics</span></NavLink>
        </nav>
      </div>
    </div>
  )
}

export default TopBar
