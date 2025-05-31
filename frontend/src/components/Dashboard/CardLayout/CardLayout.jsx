import React from 'react'
import AssignedTaskCard from './AssignedTaskCard/AssignedTaskCard'
import ProjectCard from './ProjectCard/ProjectCard'
import PeopleCard from './PeopleCard/PeopleCard'
import PrivateNotepad from './Private Notepad/PrivateNotepad'


const CardLayout = () => {
  return (
    <div className='grid grid-cols-1 gap-4 mt-4 md1:grid-cols-2'>
        {/* Todo 4 div cards -> for each Assigned Task, Project,People,Note -> create component */}
        <AssignedTaskCard/>
        <ProjectCard/>
        <PeopleCard/>
        <PrivateNotepad/>
    </div>
  )
}

export default CardLayout
