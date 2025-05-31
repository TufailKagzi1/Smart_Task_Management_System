import React, { useEffect } from "react";
import PropTypes from "prop-types"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModelHeader from "./ModelHeader";
import UpdateProfilePicture from "./UpdateProfilePicture";

const Model = ({ closeModel,modalTitle,children }) => {

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeModel(); 
    }
  };

  // event listener for keydown (Escape key press)
  useEffect(() => {
  
    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="rounded-xl bg-white p-2">
        <ModelHeader closeModel={closeModel} title={modalTitle} />
        {children}
      </div>
    </div>
  );
};


Model.propTypes = {
  closeModel: PropTypes.func.isRequired,
  modalTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};


export default Model;
