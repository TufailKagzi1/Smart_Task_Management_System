import React, { useEffect, useState } from "react";
import UserSidebar from "./UserSidebar";
import Profile from "./Profile";
import UpdateUser from "./UpdateUser";
import UserNotification from "./UserNotification";
import UserAccount from "./UserAccount";
import ApiService from "../../Services/ApiService";

const UserDashboardLayout = () => {

  const [APIError, setAPIError] = useState('');
  const [newtworkError,setNewtworkError] = useState(true);
  const [user,setUser] = useState({});

  useEffect(() => {
    const fetchMyData =  async () =>{
        try {
          // add api and error
          const response  = await ApiService.getUserProfile();
          
          if (response.statusCode === 200) {
            setUser(response.user);
            setNewtworkError(false);
          }
        } catch (error) {
          setAPIError(error.response?.data?.message || error.message);
          setNewtworkError(true)
          setTimeout(()=> setAPIError(''),5000);
        }
    }
    fetchMyData();
  }, [])

  const [active, setActive] = useState({
    Profile: true,
    Notification: false,
    Account: false,
    updateProfile: false,
    Logout: false,
  });
  

  return (
    <div className="border rounded-lg shadow-md">
      <p className="font-semibold text-xl px-4 py-2">Account Settings</p>
      <div className="grid grid-cols-5 ">
        {/* <div className="border-r-2"> */}
          <UserSidebar active={active} setActive={setActive} disable={newtworkError}/>
        {/* </div> */}
        <div className="col-span-4 px-4 py-2">
          
          {!newtworkError ? (active.Profile && <Profile user={user} />) : <p className="icon-color flex justify-center mt-8 font-semibold text-lg">{`${APIError} Loading....`}</p>}
          {active.updateProfile && <UpdateUser user={user}/>}
          {active.Notification && <UserNotification />}
          {active.Account && <UserAccount />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
