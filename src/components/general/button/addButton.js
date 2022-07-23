import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Edit } from "assets/icons/add.svg";
import Button from "./button";

const AddButton = ({ onClick, text }) => (
  <Button {...{ onClick, text }} icon={<Edit className="" />} />
);

AddButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default AddButton;
