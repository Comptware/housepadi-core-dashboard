import React from "react";
import PropTypes from "prop-types";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "./button";

const DeleteButton = ({ ...props }) => (
  <Button
    icon={<RiDeleteBin6Line className="stroke-current" />}
    redBg
    {...props}
  />
);

DeleteButton.propTypes = {
  props: PropTypes.object,
};

export default DeleteButton;
