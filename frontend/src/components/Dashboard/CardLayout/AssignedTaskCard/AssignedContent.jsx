import { faCalendar, faEye } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function calculateDuedate(dueDate) {
  // Get the current date and time
  const now = new Date();
  const due = new Date(dueDate);

  // Calculate the difference in milliseconds
  const diffTime = due - now;

  // If the task is overdue
  if (diffTime < 0) {
    return "Overdue";
  }

  // Calculate the difference in various time units
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  
  // Return the message based on the difference
  if (diffYears > 0) {
    return `Due in ${diffYears} year${diffYears > 1 ? 's' : ''}`;
  } else if (diffMonths > 0) {
    return `Due in ${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
  } else if (diffDays > 0) {
    return `Due in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
  } else if (diffHours > 0) {
    return `Due in ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
  } else {
    return "Due soon"; // If it's in less than 1 hour
  }
}

const AssignedContent = ({ task }) => {
  const [dueTimeMessage, setDueTimeMessage] = useState("");

  useEffect(() => {
    if (task.dueDate && task.status !== "COMPLETED") {
      setDueTimeMessage(calculateDuedate(task.dueDate));
    } else if (task.status === "COMPLETED") {
      setDueTimeMessage("Completed");
    }
  }, [task.dueDate, task.status]);

  return (
    <Link to={`/task/${task.id}`}>
    <div className="border rounded-xl my-2 px-4 py-2 cursor-pointer hover:bg-slate-300 transition-[background-color]">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-base font-semibold">{task.title}</p>
          <div className="flex items-center gap-4">
            <p className="text-sm">{task.createdBy}</p>
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faCalendar} className="icon-color" size="xs" />
              <p className="icon-color text-sm">{dueTimeMessage}</p>
            </div>
          </div>
        </div>
        <FontAwesomeIcon icon={faEye} className="icon-color hover:text-black" />
      </div>
    </div>
    </Link>
  );
};

export default AssignedContent;
