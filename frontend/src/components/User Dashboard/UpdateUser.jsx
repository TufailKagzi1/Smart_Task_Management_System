import React, { useContext, useState } from "react";
import profilePicture from "../../Assetes/Images/person-2.jfif";
import Model from "../Model/Model";
import UpdateProfilePicture from "../Model/UpdateProfilePicture";
import ApiService from "../../Services/ApiService";
import { useNavigate } from "react-router-dom";

const UpdateUser = ({ user }) => {
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);
  const [APIError, setAPIError] = useState('');
  const [userProfile, setUserProfile] = useState({
    profilePicture: {},
    firstName: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
  });


  const openModel = () => setShowModel(true);
  const closeModel = () => setShowModel(false);

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevData) => ({
      ...prevData, [name]: value,
    }))
  }


  const handleUpdate = async () => {

    if (!(userProfile.firstName === user.name && userProfile.email === user.email && userProfile.bio === user.bio)) {
      let newUpdate = {
        name: userProfile.firstName,
        username: userProfile.username,
        email: userProfile.email,
        bio:userProfile.bio
      }
      console.log(newUpdate);

      try {
        const response = await ApiService.updateUser(newUpdate);
        console.log(response);

        if (response.statusCode === 200) {
          navigate('/');
        }
      } catch (error) {
        setAPIError(error.response?.data?.message || error.message);
        setTimeout(() => setAPIError(''), 5000);
      }
    } else {
      alert("No chnages are made!")
    }

  }

  const setPicture = (file) => {
    if (file) {
      setUserProfile((prevData) => ({
        ...prevData,
        profilePicture: file, // Create preview URL
      }));
    } else {
      console.error("Invalid file passed to setPicture");
    }
  };


  return (
    <div className="h-full px-2 pb-4 rounded-lg">
      {APIError && <p className="flex justify-center">{APIError}</p>}
      {showModel && (
        <Model closeModel={closeModel} modalTitle={"Update Profile Picture"}>
          <UpdateProfilePicture closeModel={closeModel} handleProfilePicture={setPicture} />
        </Model>
      )}
      <div className="mb-6 ">
        <p className="text-xl font-semibold text-gray-800">
          Profile Update
        </p>
      </div>
      <div className="flex items-center gap-8 rounded-lg border p-4 shadow">
        <img
          src={profilePicture}
          alt="Profile picture"
          className="size-20 rounded-full object-cover"
        />
        <div className="flex gap-4">
          <button
            className="rounded-lg bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
            onClick={openModel}
          >
            Change Picture
          </button>
          <button className="rounded-lg bg-white bg-opacity-5 px-2 py-1 font-medium text-red-700 hover:bg-red-600 hover:text-white">
            Delete Picture
          </button>
        </div>
      </div>

      {/* Personal Information start     */}

      <div className="mt-4 rounded-lg border p-4 shadow">
        <p className="py-2 font-medium">Personal information</p>
        <div className="flex items-center">
          <div className="flex-1 leading-9">
            <p className="icon-color text-sm">First Name</p>
            <input type="text" value={userProfile.firstName} name="firstName" onChange={handleDataChange} className="border outline-violet-700 w-4/6 px-2 py-1 text-lg" />
          </div>
          <div className="flex-1 leading-9">
            <p className="icon-color text-sm">Username</p>
            <span className="border outline-violet-700 w-4/6 px-2 py-1 text-lg">@ <input type="text" value={userProfile.username} name="username" onChange={handleDataChange} disabled /></span>
          </div>

        </div>
        <div className="mt-4 flex items-center">


          <div className="flex-1 leading-9">
            <p className="icon-color text-sm">Email</p>
            <input type="text" value={userProfile.email} name="email" onChange={handleDataChange} className="border outline-violet-700 w-4/6 px-2 py-1 text-lg" />
          </div>
        </div>
        <div className="mt-4 leading-9">
          <p className="icon-color text-sm">Bio</p>
          <textarea value={userProfile.bio} onChange={handleDataChange} name="bio" className="border outline-violet-700 w-4/6 px-2 py-1 text-lg"></textarea>
        </div>
        <div className="flex w-full justify-center gap-4">
          <button
            className="rounded-lg bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
            onClick={handleUpdate}
          >
            Submit
          </button>

        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
