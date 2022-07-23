import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Edit } from "assets/icons/add.svg";
import Button from "./button";

const ClearButton = ({ onClick, text }) => (
  <Button {...{ onClick, text }} icon={<Edit className="stroke-current" />} />
);

ClearButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default ClearButton;
