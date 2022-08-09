import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Edit } from "assets/icons/edit.svg";
import Button from "./button";

const EditButton = ({ onClick, text }) => (
  <Button
    {...{ onClick }}
    text={text}
    icon={<Edit />}
    isOutline
    fullWidth
    borderColor="border-blue-alt"
  />
);

EditButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default EditButton;
