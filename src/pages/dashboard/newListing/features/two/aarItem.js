import React from "react";
import PropTypes from "prop-types";

import CheckBox from "components/general/input/checkBox";

const AarItem = ({ title, icon, onClick, checked }) => {
  return (
    <div
      className="flex justify-between items-center w-full regular-font cursor-pointer"
      onClick={onClick}
    >
      <span
        className={`flex justify-start items-center text-base text-black ${
          checked ? "" : "opacity-30"
        } whitespace-nowrap transition-all duration-[0.3s] ease-in-out`}
      >
        <span className="w-[30px] mr-4">
          <img src={icon} className={`w-[16px] h-[16px]`} alt={title} />
        </span>
        {title}
      </span>

      <CheckBox checked={checked} isBlack />
    </div>
  );
};
AarItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
};
export default AarItem;
