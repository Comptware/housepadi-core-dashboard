import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ReactComponent as Location } from "assets/icons/location.svg";
import { ReactComponent as Clock } from "assets/icons/time.svg";
import { ReactComponent as CaretRight } from "assets/icons/caret-right.svg";

const List = ({
  className,
  image,
  icon,
  bigImg,
  imgClass = "rounded-lg",
  titleOne,
  titleTwo,
  label,
  location,
  rateText,
  rateValue,
  actionText,
  link,
  caret,
  valueOne,
  valueTwo,
  date,
  button,
  buttonTwo,
  buttonThree,
  caption,
}) => {
  return (
    <div
      className={`bg-white flex flex-col sm:flex-row space-y-3 sm:space-y-0  justify-between items-center w-full h-fit rounded-lg py-6 ${className} ${
        buttonThree ? "flex-col" : ""
      }`}
    >
      <div className="flex justify-start items-center w-fit space-x-6">
        {icon && icon}
        {image && (
          <div className="flex flex-col justify-center items-start space-y-1">
            <div
              alt="img"
              className={`${
                bigImg ? "w-[76px] h-[76px]" : "w-[46px] h-[46px]"
              }  ${imgClass}`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
              }}
            />
            {caption && (
              <span className="text-[10px] text-grey-text">{caption}</span>
            )}
          </div>
        )}
        <div className="flex flex-col justify-center items-start space-y-3">
          {titleOne && <span className="text-xl text-black">{titleOne} </span>}
          {titleTwo && (
            <span className="text-[12px] text-black">{titleTwo} </span>
          )}
          {(label || location) && (
            <span className="text-base text-black flex justify-between items-center">
              {location && <Location className=" mr-2 w-[15px] h-[15px]" />}{" "}
              {label || location}
            </span>
          )}
          {rateText && (
            <div className="text-base text-black underline font-medium">
              {rateText}
              <span className="text-blue font-light">/{rateValue}</span>
            </div>
          )}
          {link && (
            <Link to={link} className="text-sm text-black underline">
              {actionText}{" "}
            </Link>
          )}

          {date && (
            <span className="flex justify-between items-center text-sm text-grey-text regular-font">
              <Clock className="mr-2 w-[15px] h-[15px]" />
              {date}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center items-end space-y-4 h-full">
        {caret && <CaretRight />}
        {valueOne && <span className="text-[7px] text-grey">{valueOne} </span>}
        {valueTwo && (
          <span className="text-[11px] text-black font-semibold">
            {valueTwo}{" "}
          </span>
        )}
        {button && (
          <div className="flex justify-end items-center space-x-3 w-fit">
            {button}
            {buttonTwo}
            {buttonThree}
          </div>
        )}
      </div>
    </div>
  );
};
List.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  icon: PropTypes.any,
  bigImg: PropTypes.bool,
  imgClass: PropTypes.string,
  titleOne: PropTypes.string,
  titleTwo: PropTypes.string,
  label: PropTypes.string,
  location: PropTypes.string,
  rateText: PropTypes.string,
  rateValue: PropTypes.string,
  actionText: PropTypes.string,
  link: PropTypes.string,
  caret: PropTypes.bool,
  valueOne: PropTypes.any,
  valueTwo: PropTypes.any,
  date: PropTypes.string,
  button: PropTypes.any,
  buttonTwo: PropTypes.any,
  buttonThree: PropTypes.any,
  caption: PropTypes.string,
};
export default List;
