import React from "react";
import PropTypes from "prop-types";

const ChatTile = ({ className, image, title, label, count, date, read }) => {
  return (
    <div
      className={`flex justify-between items-center w-full h-fit rounded-lg py-6 space-x-6 border-b-1/2 border-grey-border cursor-pointer ${className} `}
    >
      <div className="flex justify-start items-center w-fit space-x-6">
        <div className="flex flex-col justify-center items-start space-y-1">
          <div className="w-fit h-fit p-[4px] rounded-full border border-blue-alt">
            <div
              className="w-[50px] h-[50px] rounded-full"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-start space-y-3">
          <span className="text-xl text-black regular-font">{title}</span>

          <span className="text-sm text-black flex justify-between items-center">
            {label}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between items-start space-y-14 h-full">
        {!read && (
          <span className="flex justify-center items-center text-xs text-white bg-black w-[22px] h-[22px] rounded-[22px]">
            {count}
          </span>
        )}
        <span className="text-[11px] text-grey-textalt medium-font whitespace-nowrap">
          {date}
        </span>
      </div>
    </div>
  );
};
ChatTile.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  count: PropTypes.string,
  date: PropTypes.string,
  read: PropTypes.bool,
};
export default ChatTile;
