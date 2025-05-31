import React from 'react'
import TaskDetails from './TaskDetails'
import TaskDetailsRightBar from './TaskDetailsRightBar'

const TaskDetailsLayout = ({task,assignedTo,updateContent}) => {
  
  return (
    <div className='mt-6 grid grid-cols-1 gap-3 md:grid-cols-[3fr,_1fr]'>
      <TaskDetails task={task} updateContent={updateContent}/>
      <TaskDetailsRightBar status={task.stage} assignedTo={assignedTo} assignedBy={task.createdBy}/>
    </div>
  )
}

export default TaskDetailsLayout
