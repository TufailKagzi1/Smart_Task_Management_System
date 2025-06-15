import { faCheck, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../context/user';
import Model from '../Model/Model';
import { useParams } from "react-router-dom";
import ApiService from "../../Services/ApiService";

const TaskStatus = ({ status, assignedBy, assignedTo }) => {

  const { taskID } = useParams();
  const user = useContext(UserContext);
  
  const [error, setError] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [updateConfirm, setUpdateConfirm] = useState(false);


  // check whether the current user can update the task
  const update = (assignedBy === user.user.username) || (assignedTo === user.user.username);
  
  const getStatusCards = () => [
    {
      style: "bg-[#FFD240] size-4 rounded",
      title: "Started",
      apiTitle: "CREATED",
      isActive: currentStatus == "CREATED"
    },
    {
      style: "bg-[#22CCE2] size-4 rounded",
      title: "In Progress",
      apiTitle: "IN_PROGRESS",
      isActive: currentStatus == "IN_PROGRESS"
    },
    {
      style: "bg-[#48C96D] size-4 rounded",
      title: "Completed",
      apiTitle: "COMPLETED",
      isActive: currentStatus == "COMPLETED"
    }
  ];
  
  const handleModel = () => {
    setShowModel(!showModel);
  };

  const handleStatus = (status) => {
    setCurrentStatus(status.apiTitle);
  };

  const handleConfirmStatus = async () => {
    try {

      let response;

      if(currentStatus === 'IN_PROGRESS'){
        response = await ApiService.markAsProcess(taskID);
      }else{
        response = await ApiService.markAsCompleted(taskID);
      }
      if (response.statusCode === 200) {
          setUpdateConfirm(true);
          handleModel();
          window.location.reload();
        }

    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  useEffect(()=>{
    if(!updateConfirm){
      setCurrentStatus(status);
    }else{
      setCurrentStatus(false);
    }
  },[showModel])

  

  return (
    <div className="border shadow-xl rounded-lg p-4 md:w-full w-[40vw]">
      {update && (
        <div className="flex justify-between items-center p-2">
          <span className="font-semibold text-lg">Update status</span>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="text-blue-600 cursor-pointer"
            onClick={handleModel}
          />
        </div>
      )}

      {/* Display Current Status */}
      {getStatusCards().map((status, i) => (
        <TaskStatusCard key={i} cardStatus={status} />
      ))}

      {/* Modal for updating status */}
      {showModel && (
        <Model closeModel={handleModel} modalTitle={"Update Task Status"}>
          <div className="p-5 flex flex-col md:flex-row gap-5 justify-center">
            <div className="space-y-3">
              {getStatusCards().map((status, i) => (
                <div key={i} className="cursor-pointer" onClick={() => handleStatus(status)}>
                  <TaskStatusCard cardStatus={status} />
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <button
                className="px-4 py-3 bg-blue-600 text-white hover:bg-blue-500 rounded-lg"
                onClick={handleConfirmStatus}
              >
                Update Status
              </button>
            </div>
          </div>
        </Model>
      )}
    </div>
  );
};

export default TaskStatus;

// Status Card Subcomponent
const TaskStatusCard = ({ cardStatus }) => {
  return (
    <div className="flex items-center justify-between w-[35vw] md:w-full px-4 py-2 border rounded-lg shadow-sm bg-white">
      <div className="flex gap-4 items-center">
        <div className={cardStatus.style}></div>
        <p className="text-gray-800 font-medium">{cardStatus.title}</p>
      </div>
      {cardStatus.isActive && (
        <FontAwesomeIcon
          icon={faCheck}
          color="#4A62FC"
          className="px-3"
        />
      )}
    </div>
  );
};
