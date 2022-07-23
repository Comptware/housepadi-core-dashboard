import React from "react";
import PropTypes from "prop-types";
import CheckBox from "../input/checkBox";
const Table = ({ head, children, onClick, checked }) => {
  return (
    <table className="w-full overflow-x-scroll h-full max-h-fit min-h-36 pb-20">
      <thead className="max-h-fit">
        <tr className="max-h-fit ">
          {head.map((item) => (
            <th key={item} className="max-h-fit text-left">
              {item ? (
                <span className="text-grey-textalt text-[12.5px]">{item}</span>
              ) : (
                <CheckBox checked={checked} onClick={onClick} />
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="space-y-2 w-full max-h-fit relative">{children}</tbody>
    </table>
  );
};

Table.propTypes = {
  head: PropTypes.array,
  children: PropTypes.any,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Table;
