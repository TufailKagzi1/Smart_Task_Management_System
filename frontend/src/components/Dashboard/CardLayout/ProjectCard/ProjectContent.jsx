import { faNoteSticky, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ProjectContent = ({ img, name, created }) => {
  return (
    <div className="flex p-2 gap-4 items-center hover:-translate-y-1 transition-transform">
      {img === "icon"|| img === "note" ? (
        <>
          <div className="rounded-full bg-[#F4F6F6] px-2.5 py-1 border shadow-lg border-dotted">
            {img=== "note" ? <FontAwesomeIcon icon={faNoteSticky} /> : <FontAwesomeIcon icon={faPlus} className="icon-color" />}
          </div>
          <div className="">
            <p className="text-base font-semibold">{name}</p>
          </div>
        </>
      ) : (
        <>
          <img src={img} alt="" className="size-10 rounded-lg hover:shadow-2xl" />
          <div className="leading-5 ">
            <p className="font-semibold">{name}</p>
            <p className="icon-color text-sm">{created}</p>
          </div>
        </>
      )
      }
    </div>
  );
};

export default ProjectContent;
