import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import { faF, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CommandMenu from "./CommandMenu";

const Search = () => {
    const [open, setOpen] = useState(false);
    const handleSearch = () =>{
        setOpen(true)
    }
  return (
    <>
      <div className="bg-stone-200 relative rounded flex items-center px-2 py-1.5 text-sm" onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch}/>
        <input type="text" placeholder="Search" className="bg-transparent placeholder:text-stone-400 ml-2 focus:outline-none"/>
        <span className="shadow px-1">
            <FontAwesomeIcon icon={faF} color="#72908D" size="xs"/>
        </span>
        <CommandMenu open={open} setOpen={setOpen}/>
      </div>
      
    </>
  );
};

export default Search;
