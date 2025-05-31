import React, { useState } from "react";

const UpdateProfilePicture = ({ closeModel, handleProfilePicture }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleProfileUpdate = () => {
    if (profilePicture) {
      handleProfilePicture(profilePicture);
      console.log(profilePicture);

      alert("Profile picture updated successfully!");
      closeModel();
    } else {
      alert("Please select a file before submitting.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file)); // Generate a preview URL for the selected file
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Update Profile Picture</h2>
      
      <input
        type="file"
        accept="image/*" // Accept only image files
        className="block mb-4 px-2 py-4 border rounded-lg"
        onChange={handleFileChange}
      />

      {preview && (
        <div className="mb-4">
          <p className="text-sm mb-2">Picture Preview:</p>
          <img
            src={preview}
            alt="Profile Preview"
            className="w-32 h-32 rounded-full object-cover border"
          />
        </div>
      )}

      <div className="flex space-x-2">
        <button
          className="rounded-lg bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
          onClick={handleProfileUpdate}
        >
          Submit
        </button>
        <button
          className="rounded-lg bg-white bg-opacity-5 px-2 py-1 font-medium text-red-700 hover:bg-red-600 hover:text-white"
          onClick={closeModel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
