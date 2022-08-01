import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as Increment } from "assets/icons/increment.svg";
import { ReactComponent as Decrement } from "assets/icons/decrement.svg";

const DescriptionItem = ({
  title,
  icon,
  decrementClick,
  incrementClick,
  itemCount,
}) => {
  return (
    <div className="flex justify-between items-center w-full regular-font mb-2">
      <span className="flex justify-start items-center text-base text-black whitespace-nowrap">
        <span className="w-[30px] mr-4">{icon}</span>
        {title}
      </span>

      <div className="flex justify-end items-center w-full space-x-3">
        <button
          type="button"
          onClick={decrementClick}
          className={`hover:opacity-70 transition-opacity duration-500 ease-in-out ${
            itemCount === 0 ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          <Decrement />
        </button>

        <span className="text-lg text-black">{itemCount}</span>
        <button
          type="button"
          onClick={incrementClick}
          className="hover:opacity-70 transition-opacity duration-500 ease-in-out"
        >
          <Increment />
        </button>
      </div>
    </div>
  );
};
DescriptionItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  decrementClick: PropTypes.func,
  incrementClick: PropTypes.func,
  itemCount: PropTypes.number,
};
export default DescriptionItem;
