import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Caret } from "assets/icons/caret-right-blue.svg";
import Button from "./button";

const LinkButton = ({ onClick, text, fullWidth }) => (
  <Button
    {...{ onClick, text, fullWidth }}
    icon={<Caret />}
    isOutline
    borderColor="purple"
  />
);

LinkButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default LinkButton;
