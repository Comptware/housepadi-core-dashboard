import React from "react";
import PropTypes from "prop-types";

const ModalBody = ({ children }) => {
  return (
    <div className="body-content flex flex-col justify-start items-start w-full h-full max-h-[500px] flex-grow">
      {children}
    </div>
  );
};

ModalBody.propTypes = {
  children: PropTypes.any,
};

export default ModalBody;
