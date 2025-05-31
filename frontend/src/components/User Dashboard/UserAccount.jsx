import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import ApiService from "../../Services/ApiService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";

const UserAccount = () => {

  const navigate = useNavigate();
  const { user, setUser, clearContext } = useContext(UserContext);

  const [username, setUsername] = useState(user.username);  

  const clearUser = () => {
    ApiService.logout();
    clearContext();
    navigate('/login')
  }

  const deleteAccountHandle = async () => {
    try {
      let msg = confirm("Are you sure you want to delete Account?")
      if (msg) {
        const response = await ApiService.deleteUser();
        console.log("delete account");
        clearUser();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setUsername(e.target.value);
    console.log(username);

  }

  const handleUSername = async () => {
    try {
      console.log(username);

      const response = await ApiService.updateUsername(username);
      if (response.statusCode === 200) {
        clearUser();
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="h-full px-2 pb-4">
      <div className="mb-6">
        <p className="text-xl font-semibold text-gray-800">Account</p>
        {/* <div className="mt-4">
          <div className="flex items-center gap-12">
            <div>           
              <p className="icon-color text-sm">Userame</p>
              <div className="rounded-lg border px-2 py-1">
                <FontAwesomeIcon icon={faAt} />
                <input
                  type="text"
                  name="lastName"
                  value={username}
                  onChange={handleChange}
                  className="ml-2 text-lg outline-none"
                
                />
              </div>
            </div>
            <button className="mt-4 rounded-lg bg-blue-500 px-2 py-1 text-white hover:bg-blue-600" disabled={user.username === username}  onClick={handleUSername}>
              Change
            </button>
          </div>
        </div> */}
        <div className="mt-4 flex items-center gap-12">
          <p className="font-medium">Delete Account Permentantly</p>
          <button className="rounded-lg bg-red-500  px-2 py-1 font-medium text-white hover:bg-red-600" onClick={deleteAccountHandle}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
