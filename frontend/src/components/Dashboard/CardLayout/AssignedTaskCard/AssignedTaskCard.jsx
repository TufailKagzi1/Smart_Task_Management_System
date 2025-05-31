import React, { useEffect, useState } from "react";
import CardHeader from "../CardHeader";
import AssignedContent from "./AssignedContent";
import ShowAllButton from "../ShowAllButton";
import ApiService from "../../../../Services/ApiService";


const AssignedTaskCard = () => {

  const [filter,setFilter] = useState(true);

  const card = {
    cardName : "Assigned Tasks",
    rightSide : true,
    iconText : "Nearest Due Date",
    bars : true,
    pluse : false
  }

  const [task,setTask] = useState([]);

  useEffect(()=>{
    const fetchTasks = async ()=>{
      try {
        const response = await ApiService.getAssignedTasks();
        setTask(response.taskList);
      } catch (error) {
        console.log("fetch failed !!! ",error)
      }
    }
    fetchTasks();
  },[])

  useEffect( ()=>{
    const handleFilter = () =>{
      if (filter) {
        // filter task based on due date and not completed
        const filteredTasks = [...task].filter((task)=> task.status != "COMPLETED");
        filteredTasks.sort((a,b)=> new Date(a.dueDate) - new Date(b.dueDate));
        setTask(filteredTasks.slice(0,3));
      } else {
        // newly created task with greatest created date
        const filteredTasks = [...task];
        filteredTasks.sort((a,b)=> new Date(b.dueDate) - new Date(a.dueDate));
        setTask(filteredTasks.slice(0,3));
      }
    }
    handleFilter();
  },[filter])
  
  return (
    <div className="rounded-lg border">
      <CardHeader card={card} filter={filter} setFilter={setFilter}/>
      <div className="px-4 py-2">
        {task.length  ? task.slice(0,3).map((task,i)=>(
          <AssignedContent key={task.id} task={task}/>
        ))
        :
        <p className="icon-color h-full w-full flex justify-center mt-8">No Task Avialable</p>
      }
        {task.length ? <ShowAllButton/> : <></>}
      </div>
    </div>
  );
};

export default AssignedTaskCard;
