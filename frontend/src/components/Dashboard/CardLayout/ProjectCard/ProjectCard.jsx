import React from "react";
import CardHeader from "../CardHeader";
import ProjectContent from "./ProjectContent";

const ProjectCard = () => {
  const card = {
    cardName : "Projects",
    rightSide : false,
    iconText : "",
    bars : false,
    pluse : false
  };

  const Projects = [
    {
      img: "icon",
      name: "Add Task",
      task: "no task",
    },
    {
      img: "https://media.istockphoto.com/id/1313644269/vector/gold-and-silver-circle-star-logo-template.jpg?s=612x612&w=0&k=20&c=hDqCI9qTkNqNcKa6XS7aBim7xKz8cZbnm80Z_xiU2DI=",
      name: "Logo Header",
      task: "no task",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&s",
      name: "Taybar",
      task: "1 task due soon",
    },
    {
      img: "https://bcassetcdn.com/public/blog/wp-content/uploads/2022/12/08194519/NBC.png",
      name: "NBC",
      task: "5 task due soon",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcEDjCsGT5uPWAC_maQ8nVBs698dOniP3L4A&s",
      name: "Eagle",
      task: "3 task due soon",
    },
    ,
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png",
      name: "Lego's",
      task: "1 task due soon",
    },
  ];

  return (
    <div className="rounded-lg border">
      <CardHeader card={card} />
      <div className="grid grid-cols-2 px-4 gap-2 cursor-pointer pt-2">
        {Projects.map((project, i) => (
          <ProjectContent img={project.img} name={project.name} task={project.task} key={i} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
