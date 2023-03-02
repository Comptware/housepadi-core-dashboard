import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { ReactComponent as Location } from "assets/icons/location.svg";
import { ReactComponent as Clock } from "assets/icons/time.svg";
import { Button } from "../button";
import { Link } from "react-router-dom";
import { determinePaymentStatus } from "utils/bookings";

const List = ({ details }) => {
  const type = details?.type;
  return (
    <Link
      to={`/dashboard/bookings/${details?.id}`}
      className={`bg-white flex flex-col sm:flex-row space-y-3 sm:space-y-0  justify-between items-center w-full h-fit rounded-lg p-3 sm:p-6 border-1/2 border-grey-border`}
    >
      <div className="flex justify-start items-center w-fit space-x-6">
        <div className="flex flex-col justify-center items-start space-y-1">
          <div>{type === ""}</div>

          <span className="text-[10px] text-grey-text whitespace-nowrap truncate ">
            {details?.user?.first_name
              ? details?.user?.first_name + " " + details?.user?.last_name
              : "N/A"}
          </span>
          <span className="text-[10px] text-grey-text whitespace-nowrap truncate ">
            {moment(details?.updated_at).fromNow()}
          </span>
        </div>
        <div className="flex flex-col justify-center items-start space-y-3">
          <span className="text-xl text-black flex justify-start items-center gap-x-2 whitespace-nowrap">
            {details?.shortlet?.name}
            {determinePaymentStatus(details?.paid)}
          </span>

          <span className="text-base text-black flex justify-between items-center">
            <Location className=" mr-2 w-[15px] h-[15px]" />{" "}
            {details?.shortlet?.address}
          </span>

          <span className="flex justify-between items-center text-sm text-grey-text regular-font">
            <Clock className="mr-2 w-[15px] h-[15px]" />
            {`${moment(details?.check_in_date).format("MMMM Do")} - ${moment(
              details?.check_out_date
            ).format("MMMM Do")}, ${moment(details?.check_out_date).format(
              "YYYY"
            )}`}
          </span>
        </div>
      </div>

      <div className="hidden sm:flex flex-col justify-center items-end space-y-4 h-full">
        <Button
          isOutline
          text="View details"
          borderColor="border-green"
          textColor="text-green"
          small
        />
      </div>
    </Link>
  );
};
List.propTypes = {
  details: PropTypes.any,
};
export default List;
