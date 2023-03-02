import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Select from "components/general/input/select";
import { DASHBOARD_FILTER, DATE_FILTER } from "utils/constants";
import HomeStore from "../store";

const DashBoard = () => {
  const [sortValue, setSortValue] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const { getBookings, date } = HomeStore;
  useEffect(() => {
    getBookings(1);
  }, []);

  return (
    <div className="flex flex-col justify-start items-start h-full w-full">
      <div className="flex justify-between items-start w-full pt-5">
        <div className="flex scale-[0.75] ">
          <Select
            placeholder="Sort values by category"
            value={sortValue}
            options={DASHBOARD_FILTER}
            onChange={(val) => setSortValue(val)}
          />
        </div>

        <div className="flex scale-[0.75] ">
          <Select
            placeholder="Filter date"
            value={sortValue}
            options={DATE_FILTER}
            onChange={(val) => setSortValue(val)}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-start items-start md:h-full w-full mb-24 px-3 sm:px-6 space-x-0 md:space-x-10">
        {/* Left column */}

        <div className="flex flex-col basis-[100%] mlg:basis-[70%] justify-start items-start h-full w-full space-y-7 pt-8 md:overflow-y-scroll">
          <span className="text-black text-lg">Left</span>
        </div>
        <div className="flex flex-col basis-[100%] mlg:basis-[70%] justify-start items-start h-full w-full space-y-7 pt-8 md:overflow-y-scroll">
          <span className="text-black text-lg">Right</span>
        </div>
      </div>
    </div>
  );
};

export default observer(DashBoard);
