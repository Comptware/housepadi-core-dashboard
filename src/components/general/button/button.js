import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Loader } from "assets/icons/loader/loader.svg";

const Button = ({
  type,
  isOutline,
  text,
  isDisabled,
  onClick,
  icon,
  isLoading,
  whiteBg,
  redBg,
  yellowBg,
  blackBg,
  fullWidth,
  borderColor,
  textColor,
  textClass = "",
  className,
  small,
  xsmall,
}) => {
  const buttonClass = `
  flex justify-center items-center
  h-[44px] outline-none rounded ${
    xsmall ? "py-5 px-3" : small ? "p-6" : "px-10 py-6"
  }
  text-sm font-semibold
  transition-all duration-150 ease-in-out border
  ${isDisabled ? "cursor-not-allowed" : ""}
  ${fullWidth ? "w-full" : ""}
  whitespace-nowrap ${
    isOutline
      ? `bg-transparent hover:bg-grey-light ${
          isDisabled ? "bg-white/[.2]" : ""
        } ${textColor || "green"} border ${borderColor || "border-white"}`
      : whiteBg
      ? `bg-white ${isDisabled ? "bg-white/[.2]" : ""} text-${
          textColor || "grey-text"
        } border-1/2 border-${borderColor || "white"}`
      : blackBg
      ? `bg-black ${isDisabled ? "bg-black/[.2]" : ""} text-${
          textColor || "text-white"
        } border-1/2 border-${borderColor || "white"}`
      : redBg
      ? `bg-red ${isDisabled ? "bg-red/[.2]" : ""} text-white`
      : yellowBg
      ? `bg-yellow ${isDisabled ? "bg-yellow/[.2]" : ""} text-white`
      : ` ${
          isDisabled
            ? "bg-green/[.2] border-green"
            : "bg-green border-green hover:bg-green-hover shadow-[0_4px_4px_rgba(0,0,0,0.25)] drop-shadow-[6px_12px_30px_rgba(50,149,217,0.24)]"
        } text-white`
  }`;
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`${fullWidth ? "w-full" : ""} ${className || ""}`}
    >
      {isLoading ? (
        <div className={buttonClass}>
          <Loader />
        </div>
      ) : (
        <div className={`space-x-3 ${buttonClass}`}>
          {icon && <div>{icon}</div>}
          {text && <span className={`${textClass}`}>{text}</span>}
        </div>
      )}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.any,
  isOutline: PropTypes.bool,
  text: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  whiteBg: PropTypes.bool,
  redBg: PropTypes.bool,
  blackBg: PropTypes.bool,
  yellowBg: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.element,
  borderColor: PropTypes.string,
  textColor: PropTypes.string,
  textClass: PropTypes.string,
  className: PropTypes.string,
  small: PropTypes.bool,
  xsmall: PropTypes.bool,
};

export default Button;
