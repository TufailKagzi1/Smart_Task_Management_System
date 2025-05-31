import {
    faArrowUpWideShort,
    faBarsStaggered,
    faCalendarDay,
    faPenToSquare,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import React, { useState } from "react";
  import ApiService from "../Services/ApiService";
  
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  const UpdateTask = ({closeModel,task,updateContent}) => {
    
    
    const [APIError, setAPIError] = useState('');
    let created = formatDate(new Date());
    const [availableUsers,setAvailableUsers] = useState([]);
    
    const [formData, setFormData] = useState({
      title: task.title,
      description: task.description,
      priority: task.priority,
      stage: task.stage,
      dueDate: task.dueDate,
    });
  
    console.log("test purpose : "+formData);
    
    const [formErrors, setFormErrors] = useState({});
  
    // Handle form field changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      let newValue = value;
      
      if (name == "dueDate") {
        newValue = formatDate(value)
      }
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    };
  
    // Handle priority selection
    const handlePrioritySelect = (priority) => {
      setFormData((prevData) => ({
        ...prevData,
        priority,
      }));
    };
  
    // Handle form Submit
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const errors = {};
  
      if (!formData.title) errors.title = "Title is required";
      if (!formData.description) errors.description = "Description is required";
      if (!formData.dueDate) errors.dueDate = "Due date is required";
      if (!formData.priority) errors.priority = "Priority is required";
  
      // Validate due date (cannot be in the past)
      if (formData.dueDate) {
        const dueDate = new Date(formData.dueDate);
        const currentDate = new Date();
  
        currentDate.setHours(0, 0, 0, 0);
  
        if (dueDate < currentDate) {
          errors.dueDate = "Due date cannot be in the past";
        }
      }
  
      setFormErrors(errors);
  
      if (Object.keys(errors).length === 0) {
        
        console.log("Form Data Submitted:", formData," : ",task.id);
        // Proceed with form submission (e.g., API call)
        try {
          const response = await ApiService.updateTask(formData,task.id);
          console.log(response);
          
          if (response.statusCode === 200) {
            // task Component
            updateContent();
            closeModel();
          }
        } catch (error) {
          setAPIError(error.response?.data?.message || error.message);
          setTimeout(()=> setAPIError(''),5000);
        }
  
      }
    };
    
    
  
    return (
      <div>
        
      <form onSubmit={handleSubmit}>
        <div className="px-4 py-2 grid grid-cols-[1fr,_3fr] gap-4 justify-start items-center">
          {APIError && (<div className="col-span-2 flex items-center justify-center -ml-6 text-red-700">
            Error : {APIError}
          </div>)}
          {/* Title Input */}
          <div className="flex justify-start items-center gap-2">
            <FontAwesomeIcon icon={faPenToSquare} className="icon-color" />
            <p className="icon-color text-lg">Title</p>
          </div>
          <div>
            <input
              type="text"
              name="title"
              className="border rounded-md px-2 py-1 w-full outline-violet-800"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            {formErrors.title && <p className="text-red-500 text-sm">{formErrors.title}</p>}
          </div>
  
          {/* Description Textarea */}
          <div className="flex justify-center items-center gap-2 place-self-start">
            <FontAwesomeIcon icon={faBarsStaggered} className="icon-color" />
            <p className="icon-color text-lg">Description</p>
          </div>
          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              cols="30"
              rows="3"
              className="border rounded-md px-2 py-1 w-full outline-violet-800"
              required
            />
            {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
          </div>
  
          {/* Due Date */}
          <div className="flex justify-start items-center gap-2">
            <FontAwesomeIcon icon={faCalendarDay} className="icon-color" />
            <p className="icon-color text-lg">Due Date</p>
          </div>
          <div>
            <input
              type="date"
              name="dueDate"
              className="border rounded-md px-2 py-1 w-full outline-violet-800"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
            {formErrors.dueDate && <p className="text-red-500 text-sm">{formErrors.dueDate}</p>}
          </div>
  
          {/* Priority Selection */}
          <div className="flex justify-center items-center gap-2 place-self-start">
            <FontAwesomeIcon icon={faArrowUpWideShort} className="icon-color" />
            <p className="icon-color text-lg">Priority</p>
          </div>
          <div className="flex justify-between pr-6">
            <div
              onClick={() => handlePrioritySelect("HIGH")}
              className={`flex items-center gap-3 border rounded px-2 py-1 ${formData.priority === "HIGH" ? "border-violet-800" : ""}`}
            >
              <div className="bg-green-800 size-5 rounded-md"></div>
              <p>High</p>
            </div>
            <div
              onClick={() => handlePrioritySelect("MEDIUM")}
              className={`flex items-center gap-3 border rounded px-2 py-1 ${formData.priority === "MEDIUM" ? "border-violet-800" : ""}`}
            >
              <div className="bg-yellow-600 size-5 rounded-md"></div>
              <p>Medium</p>
            </div>
            <div
              onClick={() => handlePrioritySelect("LOW")}
              className={`flex items-center gap-3 border rounded px-4 py-1 ${formData.priority === "LOW" ? "border-violet-800" : ""}`}
            >
              <div className="bg-blue-800 size-5 rounded-md"></div>
              <p>Low</p>
            </div>
          </div>
          {formErrors.priority && <p className="text-red-500 text-sm">{formErrors.priority}</p>}
  
         
  
          {/* Save Button */}
          <div className="col-span-2 w-full h-full flex justify-center my-2">
            <button
              type="submit"
              className="text-center bg-violet-800 text-white px-4 py-1 rounded-lg hover:bg-violet-600 transition duration-200 ease-in-out"
            >
              Update
            </button>
          </div>
        </div>
      </form>
      </div>
    );
  };
  
  export default UpdateTask;
  