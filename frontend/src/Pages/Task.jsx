import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import TopBar from '../components/Dashboard/TopBar'
import TaskDetailsLayout from '../components/Task/TaskDetailsLayout'
import { useParams } from 'react-router-dom'
import { tasks } from '../Assetes/Data/Tasks'
import ApiService from '../Services/ApiService'

const Task = () => {
  let id = useParams().taskID;
  const [taskDetail,setTaskDetail] = useState({});
  let [assignedTo,setAssignedTo] = useState("");
  let [refrece,setRefrece] = useState(false);

  const updateContent = () =>{
    setRefrece(!refrece);
  }

  useEffect(()=>{
    const fetchTask = async () =>{
      try {
        const response = await ApiService.findTask(id);
        setTaskDetail(response.task)
        setAssignedTo(response.task.assignedTo.username);
      } catch (error) {
        console.log(error);
      }
      // create API for Search By Task Id
    }
    
    fetchTask();
  },[refrece])
  
  const task = tasks.filter((u)=> u.id == id)[0];

  return (
    <div className='grid gap-4 p-4 grid-cols-1 md:grid-cols-[220px,_1fr]'>
      <Sidebar/>
      <div className='rounded-lg px-2'>
        <TopBar/>
        <TaskDetailsLayout task={taskDetail} assignedTo={assignedTo} updateContent={updateContent} />
      </div>
    </div>
  )
}

export default Task
