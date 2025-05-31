import React from 'react'
import TopBar from '../components/Dashboard/TopBar'
import Sidebar from '../components/Sidebar/Sidebar'
import TaskList from '../components/Mytasks/TaskList'
import NoteList from '../components/notes/NoteList'

const Notes = () => {
  return (
     <div className="grid gap-4 p-4 grid-cols-1 md:grid-cols-[220px,_1fr]">
        <Sidebar />
        <div className="rounded-lg px-2">
          <TopBar />
          <NoteList />
        </div>
      </div>
  )
}

export default Notes