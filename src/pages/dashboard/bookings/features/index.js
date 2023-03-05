import { orders } from "components/arrays/meals";
import React, { useState } from "react";
import All from "./tabs/All";
import Cancelled from "./tabs/Cancelled";
import Completed from "./tabs/Completed";
import Pending from "./tabs/Pending";
import Progress from "./tabs/Progress";

const BookingsHome = () => {
  const [tab, setTab] = useState("All Orders");
  const tabs = [
    "All Orders",
    "In Progress",
    "Pending",
    "Completed",
    "Cancelled",
  ];
  const { pending, progress, cancel, complete } = orders?.reduce(
    (acc, order) => {
      switch (order?.status) {
        case "Pending":
          return { ...acc, pending: [...acc.pending, order] };
        case "In Progress":
          return { ...acc, progress: [...acc.progress, order] };
        case "Cancelled":
          return { ...acc, cancel: [...acc.cancel, order] };
        case "Completed":
          return { ...acc, complete: [...acc.complete, order] };
        default:
          return acc;
      }
    },
    { pending: [], progress: [], cancel: [], complete: [] }
  );

  return (
    <div className="text-black w-full">
      <div className="flex mlg:flex-row 4xs:flex-col-reverse 4xs:gap-[25px] justify-between 4xs:items-start 1xs:items-center mlg:items-end border-b pb-[8px] border-b-[#acacac] w-full">
        <div className="flex 1xs:flex-row 4xs:flex-col gap-[32px] 4xs:pl-[35px] 1xs:pl-0 mlg:pl-[35px]">
          {tabs.map((data, i) => (
            <div
              key={i}
              onClick={() => setTab(data)}
              className={`${
                tab === data
                  ? "text-black font-medium underline underline-offset-[14px] decoration-2"
                  : "text-[#acacac]"
              } ${tab !== data ? "hover:text-[#4CB53A]" : ""} cursor-pointer`}
            >
              {data}
            </div>
          ))}
        </div>

        <div className="flex 4xs:ml-[30px] 1xs:ml-0 4xs:mr-0 mlg:mr-[35px] py-[8px] px-[18px] items-center text-[14px] gap-[15px] bg-[#D4EEF8] rounded-full">
          <div className="flex gap-[4px] items-center text-[#4A4A4A] ">
            <div className="text-red font-medium text-[16px]">6</div>
            <div className="text-[11px]">Tracking Orders</div>
          </div>
          <div className="bg-black h-[20px] w-[2px]" />
          <div className="flex  gap-[7px] items-center">
            <div className="text-green font-medium text-[16px]">2</div>
            <div className="text-[11px]">Pending Orders</div>
          </div>
        </div>
      </div>

      <div className="pl-[35px] w-full pt-[15px]">
        {tab === "All Orders" && <All />}
        {tab === "In Progress" && <Progress progress={progress} />}
        {tab === "Pending" && <Pending pending={pending} />}
        {tab === "Completed" && <Completed complete={complete} />}
        {tab === "Cancelled" && <Cancelled cancel={cancel} />}
      </div>
    </div>
  );
};

export default BookingsHome;
