import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import List from "components/general/list";
import { ReactComponent as ArrowRight } from "assets/icons/arrow-right.svg";
import CircleLoader from "components/general/circleLoader/circleLoader";
import HomeStore from "../store";

const RecentRequests = () => {
  const { loading, getBookings, bookings } = HomeStore;
  useEffect(() => {
    getBookings(1);
  }, []);

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-6 space-y-6">
      <div className="flex flex-col justify-start items-start w-full h-fit space-y-5 relative">
        {loading && (
          <div className="absolute w-full flex justify-center items-center h-[100px]">
            <CircleLoader blue />
          </div>
        )}

        {bookings.map((data) => (
          <List key={data?.id} listing={data} />
        ))}
      </div>
      <Link
        to="/#"
        className="flex justify-start items-center text-base text-blue-alt underline pb-10"
      >
        View all requests
        <ArrowRight className="ml-2" />
      </Link>

      <div className="w-full min-h-[100px]" />
    </div>
  );
};

export default observer(RecentRequests);
