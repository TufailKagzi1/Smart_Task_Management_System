import {
  faBell,
  faCircleCheck,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import { faChartColumn, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, useResolvedPath } from "react-router-dom";

const RouteSelect = () => {
  let path = useResolvedPath().pathname;

  const style = "shadow-md";

  return (
    <header className="border-b-2 border-dotted">
      <nav className="my-4 ml-2">
        <NavLink to={"/"}>
          <div
            className={`w-[calc(100%-10%)] rounded p-2 cursor-pointer hover:shadow transition-all ${path == "/" && style}`}
          >
            <FontAwesomeIcon
              icon={faHome}
              color={path === "/" ? "#7e22ce" : "#72908D"}
              className="ml-2"
            />

            <span className="ml-4 font-semibold">Home</span>
          </div>
        </NavLink>
        <NavLink to={"/mytask"}>
          <div
            className={`w-[calc(100%-10%)] rounded p-2 cursor-pointer hover:shadow transition-all ${path == "/mytask" && style}`}
          >
            <FontAwesomeIcon
              icon={faCircleCheck}
              color={path === "/mytask" ? "#7e22ce" : "#72908D"}
              className="ml-2"
            />
            <span className="ml-4 font-semibold">My Tasks</span>
          </div>
        </NavLink>
        
        <NavLink to={"/notes"}>
          <div
            className={`w-[calc(100%-10%)] rounded p-2 cursor-pointer hover:shadow transition-all ${path == "/notes" && style}`}
          >
            <FontAwesomeIcon
              icon={faNoteSticky}
              color={path === "/notes" ? "#7e22ce" : "#72908D"}
              className="ml-2"
            />
            <span className="ml-4 font-semibold">My Notes</span>
          </div>
        </NavLink>
        
        <NavLink to={"/analytics"}>
        <div className="w-[calc(100%-10%)] rounded p-2 cursor-pointer hover:shadow">
          <FontAwesomeIcon
            icon={faChartColumn}
              color={path === "/analytics" ? "#7e22ce" : "#72908D"}
            className="ml-2"
          />
          <span className="ml-4 font-semibold">Analytics</span>
        </div>
        </NavLink>

        <div className="w-[calc(100%-10%)] rounded p-2 cursor-pointer hover:shadow">
          <FontAwesomeIcon icon={faBell} color="#72908D" className="ml-2" />
          <span className="ml-4 font-semibold">Inbox</span>
        </div>
        
        <div className="w-[calc(100%-10%)] rounded p-2 cursor-pointer hover:shadow">
          <FontAwesomeIcon icon={faMessage} color="#72908D" className="ml-2" />
          <span className="ml-4 font-semibold">Message</span>
        </div>

      </nav>
    </header>
  );
};

export default RouteSelect;
