import React, { useState } from "react";
import PropTypes from "prop-types";

import { ReactComponent as CaretDown } from "assets/icons/caret-down.svg";
import AddAarModal from "pages/dashboard/listings/features/utilities/addAarModal";
import AarItem from "./aarItem";

const Rules = ({ path, rules, searchQuery, handleCheckboxChange, items }) => {
  const [show, setShow] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [addModal, setAddModal] = useState(false);
  return rules?.length > 0 ? (
    <div className="flex flex-col justify-start items-start w-full space-y-6">
      <div
        className="flex justify-between items-start w-full cursor-pointer"
        onClick={() => setShow((prev) => !prev)}
      >
        <div className="flex justify-start items-start w-fit gap-x-4">
          <span
            onClick={() => setShow((prev) => !prev)}
            className="text-black text-sm uppercase regular-font"
          >
            rules
          </span>
          <button
            type="button"
            className="text-blue-alt text-xs underline regular-font"
            onClick={() => setAddModal(true)}
          >
            Create rule
          </button>
        </div>

        <button
          type="button"
          className={`flex justify-center items-center transition-transform ease-in-out duration-300 transform 
          ${show ? "" : "-rotate-180"}`}
          onClick={() => setShow((prev) => !prev)}
        >
          <CaretDown className="stroke-current h-3 w-3" />
        </button>
      </div>

      {show &&
        rules
          ?.filter((item, i) => (!showAll ? i < 5 : i < rules?.length))
          ?.filter((item) => item?.name?.includes(searchQuery))
          ?.map(({ name, id, icon }) => {
            const checked = items?.includes(id);
            return (
              <AarItem
                key={id}
                title={name}
                icon={icon}
                onClick={() => handleCheckboxChange(id, items, "rules", path)}
                checked={checked}
              />
            );
          })}

      {show && rules?.length > 5 && (
        <div
          className="w-full text-right underline text-black text-base regular-font cursor-pointer"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "View fewer" : "View all"}
        </div>
      )}

      {addModal && (
        <AddAarModal toggleModal={() => setAddModal(false)} type={"rule"} />
      )}
    </div>
  ) : null;
};
Rules.propTypes = {
  path: PropTypes.any,
  rules: PropTypes.array,
  searchQuery: PropTypes.string,
  handleCheckboxChange: PropTypes.func,
  items: PropTypes.array,
};
export default Rules;
