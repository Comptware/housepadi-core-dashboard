import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";

import Listings from "./listings";
import RecentRequests from "./recentRequests";
import UserProfile from "./userProfile";
import HomeStore from "../store";

const DashBoard = () => {
  const { getBookings, date } = HomeStore;
  useEffect(() => {
    getBookings(1);
  }, []);

  return (
    <div className="flex flex-col justify-start items-start h-full w-full">
      <div className="flex flex-row justify-start items-start h-fit  w-full bg-white p-4 border-b-1/2 border-grey-border">
        <h3 className="text-lg text-black regular-font">Overview</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-start items-start md:h-full w-full mb-24 px-6 space-x-0 md:space-x-10">
        {/* Left column */}

        <div className="flex flex-col basis-[100%] md:basis-[70%] justify-start items-start h-full w-full space-y-7 pt-8 md:overflow-y-scroll">
          {/* Listings */}
          <Listings />
          <div className="flex flex-col justify-start items-start space-y-1">
            <h3 className="text-lg text-grey-text medium-font">
              Recent Bookings
            </h3>
            <span className="text-black text-[10px] uppercase regular-font">
              Last updated {moment(date).fromNow()}
            </span>
          </div>

          <RecentRequests />
        </div>

        {/* Right column */}
        <div className="flex flex-col basis-[100%] md:basis-[30%] h-full bg-white justify-start items-center space-y-7 md:overflow-y-scroll border-l-1/2 border-grey-border">
          {/* OutflowOverview */}
          <UserProfile />
          <div className="w-full min-h-[100px]" />
        </div>
      </div>
    </div>
  );
};

export default observer(DashBoard);
