import React from 'react'
import LeftSideImage from '../../Assetes/Images/person-2.jfif';

const LeftImage = () => {
  return (
      <div className="w-full h-full flex items-center">
        <img src={LeftSideImage} alt="SignUpImage" className='rounded-lg h-[85vh] w-screen object-cover'/>
      </div>
  )
}

export default LeftImage
