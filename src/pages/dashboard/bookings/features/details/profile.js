import React from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";

import HomeStore from "pages/dashboard/home/store";
import { Button } from "components/general/button";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentBooking } = HomeStore;
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start w-full h-fit space-x-10 border-b-1/2 border-grey-border pb-10">
      <div className="flex flex-col justify-start items-start space-y-1 w-full relative">
        <span className="text-2xl text-black regular-font">
          {currentBooking?.shortlet?.name}
        </span>
        <span className="text-[13px] text-grey-text">
          Received {moment(currentBooking?.updated_at).fromNow()}{" "}
        </span>

        <div className="flex justify-start items-center w-fit space-x-6 pt-3">
          <div className="flex flex-col justify-center items-start">
            <div
              alt="img"
              className={`w-[48px] h-[48px] rounded`}
              style={{
                backgroundImage: `url(${currentBooking?.shortlet?.images[0]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
              }}
            />
          </div>
          <div className="flex flex-col justify-center items-start space-y-2">
            <span className="text-base text-black regular-font">
              {" "}
              {currentBooking?.user?.first_name
                ? currentBooking?.user?.first_name +
                  " " +
                  currentBooking?.user?.last_name
                : "N/A"}{" "}
            </span>

            <Link
              className="text-xs text-green underline cursor-pointer"
              to={`/dashboard/users/${currentBooking?.user?.id}`}
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
      {/* {!currentBooking?.paid && (
        <div className="flex justify-start items-start space-x-3 w-fit">
          <Button
            isOutline
            text="Decline"
            textColor="text-red-alt"
            borderColor="border-red-alt"
            small
          />
          <Button text="Accept" small />
        </div>
      )} */}
    </div>
  );
};

export default observer(Profile);
