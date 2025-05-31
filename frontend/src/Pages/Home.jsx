import React, { useContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Dashboard from '../components/Dashboard/Dashboard'
import { UserContext } from '../context/user'
import ApiService from '../Services/ApiService'
import { useNavigate } from 'react-router-dom'
import { updateUserContext } from '../context/updateUserContext'


const Home = () => {
  
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const updateContext = async () => {
      try {
        const response = await ApiService.getUserProfile();
        console.log("Home",response);
        
        if (response.statusCode === 200) {
          user.setUser({ name: response.user.name, username: response.user.username, role: response.user.role, email: response.user.email });
        }

      } catch (error) {
        console.log("user context failed :",error);
        if (error.message.slice(-3) == 403) {
          ApiService.logout();
        }
      }
    };
    
    // updateUserContext();
    
  }, [])

  return (
    <div className='grid gap-4 p-4 grid-cols-1 md:grid-cols-[220px,_1fr] '>
      <Sidebar />
      <Dashboard />
    </div>
  )
}

export default Home
