import {
  faArrowUpWideShort,
  faBarsStaggered,
  faCalendarDay,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ApiService from "../Services/ApiService";

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CreateTask = ({ closeModel, handleUpdateList }) => {


  const [APIError, setAPIError] = useState('');
  let created = formatDate(new Date());
  const [availableUsers, setAvailableUsers] = useState([]);


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    stage: "CREATED",
    createdBy: "",
    createdAt: created,
    dueDate: "",
    assignedTo: "",
  });

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
    if (!formData.assignedTo) errors.assignedTo = "Assignee is required";

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

    // Proceed with form submission (e.g., API call)
      try {
        const response = await ApiService.createTask(formData);
        console.log(response);

        if (response.statusCode === 200) {
          //update list of task in TaskList.jsx component
          handleUpdateList();
          closeModel();
        }
      } catch (error) {
        setAPIError(error.response?.data?.message || error.message);
        setTimeout(() => setAPIError(''), 5000);
      }

    }
  };

  // fetch all available users
  useEffect(() => {
    const fetchUsersList = async () => {
      try {
        const response = await ApiService.getAllUsersNameList();
        const response1 = await ApiService.getUserProfile();

        if (response.statusCode === 200) {
          setAvailableUsers(response.usernamesDTOList);
          if (response1.statusCode === 200) formData.createdBy = response1.user.username;
        }
      } catch (error) {
        setAPIError(error.response?.data?.message || error.message);
        setTimeout(() => setAPIError(''), 5000);
      }
    }
    fetchUsersList();
  }, [])


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
            <button
              onClick={() => handlePrioritySelect("HIGH")}
              className={`flex items-center gap-3 border rounded px-2 py-1 ${formData.priority === "HIGH" ? "border-violet-800" : ""}`}
            >
              <div className="bg-green-800 size-5 rounded-md"></div>
              <p>High</p>
            </button>
            <button
              onClick={() => handlePrioritySelect("MEDIUM")}
              className={`flex items-center gap-3 border rounded px-2 py-1 ${formData.priority === "MEDIUM" ? "border-violet-800" : ""}`}
            >
              <div className="bg-yellow-600 size-5 rounded-md"></div>
              <p>Medium</p>
            </button>
            <button
              onClick={() => handlePrioritySelect("LOW")}
              className={`flex items-center gap-3 border rounded px-4 py-1 ${formData.priority === "LOW" ? "border-violet-800" : ""}`}
            >
              <div className="bg-blue-800 size-5 rounded-md"></div>
              <p>Low</p>
            </button>
          </div>
          {formErrors.priority && <p className="text-red-500 text-sm">{formErrors.priority}</p>}

          {/* Assignee Select */}
          <div className="flex justify-start items-center gap-2">
            <FontAwesomeIcon icon={faCalendarDay} className="icon-color" />
            <p className="icon-color text-lg">Assign To</p>
          </div>
          <div>
            <select
              name="assignedTo"
              className="border rounded-md px-2 py-1 w-full outline-violet-800 capitalize"
              value={formData.assignedTo}
              onChange={handleChange}
              required
            >
              <option value="" className="capitalize" disabled>
                Assign to
              </option>
              {availableUsers.length > 0 && availableUsers.map((user, i) => (
                <option key={i} value={user.username} className="capitalize">
                  {user.firstname}
                </option>
              ))
              }
              {availableUsers.length === 0 &&
                <option value={null} className="capitalize" disabled>
                  Loading...
                </option>
              }
            </select>
            {formErrors.assignedTo && <p className="text-red-500 text-sm">{formErrors.assignedTo}</p>}
          </div>

          {/* Save Button */}
          <div className="col-span-2 w-full h-full flex justify-center my-2">
            <button
              type="submit"
              className="text-center bg-violet-800 text-white px-4 py-1 rounded-lg hover:bg-violet-600 transition duration-200 ease-in-out"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
