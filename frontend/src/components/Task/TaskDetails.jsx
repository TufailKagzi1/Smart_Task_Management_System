import { faEllipsisVertical, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import TaskDetailsCard from "./TaskDetailsCard";
import Model from '../Model/Model'
import UpdateTask from "../../Pages/UpdateTask";
import { UserContext } from "../../context/user";
import DeleteTask from "../../Pages/DeleteTask";
import ApiService from "../../Services/ApiService";
import { useNavigate } from "react-router-dom";

const TaskDetails = ({ task, updateContent }) => {

  const navigate = useNavigate();
  const logedUser = useContext(UserContext);
  const [showModel, setShowModel] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const openModel = () => setShowModel(true);
  const closeModel = () => setShowModel(false);


  const handleUpdate = () => {
    setIsUpdate(true)
    openModel();
  }

  const handleDelete = () => {
    setIsUpdate(false)
    openModel();
  }

  const deleteTask = async () => {
    try {
      const response = await ApiService.deleteTask(task.id);
      if (response.statusCode === 200) {
        closeModel();
        navigate('/mytask');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="border p-4 rounded-lg shadow md:w-full w-[90vw]">
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium">{task.title}</p>
        <div>
          {(task.createdBy == logedUser.user.username) &&
            <div className="flex gap-3">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-blue-600 cursor-pointer"
                onClick={handleUpdate}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="icon-color cursor-pointer"
                onClick={handleDelete}
              />

            </div>
          }
        </div>
      </div>
      <p className="text-zinc-900 uppercase font-medium mt-4">Details</p>
      <TaskDetailsCard priority={task.priority} start={task.createdAt} end={task.dueDate} />
      <div className="border rounded-lg mt-4 p-2">
        <p className="text-zinc-900 uppercase font-medium  ">Description</p>
        <p className="text-justify text-color mt-2">
          {task.description}
        </p>
      </div>
      {/* Model Component */}
      {/* update task */}
      {(showModel && isUpdate) && <Model closeModel={closeModel} modalTitle={"Update Task"} >
        <UpdateTask closeModel={closeModel} task={task} updateContent={updateContent} />
      </Model>}
      {/* delete confirmation */}
      {(showModel && !isUpdate) && <Model closeModel={closeModel} modalTitle={"Delete Task"} >
        <DeleteTask message={"Are you sure you want to delete this task?"} closeModel={closeModel} fun={deleteTask} />
      </Model>}
    </div>
  );
};

export default TaskDetails;
