import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { numberWithCommas } from "utils/formatter";

const List = ({ details, onEditClick, onDeleteClick }) => {
  return (
    <div className="flex flex-col justify-start items-start w-full gap-1">
      <div className="bg-white flex flex-col justify-center items-start gap-y-1 w-full h-fit rounded-lg border-1/2 border-grey-border relative">
        {details?.featured && (
          <div className="bg-green text-white text-xs px-2 py-0.5 rounded-full absolute top-2 right-2 shadow-2xl ">
            Featured
          </div>
        )}

        {details?.tag && (
          <div className="bg-green text-white text-xs px-2 py-0.5 rounded-full absolute bottom-2 right-2 shadow-2xl truncate max-w-[100px] ">
            {details?.tag}
          </div>
        )}
        {details?.imageUrl && (
          <div
            alt="img"
            className={`w-full h-[120px] rounded-t-lg`}
            style={{
              backgroundImage: `url(${details?.imageUrl})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        )}
        <div className="flex flex-col justify-center items-start gap-y-1 w-full p-3">
          <span className="text-xl text-black whitespace-nowrap truncate pt-1 max-w-full">
            {details?.name || details?.discountCode || details?.title}
          </span>
          <div className="text-sm text-grey-text line-clamp-2">
            {(details?.price || details?.discountType === "FIXED") && "NGN"}
            {(details?.price || details?.discountValue) &&
              numberWithCommas(details?.price || details?.discountValue)}
            {details?.subtitle}
          </div>
          <span className="text-sm text-grey-text whitespace-nowrap truncate ">
            {details?.discountExpiryTime
              ? `Expiry: ${moment(details?.discountExpiryTime).format(
                  "YY/MM/DD HH:MM A"
                )}`
              : moment(details?.updatedAt).fromNow()}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between px-3 py-2 bg-white border-[0.5px] border-[#E7EAEE] items-center w-full">
        <button
          onClick={onEditClick}
          type="button"
          className="underline text-green text-xs"
        >
          Edit
        </button>
        <button
          onClick={onDeleteClick}
          type="button"
          className="underline text-red text-xs"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
List.propTypes = {
  details: PropTypes.any,
};
export default List;
