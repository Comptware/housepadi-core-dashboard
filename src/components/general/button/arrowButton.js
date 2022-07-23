import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as ArrowRight } from "assets/icons/arrow-right-white.svg";
import Button from "./button";

const ArrowButton = ({ onClick, text }) => (
  <Button
    {...{ onClick, text }}
    icon={<ArrowRight />}
    borderColor="white"
    blackBg
    xsmall
  />
);

ArrowButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default ArrowButton;
