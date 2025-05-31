import React, { useEffect, useState } from 'react'
import CardHeader from '../CardHeader'
import ProjectContent from '../ProjectCard/ProjectContent';
import Model from '../../../Model/Model';
import NoteContent from './NoteContent';
import NotePad from './NotePad';
import ApiService from '../../../../Services/ApiService';

const PrivateNotepad = () => {
  const card = {
    cardName: "Private Notepad",
    rightSide: false,
    iconText: "",
    bars: false,
    pluse: false
  }

  let AddNoteButton = {
    img: "icon",
    name: "New Note",
    task: "Create new note."
  };

  const [notes, setNotes] = useState([]);

  const [isModel, setIsModel] = useState(false);
  const [newNote, setNewNote] = useState(false);
  const [note,setNote] = useState();

  const modelStatus = () => {
    setNewNote(false);
    setIsModel(!isModel)
  }

  const notepad = () => {
    setNewNote(!newNote)
    setIsModel(false);
  }

  const NewNote = () => {
    setIsModel(true)
    setNewNote(true);
  }

  const openNote = (id) => {
    const filter  = (notes.filter((note) => note.id === id))[0];
    setNote(filter)
    modelStatus();
  }
  

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await ApiService.getAllNotes();
        if (response.statusCode === 200) {
          setNotes(response.noteResponseDTOList.reverse())
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchNotes();
  }, [newNote]);

  return (
    <div className='rounded-lg border'>
      <CardHeader card={card} />
      <div className='grid grid-cols-1 px-4 gap-2 cursor-pointer pt-2 sm:grid-cols-2'>
        <div onClick={NewNote}>
          <ProjectContent project={AddNoteButton} img={AddNoteButton.img} task={AddNoteButton.task} name={AddNoteButton.name} />
        </div>
        {notes.slice(0,3).map((note) => (
          <div onClick={() => openNote(note.id)} key={note.id}>
            <ProjectContent name={note.title} img={"note"} created={note.createAt} />
          </div>
        ))}
      </div>
      {isModel && <Model closeModel={modelStatus} modalTitle={"Private Note"}>
        {newNote ? <NotePad notepad={notepad} /> : <NoteContent title={note.title} note={note.note} closeModel={modelStatus} />}
      </Model>}
    </div>
  )
}

export default PrivateNotepad
