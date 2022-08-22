import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Edit } from "assets/icons/add.svg";
import Button from "./button";

const AddButton = ({ ...rest }) => (
  <Button icon={<Edit className="" />} {...rest} />
);

AddButton.propTypes = {
  rest: PropTypes.any,
};

export default AddButton;
