import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import RecentRequests from "../recentRequests";
import HomeStore from "../../store";

const Bookings = () => {
  const { getBookings } = HomeStore;
  useEffect(() => {
    getBookings(1);
  }, []);

  return (
    <div className="flex flex-col justify-start items-start h-full w-full">
      <div className="flex flex-row justify-start items-start h-fit  w-full bg-white p-4 border-b-1/2 border-grey-border">
        <h3 className="text-lg text-black regular-font">All Requests</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-start items-start md:h-full w-full mb-24 px-6 space-x-0 md:space-x-10">
        {/* Left column */}

        <div className="flex flex-col justify-start items-start h-full w-full space-y-7 pt-8 md:overflow-y-scroll">
          <span className="text-black text-[10px] uppercase regular-font">
            Last updated 2 hours ago
          </span>

          <RecentRequests />
        </div>
      </div>
    </div>
  );
};

export default observer(Bookings);
