import React, { useEffect, useState } from "react";
import AssignedContent from "../Dashboard/CardLayout/AssignedTaskCard/AssignedContent";
import DayBar from "./DayBar";
import ApiService from "../../Services/ApiService";

const TaskList = () => {
  const filter = ["All", "Assigned", "Created by me"];
  const [activeFilter, setActiveFilter] = useState("All");

  const [updateList, setUpdateList] = useState(false);
  const [APIError, setAPIError] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [ownedTask, setOwnedTasks] = useState([]);
  const [allTask, setAllTasks] = useState([]);

  const handleUpdateList = () => setUpdateList(!updateList);

  useEffect(() => {
    const fetchAssignedTasks = async () => {
      try {
        const response = await ApiService.getAssignedTasks();
        if (response.statusCode === 200 && response.taskList) {
          setAssignedTasks(response.taskList);
        }
      } catch (error) {
        setAPIError(error.response?.data?.message || error.message);
        setTimeout(() => setAPIError(""), 5000);
      }
    };

    const fetchCreatedTasks = async () => {
      try {
        const response = await ApiService.getOwnedTasks();
        if (response.statusCode === 200 && response.taskList) {
          setOwnedTasks(response.taskList);
        }
      } catch (error) {
        setAPIError(error.response?.data?.message || error.message);
        setTimeout(() => setAPIError(""), 5000);
      }
    };

    const fetchAllTasks = async () => {
      try {
        const response = await ApiService.featchAllMyTasks();
        if (response.statusCode === 200 && response.taskList) {
          setAllTasks(response.taskList);
        }
      } catch (error) {
        setAPIError(error.response?.data?.message || error.message);
        setTimeout(() => setAPIError(""), 5000);
      }
    };

    fetchAllTasks();
    fetchAssignedTasks();
    fetchCreatedTasks();
  }, [updateList]);

  return (
    <div className="mt-6 ml-4">
      <div>
        <DayBar
          handleUpdateList={handleUpdateList}
          filter={filter}
          setActiveFilter={setActiveFilter}
        />
      </div>

      <div className="flex flex-col flex-wrap mt-4">
        {activeFilter === "All" &&
          allTask.map((task, i) => <AssignedContent key={i} task={task} />)}

        {activeFilter === "Assigned" &&
          assignedTasks.map((task, i) => <AssignedContent key={i} task={task} />)}

        {activeFilter === "Created by me" &&
          ownedTask.map((task, i) => <AssignedContent key={i} task={task} />)}

        {activeFilter === "All" && allTask.length === 0 && (
          <p className="flex justify-center icon-color mt-8 font-semibold text-lg">
            No tasks available!
          </p>
        )}
        {activeFilter === "Assigned" && assignedTasks.length === 0 && (
          <p className="flex justify-center icon-color mt-8 font-semibold text-lg">
            No tasks assigned!
          </p>
        )}
        {activeFilter === "Created by me" && ownedTask.length === 0 && (
          <p className="flex justify-center icon-color mt-8 font-semibold text-lg">
            No tasks created by you!
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
