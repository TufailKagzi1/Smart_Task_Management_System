import { faCalendar, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpWideShort, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TaskDetailsCard = ({priority, start, end}) => {
  // start and end current format = 2024-12-12T10:00:00Z
  // format that is wanted = 10 Jun,2020

  const formatDate = (dateString) =>{
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB',{ day: '2-digit',month: 'short', year:'numeric' });
  }


    const detailsCard = [
        {
            title : "Priority",
            content : priority,
            icon : faArrowUpWideShort,
            iconColor : "#72908D"
        },
        {
            title : "Start Date",
            content : formatDate(start),
            icon : faCalendarAlt,
            iconColor : "#3B58FD"
        },
        {
            title : "End Date",
            content : formatDate(end),
            icon : faCalendarAlt,
            iconColor : "#FF8E52"
        },
    ]
  return (
    <div className="flex gap-8 items-center justify-between md:px-5 flex-wrap">
      {detailsCard.map((card,i)=>(
        <DetailsCard key={i} detailsCard={card}/>
      ))}
    </div>
  );
};

export default TaskDetailsCard;


const DetailsCard = ({detailsCard}) => {
  return (
    <div className="flex mt-2 items-center gap-4 p-2 flex-wrap">
        <div className="bg-[#EDFAF0] shadow border px-4 py-2 rounded-lg">
          <FontAwesomeIcon icon={detailsCard.icon} color={detailsCard.iconColor} /> 
        </div>
        <div className="leading-6">
          <p className="text-color">{detailsCard.title}</p>
          <p className="font-medium uppercase">{detailsCard.content}</p>
        </div>
      </div>
  )
}


