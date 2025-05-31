import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faGear, faSignOut, faUser, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Services/ApiService";
import Model from "../Model/Model";
import DeleteTask from "../../Pages/DeleteTask";

const UserSidebar = ({ active, setActive, disable }) => {
  const navigate = useNavigate();

  let tab =
    "flex gap-4 items-center p-2 shadow cursor-pointer  border-r-2 hover:border-violet-900";
  let activeTab =
    "flex gap-4 items-center p-2 shadow  cursor-pointer border-r-2 border-green-800 hover:border-violet-900";

  const [currentTab, setCurrentTab] = useState("Profile");
  const [isModel, setIsModel] = useState(false);

  const closeModel = () => setIsModel(!isModel);

  // update state of active
  const handleChnageState = (selectedTab) => {
    setActive((prevState) => ({
      ...prevState, // Spread previous state
      Profile: selectedTab === "Profile",
      Notification: selectedTab === "Notification",
      updateProfile: selectedTab === "updateProfile",
      Account: selectedTab === "Account",
    }));
  };

  const handleLogout = () => {
    ApiService.logout();
    navigate('/login');
  }

  const handleTabs = (selectedTab) => {

    if (!disable) {
      if (selectedTab === "Profile") {
        handleChnageState(selectedTab);
        setCurrentTab(selectedTab);
        return;
      }

      if (selectedTab === "updateProfile") {
        handleChnageState(selectedTab);
        setCurrentTab(selectedTab);
        return;
      }

      if (selectedTab == "Notification") {
        handleChnageState(selectedTab);
        setCurrentTab(selectedTab);
        return;
      }

      if (selectedTab == "Account") {
        handleChnageState(selectedTab);
        setCurrentTab(selectedTab);
        return;
      }

      if (selectedTab == "Logout") {
        closeModel();
      }
    }
  };

  return (
    <div className="sticky mt-5 w-full pb-5">
      <div className="flex w-full flex-col flex-wrap gap-4 px-4">
        <div
          className={`mt-4 ${active.Profile ? activeTab : tab}`}
          onClick={() => handleTabs("Profile")}
        >
          <FontAwesomeIcon
            icon={faUser}
            className={active.Profile ? "text-violet-800" : "icon-color"}
            size="lg"
          />
          <p className="font-medium">Profile</p>
        </div>

        <div
          className={`${active.updateProfile ? activeTab : tab}`}
          onClick={() => handleTabs("updateProfile")}
        >
          <FontAwesomeIcon
            icon={faUserPen}
            className={active.updateProfile ? "text-violet-800" : "icon-color"}
            size="lg"
          />
          <p className="font-medium">Update Profile</p>
        </div>

        <div
          className={active.Notification ? activeTab : tab}
          onClick={() => handleTabs("Notification")}
        >
          <FontAwesomeIcon
            icon={faBell}
            className={active.Notification ? "text-violet-800" : "icon-color"}
            size="lg"
          />
          <p className="font-medium">Notification</p>
        </div>

        <div
          className={active.Account ? activeTab : tab}
          onClick={() => handleTabs("Account")}
        >
          <FontAwesomeIcon
            icon={faGear}
            className={active.Account ? "text-violet-800" : "icon-color"}
            size="lg"
          />
          <p className="font-medium">Account</p>
        </div>

        <div
          className="flex cursor-pointer items-center gap-4 border-r-2 p-2 shadow hover:border-violet-900"
          onClick={() => handleTabs("Logout")}
        >
          <FontAwesomeIcon
            icon={faSignOut}
            className="icon-color hover:text-black"
            size="lg"
          />
          <p className="font-medium">Logout</p>
        </div>
      </div>
      {isModel && <Model closeModel={closeModel} modalTitle={"Logout"}>
        <DeleteTask message={"Are you sure you want to logout?"} closeModel={closeModel} fun={handleLogout} />
      </Model>}
    </div>
  );
};

export default UserSidebar;
