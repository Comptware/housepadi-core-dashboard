import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";

import UserProfile from "pages/dashboard/home/features/userProfile";
import HomeStore from "pages/dashboard/home/store";
import Listings from "./bookings";
import Overview from "./overview";

const BookingsHome = observer(() => {
  const listTopRef = useRef(null);
  const { bookings } = HomeStore;

  useEffect(() => {
    return scrollToListTop();
  }, [bookings]);

  const scrollToListTop = () => listTopRef?.current?.scrollIntoView();
  return (
    <div className="flex flex-col justify-start items-start h-full w-full">
      <div className="flex flex-row justify-start items-start h-fit  w-full bg-white p-4 border-b-1/2 border-grey-border">
        <h3 className="text-lg text-black regular-font">Your Bookings</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-start items-start h-auto md:h-full w-full mb-24 px-6 space-x-0 md:space-x-10 md:pb-8">
        {/* Left column */}

        <div className="flex flex-col basis-[100%] md:basis-[70%] justify-start items-start h-full w-full space-y-7 pt-8 md:overflow-y-scroll">
          <div ref={listTopRef} />
          {/* Listings */}
          <Listings />

          <Overview />
        </div>

        {/* Right column */}
        <div className="flex flex-col basis-[100%] md:basis-[30%] h-full bg-white justify-start items-center space-y-7 md:overflow-y-scroll border-l-1/2 border-grey-border">
          {/* OutflowOverview */}
          <UserProfile />
        </div>
      </div>
    </div>
  );
});

export default BookingsHome;
