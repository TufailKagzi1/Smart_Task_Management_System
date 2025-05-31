import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ModelHeader = ({closeModel,title}) => {
  return (
    <div className='flex justify-between items-center gap-4 border-b-2 border-gray-200 border-dotted p-2'>
      <p className='text-lg font-medium'>{title}</p>
      <button onClick={closeModel}><FontAwesomeIcon icon={faClose} className='icon-color' size='lg'/></button>
    </div>
  )
}

export default ModelHeader
