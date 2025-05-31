import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import TopBar from "../components/Dashboard/TopBar";
import TaskList from "../components/Mytasks/TaskList";
import Model from '../components/Model/Model'
import { UserContext } from "../context/user";

const MyTasks = () => {
    const user = useContext(UserContext);
    
  
  return (
    <div>
      <div className="grid gap-4 p-4 grid-cols-1 md:grid-cols-[220px,_1fr]">
        <Sidebar />
        <div className="rounded-lg px-2 w-full">
          <TopBar />
          <TaskList />
        </div>
      </div>
      
    </div>
  );
};

export default MyTasks;
