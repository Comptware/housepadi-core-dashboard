import React, { useState } from "react";
import PropTypes from "prop-types";

import { ReactComponent as CaretDown } from "assets/icons/caret-down.svg";

const Accordion = ({ title, children }) => {
  const [show, setShow] = useState(true);
  return (
    <div className="flex flex-col justify-start items-start w-full space-y-6">
      <div
        className={`flex justify-between items-start w-full cursor-pointer bg-white px-2 py-3 mb-3
         rounded-t ${show ? "" : "rounded-b"}`}
        onClick={() => setShow((prev) => !prev)}
      >
        <span className="text-grey-text text-base regular-font">{title}</span>
        <button
          type="button"
          className={`flex justify-center items-center transition-transform ease-in-out duration-300 transform 
          ${show ? "" : "-rotate-180"}`}
        >
          <CaretDown className="stroke-current h-3 w-3" />
        </button>
      </div>
      {show && <div className="w-full">{children}</div>}
    </div>
  );
};
Accordion.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  searchQuery: PropTypes.string,
  handleCheckboxChange: PropTypes.func,
};
export default Accordion;
