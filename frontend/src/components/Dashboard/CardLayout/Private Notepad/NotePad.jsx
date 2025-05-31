import { faBarsStaggered, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import ApiService from '../../../../Services/ApiService';

const NotePad = ({ notepad }) => {

    const [note, setNote] = useState({
        title: "",
        note: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async () =>{
        try {
            const response = await ApiService.createNote(note);
            if (response.statusCode === 200) {
                notepad();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClear = () =>{
        setNote({
        title: "",
        note: ""
    })
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
                    value={note.title}
                    onChange={handleChange}
                    required
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
                        value={note.note}
                         onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="col-span-2 w-full h-full flex justify-center my-2 gap-4">
                <button
                    type="submit"
                    className="text-center bg-violet-800 text-white px-4 py-1 rounded-lg hover:bg-violet-600 transition duration-200 ease-in-out"
                    onClick={handleSubmit}
                >
                    Save
                </button>
                <button
                    type="submit"
                    className="text-center bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-400 transition duration-200 ease-in-out"
                    onClick={handleClear}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default NotePad