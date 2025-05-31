import React, { useEffect, useState } from 'react'
import ApiService from '../../Services/ApiService';
import ProjectContent from '../Dashboard/CardLayout/ProjectCard/ProjectContent';
import Model from '../Model/Model';
import NotePad from '../Dashboard/CardLayout/Private Notepad/NotePad';
import NoteContent from '../Dashboard/CardLayout/Private Notepad/NoteContent';
import CardHeader from '../Dashboard/CardLayout/CardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const NoteList = () => {

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
    const [isUpdate, setIsUpdate] = useState(false);
    const [noteDelete, setNoteDelete] = useState(false);
    const [note, setNote] = useState();
    
    const modelStatus = (update) => {
        setNewNote(false);
        setIsModel(!isModel)
        setIsUpdate(!isUpdate);
        if (update === 200) {
            fetchNotes();
        }
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
        const filter = (notes.filter((note) => note.id === id))[0];
        setNote(filter)
        modelStatus();
    }

    const handleDelete = async (id) => {
        let confirmation = confirm("do you want to delete this note?");
        if (confirmation) {
            try {
                const response = await ApiService.deleteNote(id);
                if (response.statusCode == 200) {
                    setNoteDelete(!noteDelete);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleUpdate = (id) => {
        console.log(id);

        const filter = (notes.filter((note) => note.id === id))[0];
        setNote(filter)
        setIsModel(!isModel);
        setIsUpdate(!isUpdate)
    }

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

    useEffect(() => {
        fetchNotes();
    }, [newNote, noteDelete]);


    return (
        <div className="mt-6 ml-4">
            <div className='rounded-lg border'>
                <CardHeader card={card} />
                <div className='grid grid-cols-2 px-4 gap-2 gap-x-12 cursor-pointer pt-2 pb-5 '>
                    <div onClick={NewNote}>
                        <ProjectContent project={AddNoteButton} img={AddNoteButton.img} task={AddNoteButton.task} name={AddNoteButton.name} />
                    </div>
                    {notes.map((itm) => (
                        <div className='flex justify-between items-center' key={itm.id}>
                            <div onClick={() => openNote(itm.id)}>
                                <ProjectContent name={itm.title} created={itm.createAt} img={"note"} />
                            </div>
                            <div className='flex gap-x-4'>
                                <FontAwesomeIcon icon={faEdit} className='icon-color hover:text-black' onClick={() => handleUpdate(itm.id)} />
                                <FontAwesomeIcon icon={faTrash} className='icon-color hover:text-black' onClick={() => handleDelete(itm.id)} />
                            </div>
                        </div>
                    ))}
                </div>
                {isModel && <Model closeModel={modelStatus} modalTitle={"Private Note"}>
                    {newNote ? <NotePad notepad={notepad} /> : <NoteContent id={note.id} title={note.title} note={note.note} closeModel={modelStatus} update={isUpdate} />}
                </Model>}
            </div>
        </div>
    )
}

export default NoteList