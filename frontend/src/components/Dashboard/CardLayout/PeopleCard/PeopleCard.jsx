import React, { useEffect, useState } from 'react'
import CardHeader from '../CardHeader'
import PeopleContent from './PeopleContent';
import ApiService from '../../../../Services/ApiService';

const PeopleCard = () => {
    const [peopleCount, setPeopleCount] = useState(0);
    let name = "People ("+ peopleCount+")";
    const card = {
      cardName : name,
      rightSide : false,
      iconText : "Frequent Collaborators",
      bars : true,
      pluse : true
    }

    const [people,setPeople] = useState([]);
        
    useEffect(()=>{
      const People = async () =>{
        try {
          const response = await ApiService.getAllUsersNameList();
          
          if (response.statusCode === 200) {
            setPeople(response.usernamesDTOList);
            setPeopleCount(people.length+1);
          }
        } catch (error) {
          console.log(error);
          
        }
      }
      People();
    },[])
    
  return (
    <div className='border rounded-lg'>
      <CardHeader card={card} />
      <div className='grid grid-cols-3 items-center gap-y-2 mt-2'>
        {/* map with people */}
        {people.slice(0,3).map((user,idx)=>(
          <PeopleContent key={idx} user={user.username} email={user.email}/>
        ))}
        
      </div>
    </div>
  )
}

export default PeopleCard
