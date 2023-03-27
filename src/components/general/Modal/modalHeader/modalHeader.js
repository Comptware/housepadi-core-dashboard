import React from "react";
import PropTypes from "prop-types";

const ModalHeader = ({ children }) => {
  return (
    <div className="border-b border-grey-border pb-4 text-xl text-black regular-font text-left pt-4 capitalize">
      {children}
    </div>
  );
};

ModalHeader.propTypes = {
  children: PropTypes.elementType,
};

export default ModalHeader;
