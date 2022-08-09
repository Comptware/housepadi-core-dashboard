import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import HomeStore from "pages/dashboard/home/store";
import { ReactComponent as ArrowBack } from "assets/icons/arrow-back.svg";
import { findPath } from "utils/findPath";
import Overview from "./overview";
import UserProfile from "./profile";

const UserBookingsProfile = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleFindBooking } = HomeStore;
  const path = findPath(location, "/dashboard/bookings/user");

  useEffect(() => {
    handleFindBooking({ url: path.path, navigate, route: -1 });
  }, []);

  return (
    <div className="flex flex-col justify-start items-start h-full w-full">
      <div className="flex ustify-start items-center space-x-3 h-fit  w-full bg-white p-4 border-b-1/2 border-grey-border">
        <button
          type="button"
          className="flex justify-start items-center text-base text-black cursor-pointer underline text-left"
          onClick={() => navigate(-1)}
        >
          <ArrowBack className="mr-2" /> Back
        </button>
        <h3 className="text-lg text-black regular-font">User Profile</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-start items-start h-auto md:h-full w-full mb-24 pr-6 space-x-0 md:space-x-10 md:pb-8">
        {/* Left column */}

        <div className="flex flex-col basis-[100%] md:basis-[30%] h-full bg-white justify-start items-center space-y-7 md:overflow-y-scroll border-l-1/2 border-grey-border">
          {/* OutflowOverview */}
          <UserProfile />
        </div>
        {/* Right column */}
        <div className="flex flex-col basis-[100%] md:basis-[70%] justify-start items-start h-full w-full space-y-7 pt-8 md:overflow-y-scroll">
          <Overview />
        </div>
      </div>
    </div>
  );
});

export default UserBookingsProfile;
