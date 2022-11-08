import React from "react";
import { Chart, registerables } from "chart.js";
import { observer } from "mobx-react-lite";

import HomeStore from "pages/dashboard/home/store";
Chart.register(...registerables);

const Bookings = () => {
  const { bookingsCount } = HomeStore;
  return (
    <div className="flex justify-between items-start w-full h-fit space-x-10">
      <div className="flex flex-col justify-start items-start space-y-2 w-full relative">
        <span className="text-2xl text-black regular-font">
          {bookingsCount}
        </span>
        <span className="text-[13px] text-black">Total bookings </span>
      </div>
    </div>
  );
};

export default observer(Bookings);
