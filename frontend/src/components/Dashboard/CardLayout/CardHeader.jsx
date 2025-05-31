import React, { useState } from "react";
import ArrowsIcon from "../../Common/ArrowsIcon";
import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardHeader = ({ card,filter,setFilter }) => {

  

  return (
    <div className="flex justify-between px-4 py-2 border-b-2 border-dotted mx-2">
      <p className="text-lg font-semibold">{card.cardName}</p>

      {card.rightSide && (
        <div className="flex gap-4 items-center">
          <div className="icon-color text-sm px-2 py-1 border rounded-lg flex gap-4 items-center cursor-pointer" onClick={()=>setFilter(!filter)}>
            <p>{card.iconText}</p>
            <ArrowsIcon color1={filter? "#72908D" : "black"} color2={!filter? "#72908D" : "black"} />
          </div>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            color="#72908D"
            className="cursor-pointer"
          />
          {card.pluse && 
          <FontAwesomeIcon
            icon={faPlus}
            color="white"
            className="bg-[#0135F5] px-1 -mr-2 py-0.5 rounded cursor-pointer"
          />
        }
        </div>
      )}
    </div>
  );
};

export default CardHeader;
