import React, { useEffect, useState } from "react";
import StatusCard from "./StatusCard";
import ApiService from "../../../Services/ApiService";

const StatusBar = () => {

  const [errorMessage,setErrorMessage] = useState('');
  const [status,setStatus] = useState( [
    {
      statusTitle: "Total Tasks",
      notification : 0,
      count: 0,
    },
    {
      statusTitle: "Remaining Tasks",
      notification : 0,
      count: 0,
    },
    {
      statusTitle: "Complete Tasks",
      notification : 0,
      count: 0,
    },
    {
      statusTitle: "Overdue Task",
      notification : 0,
      count: 0,
    },
  ]);


  const handleProfileTaskOverview = (response) =>{
   
   let newStatus = [
      {
        statusTitle: "Total Tasks",
        notification :0,
        count: response.totalTasks,
      },
      {
        statusTitle: "Remaining Tasks",
        notification : 0,
        count: response.remainingTasks,
      },
      {
        statusTitle: "Complete Tasks",
        notification :0,
        count: response.completedTasks,
      },
      {
        statusTitle: "Overdue Task",
        notification :0,
        count: response.overDueTask,
      },
    ];
    setStatus(newStatus);
  };

  useEffect(()=>{
    const overviewProfile = async () =>{
      try{
        const response = await ApiService.overviewTasks();
    
        // propoget data in status
        handleProfileTaskOverview(response.overviewDTO);
      }catch(error){
        setErrorMessage(error);
        console.log("error fetching task status details ",error.message);
      }
    };
    overviewProfile();
    
  },[]);

  return (
    <div className="flex justify-around items-center border p-2 rounded-xl flex-wrap">
      { status.map((item,i)=>(
        <StatusCard status={item} key={i} />
      ))}
    </div>
  );
};

export default StatusBar;
