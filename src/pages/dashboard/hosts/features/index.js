import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import UserProfile from "pages/dashboard/home/features/userProfile";
import HostStore from "../store";
import Overview from "./overview";

const ListingsHome = observer(() => {
  const { getHosts, hostCount } = HostStore;
  // useEffect(() => {
  //   getHosts(1);
  // }, []);
  return (
    <div className="flex flex-col justify-start items-start h-full w-full">
      <div className="flex flex-row justify-start items-start h-fit  w-full bg-white p-4 border-b-1/2 border-grey-border">
        <h3 className="text-lg text-black regular-font">
          Agents ({hostCount})
        </h3>
      </div>

      <div className="flex flex-col md:flex-row justify-start items-start h-auto md:h-full w-full mb-24 px-3 sm:px-6 space-x-0 md:space-x-10 md:pb-8">
        {/* Left column */}

        <div className="flex flex-col basis-[100%] mlg:basis-[70%] justify-start items-start h-full w-full space-y-7 pt-8 md:overflow-y-scroll">
          <Overview />
        </div>

        {/* Right column */}
        <div className="hidden mlg:flex flex-col basis-[100%] mlg:basis-[30%] h-full bg-white justify-start items-center space-y-7 md:overflow-y-scroll border-l-1/2 border-grey-border">
          {/* OutflowOverview */}
          <UserProfile />
        </div>
      </div>
    </div>
  );
});

export default ListingsHome;
