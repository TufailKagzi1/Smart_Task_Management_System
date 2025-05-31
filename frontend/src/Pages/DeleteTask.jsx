import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiService from '../Services/ApiService';

const DeleteTask = ({ message, closeModel, fun }) => {
   
    const handleDelete = () => {
        fun();
    }
    return (
        <div className='p-4'>
            <div>
                <p className='font-semibold'>{message}</p>
                <div className='flex w-full justify-center gap-4 mt-5'>
                    <button className='bg-blue-600  text-white rounded-lg p-2 hover:bg-blue-700' onClick={handleDelete}>Confirm</button>
                    <button className='bg-red-500 text-white rounded-lg p-2 hover:bg-red-600' onClick={closeModel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteTask
