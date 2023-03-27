import React, { useEffect, useState, useMemo } from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { MdRefresh } from "react-icons/md";
import Select from "components/general/input/select";
import CircleLoader from "components/general/circleLoader/circleLoader";
import { ReactComponent as CashStack } from "assets/icons/cards/cash-stack.svg";
import { ReactComponent as Dollar } from "assets/icons/cards/dollar-span.svg";
import { ReactComponent as Food } from "assets/icons/cards/food.svg";

import { filterRangeOptions } from "utils/date";
import DateModal from "components/general/Modal/dateModal";
import HomeStore from "../store";
import { numberWithCommas } from "utils/formatter";

const DashBoard = () => {
  const [dateFilter, setDateFilter] = useState([filterRangeOptions[0]]);
  const [dateFilters, setDateFilters] = useState(filterRangeOptions);
  const [showDateModal, setShowDateModal] = useState(false);
  const { getStats, getStatsLoading, stats } = HomeStore;

  const handleGetData = () => {
    dateFilter?.[0]?.startDate &&
      getStats({
        startDate: dateFilter?.[0]?.startDate,
        endDate: dateFilter?.[0]?.endDate,
      });
  };
  useEffect(() => {
    handleGetData();
  }, [dateFilter]);

  const handleDateFilterchange = (val) => {
    setDateFilter(val);
    if (
      moment(val[0]?.endDate).valueOf() !== moment(val[0]?.startDate).valueOf()
    ) {
      handleUpdateDateFilters(val);
    }
  };
  const handleUpdateDateFilters = (date) => {
    const dateVal = date[0] || dateFilter[0];
    const dateRange = `${moment(dateVal.startDate).format(
      "DD MMM YY"
    )} - ${moment(dateVal.endDate).format("DD  MMM YY")}`;
    const newDateFilter = {
      ...dateVal,
      value: dateRange,
      label: dateRange,
    };
    setDateFilter([newDateFilter]);
    setDateFilters([...filterRangeOptions, newDateFilter]);
    setShowDateModal(false);
  };

  const statsList = useMemo(
    () => [
      {
        title: "Total Orders",
        val: numberWithCommas(stats?.totalNumberOfUserRequests || 0),
        icon: <Food />,
      },
      {
        title: "Average Order Value",
        val: numberWithCommas(stats?.averageOrderAmount || 0),
        icon: <Dollar />,
      },
      {
        title: "Highest Order Amount",
        val: numberWithCommas(stats?.maximumOrderAmount || 0),
        icon: <CashStack />,
      },
      {
        title: "Lowest Order Amount",
        val: numberWithCommas(stats?.minimumOrderAmount || 0),
        icon: <CashStack />,
      },
      {
        title: "Total Revenue",
        val: numberWithCommas(stats?.totalRevenue || 0),
        icon: <CashStack />,
      },
    ],
    [stats]
  );
  return (
    <div className="flex text-black flex-col justify-start items-start pb-5 h-full w-full relative">
      <div className="flex justify-between items-center w-full px-[30px] mb-8">
        <Select
          placeholder="Filter by date"
          value={dateFilter}
          onChange={(val) => {
            if (val?.value === "custom") {
              setShowDateModal(true);
            } else {
              setDateFilter([val]);
            }
          }}
          options={dateFilters}
        />
        <button
          onClick={() => handleGetData()}
          className="flex justify-start items-center text-black underline text-sm pr-3 gap-x-1"
          type="button"
        >
          Refresh
          <MdRefresh
            className={`text-grey ${getStatsLoading && " animate-spin "} `}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-between items-start w-full  px-[30px]">
        {statsList.map((data, i) => (
          <div key={i} className="w-full 4xs:col-span-2 xs:col-span-1 1">
            <div className="flex border border-[#C8C8C8] py-4 px-6 rounded-[8px] items-center justify-between 4xs:gap-[10px] mlg:gap-[20px] w-full">
              <div className="flex items-end justify-between w-full">
                <div className="flex gap-6 items-center">
                  <div>{data?.icon}</div>
                  <div className="text-black">
                    <div className="text-[#909090] 4xs:text-[13px] lg:text-[15px]">
                      {data?.title}
                    </div>

                    <div className="text-[24px] flex gap-[10px] items-center mt-[8px] leading-none font-bold">
                      {getStatsLoading ? (
                        <CircleLoader blue size="tiny" />
                      ) : (
                        <>
                          <span
                            className={`text-[30px] font-medium ${
                              [1, 2, 3, 4].includes(i) ? "flex" : "hidden"
                            }`}
                          >
                            &#8358;
                          </span>
                          {data?.val}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DateModal
        toggleModal={() => setShowDateModal(false)}
        active={showDateModal}
        onChange={(item) => handleDateFilterchange([item.selection])}
        ranges={dateFilter}
        maxDate={new Date()}
      />
    </div>
  );
};

export default observer(DashBoard);
