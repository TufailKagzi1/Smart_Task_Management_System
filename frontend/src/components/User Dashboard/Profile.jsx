import React from "react";
import profilePicture from "../../Assetes/Images/person-2.jfif";

const Profile = ({user}) => {
  return (
    <>
      <div className="px-2 pb-4 h-full rounded-lg">
      <div className="mb-6">
        <p className="text-xl font-semibold text-gray-800">
          Profile
        </p>
      </div>
        <div className="flex items-center gap-4 rounded-lg border p-4 shadow">
          <img
            src={profilePicture}
            alt="Profile picture"
            className="size-20 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-normal">{user.name}</p>
            <p className="icon-color text-sm">{user.role}</p>
            <p className="icon-color text-sm">India</p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border p-4 shadow">
          <p className="py-2 font-medium">Personal information</p>
          <div className="flex items-center">
            <div className="flex-1 leading-9">
              <p className="icon-color text-sm">First Name</p>
              <p className="text-lg">{user.name}</p>
            </div>

            <div className="flex-1 leading-9">
              <p className="icon-color text-sm">Last Name</p>
              <p className="text-lg">{user.name}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="flex-1 leading-9">
              <p className="icon-color text-sm">Username</p>
              <p className="text-lg">@{user.username}</p>
            </div>

            <div className="flex-1 leading-9">
              <p className="icon-color text-sm">Email</p>
              <p className="text-lg">{user.email}</p>
            </div>
          </div>
          <div className="leading-9 mt-4">
            <p className="icon-color text-sm">Bio</p>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              consequuntur repellendus distinctio ipsam nobis quisquam saepe
              laudantium. Labore qui sequi expedita nostrum reiciendis.
            </p>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Profile;
