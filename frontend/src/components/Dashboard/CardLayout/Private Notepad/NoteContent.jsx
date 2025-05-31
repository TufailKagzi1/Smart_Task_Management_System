import { faBarsStaggered, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import ApiService from '../../../../Services/ApiService';

const NoteContent = ({ id, title, note, closeModel, update }) => {

  const [notes, setNotes] = useState({
    title: title,
    note: note
  });

  const handleUpdate = async () => {
    try {
      const response = await ApiService.updateNote(id,notes);      
      if (response.statusCode === 200) {
        closeModel(response.statusCode);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotes((pre) => ({
      ...pre, [name]: value,
    }))
  }

  return (
    <div className='p-2'>
      <div className="px-4 py-2 grid grid-cols-[1fr,_3fr] gap-4 justify-start items-center">
        <div className="flex justify-start items-center gap-2">
          <FontAwesomeIcon icon={faPenToSquare} className="icon-color" />
          <p className="icon-color text-lg">Title</p>
        </div>
        <input
          type="text"
          name="title"
          className="border rounded-md px-2 py-1 w-full outline-violet-800"
          placeholder="Enter note title"
          value={notes.title}
          onChange={handleChange}
          disabled={update ? false : true}
        />

        {/* Description Textarea */}
        <div className="flex justify-center items-center gap-2 place-self-start">
          <FontAwesomeIcon icon={faBarsStaggered} className="icon-color" />
          <p className="icon-color text-lg">Content</p>
        </div>
        <div>
          <textarea
            name="note"
            cols="30"
            rows="5"
            placeholder='write your note here'
            className="border rounded-md px-2 py-1 w-full outline-violet-800"
            value={notes.note}
            onChange={handleChange}
            disabled={update ? false : true}
          />
        </div>
        <div className="col-span-2 w-full h-full flex justify-center my-2 gap-4">

          {update ?
            <button
              type="submit"
              className="text-center bg-violet-800 text-white px-4 py-1 rounded-lg hover:bg-violet-600 transition duration-200 ease-in-out"
              onClick={handleUpdate}>Update</button>
            : <button
              type="submit"
              className="text-center bg-violet-800 text-white px-4 py-1 rounded-lg hover:bg-violet-600 transition duration-200 ease-in-out"
              onClick={closeModel}>Close</button>
          }

        </div>
      </div>

    </div>
  )
}

export default NoteContent