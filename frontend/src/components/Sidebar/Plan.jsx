import { faWalking } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiService from '../../Services/ApiService'
import Model from '../Model/Model'
import DeleteTask from '../../Pages/DeleteTask'

const Plan = () => {

  const navigate = useNavigate();
  const [isModel, setIsModel] = useState(false);

  const closeModel = () => setIsModel(!isModel);

  const handleLogout = () => {
    ApiService.logout();
    navigate('/login');
  }

  return (
    <div className='fixed left-10'>
      <div className="rounded-lg shadow-lg shadow-slate-700 p-2 cursor-pointer ">
        <FontAwesomeIcon icon={faWalking} color='#72908D' />
        <span className='ml-4' onClick={closeModel}>Logout</span>
      </div>
      {isModel && <Model closeModel={closeModel} modalTitle={"Logout"}>
        <DeleteTask message={"Are you sure you want to logout?"} closeModel={closeModel} fun={handleLogout}/>
      </Model>}
    </div>
  )
}

export default Plan
