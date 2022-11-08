import React from "react";
import PropTypes from "prop-types";

import CheckBox from "../input/checkBox";

const Table = ({ head, children, onClick, checked, title }) => {
  return (
    <div className="flex flex-col w-full justify-start items-start">
      <table className="w-full overflow-x-scroll h-full max-h-fit min-h-36 pb-5">
        <thead className="max-h-fit">
          <tr className="max-h-fit ">
            {head?.map((item) => (
              <th key={item} className="max-h-fit text-left">
                {item ? (
                  <span className="text-grey-textalt text-[12.5px] whitespace-nowrap">
                    {item}
                  </span>
                ) : (
                  <CheckBox checked={checked} onClick={onClick} />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="space-y-2 w-full max-h-fit relative">
          {children}
          {!head && (
            <p className="text-base text-grey-text text-left mb-5 w-full uppercase">
              There are no {title} at the moment
            </p>
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  head: PropTypes.array,
  children: PropTypes.any,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default Table;
