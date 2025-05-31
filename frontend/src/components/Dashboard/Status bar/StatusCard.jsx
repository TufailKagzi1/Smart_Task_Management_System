import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const StatusCard = ({status}) => {
  return (
    <div className="flex flex-col p-3 gap-2 bg-[#FFFFFF] ">
      <div className="flex gap-2 pr-3">
        <p className="text-neutral-400 text-base">{status.statusTitle}</p>
        <div className="flex justify-center items-center gap-1">
          <FontAwesomeIcon icon={faCaretUp} size="sm" color="#DF6C2B" />
          { status.notification != 0 && <p className="text-sm text-red-900">{status.notification}</p> }
        </div>
      </div>
      <p className="text-lg font-bold">{status.count}</p>
    </div>
  );
};

export default StatusCard;
