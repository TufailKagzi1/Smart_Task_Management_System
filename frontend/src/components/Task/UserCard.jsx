import React from "react";
import img from "../../Assetes/Images/3.jfif";

const UserCard = ({assignedBy,assignedTo}) => {
  const users = [
    {
      title: 'Assigned By',
      img : img,
      name : assignedBy
    },
    {
      title: 'Assigned To',
      img : img,
      name : assignedTo
    },
  ]
  return (
    <div className="mt-2 flex flex-col border shadow-lg rounded-lg p-2 gap-2 md:w-full w-[40vw]">
      {users.map((u,i)=>(
        <TaskUser key = {i} user = {u} />
      ))}
    </div>
  );
};

export default UserCard;

const TaskUser = ({user}) => {
  return (
    <div className="md:w-full w-[40vw]">
      <p className="mb-2 font-medium">{user.title}</p>
      <div className="flex items-center gap-4 border-t-2 p-2">
        <img src={user.img} alt="Assigned to" className="size-10 rounded-full" />
        <div>
          <p className="capitalize">{user.name}</p>
        </div>
      </div>
    </div>
  );
};
