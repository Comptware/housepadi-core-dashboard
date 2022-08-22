import React, { useState } from "react";
import PropTypes from "prop-types";

import { ReactComponent as CaretDown } from "assets/icons/caret-down.svg";
import AddAarModal from "pages/dashboard/listings/features/utilities/addAarModal";
import AarItem from "./aarItem";

const Amenities = ({
  path,
  amenities,
  searchQuery,
  handleCheckboxChange,
  items,
}) => {
  const [show, setShow] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [addModal, setAddModal] = useState(false);

  return amenities?.length > 0 ? (
    <div className="flex flex-col justify-start items-start w-full space-y-6">
      <div className="flex justify-between items-start w-full cursor-pointer">
        <div className="flex justify-start items-start w-fit gap-x-4">
          <span
            onClick={() => setShow((prev) => !prev)}
            className="text-black text-sm uppercase regular-font"
          >
            amenities
          </span>
          <button
            type="button"
            className="text-blue-alt text-xs underline regular-font"
            onClick={() => setAddModal(true)}
          >
            Create amenity
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
        amenities
          ?.filter((item, i) => (!showAll ? i < 5 : i < amenities?.length))
          ?.filter((item) => item?.name?.includes(searchQuery))
          ?.map(({ name, id, icon }) => {
            const checked = items?.includes(id);
            return (
              <AarItem
                key={id}
                title={name}
                icon={icon}
                onClick={() =>
                  handleCheckboxChange(id, items, "amenities", path)
                }
                checked={checked}
              />
            );
          })}

      {show && amenities?.length > 5 && (
        <div
          className="w-full text-right underline text-black text-base regular-font cursor-pointer"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "View fewer" : "View all"}
        </div>
      )}

      {addModal && (
        <AddAarModal toggleModal={() => setAddModal(false)} type={"amenity"} />
      )}
    </div>
  ) : null;
};
Amenities.propTypes = {
  path: PropTypes.any,
  amenities: PropTypes.array,
  searchQuery: PropTypes.string,
  handleCheckboxChange: PropTypes.func,
  items: PropTypes.array,
};
export default Amenities;
