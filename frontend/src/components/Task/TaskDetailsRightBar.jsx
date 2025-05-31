import React from 'react'
import TaskStatus from './TaskStatus'
import UserCard from './UserCard'

const TaskDetailsRightBar = ({assignedTo,assignedBy,status}) => {
  return (
    <div className='flex gap-8 md:block'>
      <TaskStatus status={status} assignedBy={assignedBy} assignedTo={assignedTo} />
      <UserCard assignedBy={assignedBy} assignedTo={assignedTo} />
    </div>
  )
}

export default TaskDetailsRightBar
