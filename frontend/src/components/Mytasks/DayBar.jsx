import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Model from "../Model/Model";
import CreateTask from "../../Pages/CreateTask";

const DayBar = ({ handleUpdateList, filter, setActiveFilter }) => {

  const [showModel, setShowModel] = useState(false);
  const openModel = () => setShowModel(true);
  const closeModel = () => setShowModel(false);

  const handleChange = (e) => {
    let currentActive = e.target.value
    setActiveFilter(currentActive)
  }
  return (
    <div
      className="flex justify-between items-center"

    >
      {/* Task Type Filters */}
      <div className="border px-2 py-1 rounded-lg">
        <label htmlFor="filter">Filter By :</label>
        <select className="outline-none px-1" name="" id="filter" onChange={handleChange}>
          <option disabled>Filter</option>
          {filter.map((item, index) => (
            <option value={item} key={index} >{item}</option>
          ))}

        </select>
      </div>

      {/* Create Task Button */}
      <div className="mr-4 bg-blue-600 rounded-lg flex items-center justify-center px-2 py-1 cursor-pointer" onClick={openModel}>
        <FontAwesomeIcon icon={faPlus} className="p-2 text-white" />
        <p className="text-white font-medium mb-0.5">
          Create task
        </p>
      </div>

      {/* Model Component */}
      {showModel && <Model closeModel={closeModel} modalTitle={"Create New Task"} ><CreateTask closeModel={closeModel} handleUpdateList={handleUpdateList} /> </Model>}
    </div>
  );
};

export default DayBar;
