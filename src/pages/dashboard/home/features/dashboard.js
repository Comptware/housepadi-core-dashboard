import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Select from "components/general/input/select";
import { DASHBOARD_FILTER, DATE_FILTER } from "utils/constants";
import HomeStore from "../store";
import { ReactComponent as RightArrow } from "assets/icons/arrow/chevron-right.svg";
import { ReactComponent as UpTrend } from "assets/icons/arrow/up-trend.svg";
import { ReactComponent as DownTrend } from "assets/icons/arrow/down-trend.svg";
import { ReactComponent as ArrowRight } from "assets/icons/arrow-right-gray.svg";
import { body, heading, orders } from "components/arrays/dashboard";
import ChartArea from "./chart";
import SelectInput from "components/general/input/SelectInput";

const DashBoard = () => {
  const [sortValue, setSortValue] = useState("");
  const [category, setCategory] = useState("");
  const [sliceIndex, setSliceIndex] = useState(4);

  const { getBookings } = HomeStore;
  useEffect(() => {
    getBookings(1);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 1024) {
        setSliceIndex(orders.length);
      } else {
        setSliceIndex(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [orders]);

  return (
    <div className="flex text-black flex-col justify-start items-start pb-5 h-full w-full">
      <div className="w-full px-[30px]">
        <div className="flex justify-end">
          <SelectInput opt label="Filter Date" />
        </div>
        <div className="flex justify-start mt-[20px]">
          <SelectInput label="Sort values by category" />
        </div>
      </div>

      <div className="w-full pt-[16px] px-8">
        <div className="flex 4xs:flex-col mlg:flex-row w-full gap-[24px] items-start">
          <div className="grid w-full grid-cols-2 gap-[24px]">
            {orders.slice(0, sliceIndex).map((data, i) => (
              <div key={i} className="w-full 4xs:col-span-2 xs:col-span-1 1">
                <div className="flex border border-[#C8C8C8] py-4 px-6 rounded-[8px] items-center justify-between 4xs:gap-[10px] mlg:gap-[30px] w-full">
                  <div className="flex items-end justify-between w-full">
                    <div className="flex gap-6 items-center">
                      <div>{data?.icon}</div>
                      <div className="text-black">
                        <div className="text-[#909090] 4xs:text-[13px] lg:text-[15px]">
                          {data?.title}
                        </div>
                        <div className="text-[32px] flex gap-[10px] items-center mt-[8px] leading-none font-bold">
                          <span
                            className={`text-[30px] font-medium ${
                              [1, 3, 4].includes(i) ? "flex" : "hidden"
                            }`}
                          >
                            ₦
                          </span>{" "}
                          {data?.val}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${
                        i % 2 === 0
                          ? "bg-[#FBCFD4] text-[#C30D21]"
                          : "bg-[#C8F2C1] text-[#4CB53A]"
                      } flex gap-[6px] p-[5px] rounded-[4px]`}
                    >
                      {i % 2 === 0 ? <DownTrend /> : <UpTrend />}
                      <div className="text-[11px] font-medium">-2%</div>
                    </div>
                  </div>
                  <div>
                    <RightArrow />
                  </div>
                </div>
              </div>
            ))}
            <div className="border col-span-2 text-black border-[#C8C8C8] p-4 pr-0 rounded-[8px]">
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-[25px]">
                  <div>
                    <div className="text-[#1e1e1e] font-medium">
                      Recent Orders
                    </div>
                    <div className=" items-center gap-[11px] flex">
                      <div className="text-[#757575] text-[11px]">
                        View all orders
                      </div>
                      <div>
                        <ArrowRight />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex scale-[0.7]">
                  <Select
                    placeholder="Sort by date"
                    value={category}
                    options={DASHBOARD_FILTER}
                    onChange={(val) => setCategory(val)}
                  />
                </div>
              </div>
              <div className="mt-[20px] pr-4 overflow-x-auto">
                <table className="w-full order_table whitespace-nowrap">
                  <thead>
                    <tr>
                      {heading.map((data, i) => (
                        <th
                          className="border-b text-[11px] text-[#acacac] border-[#C8C8C8]"
                          key={i}
                        >
                          {data}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {body?.map((data, i) => (
                      <tr key={i}>
                        <td>
                          <div>{data.row1}</div>
                          <div>{data.date}</div>
                        </td>
                        <td>{data.row2}</td>
                        <td>
                          <div>{data.row3}</div>
                          <div>{data.sub}</div>
                        </td>
                        <td>
                          <div>{data.row4}</div>
                          <div>{data.end}</div>
                        </td>
                      </tr>
                    ))}
                    {body?.map((data, i) => (
                      <tr key={i}>
                        <td>
                          <div>{data.row1}</div>
                          <div>{data.date}</div>
                        </td>
                        <td>{data.row2}</td>
                        <td>
                          <div>{data.row3}</div>
                          <div>{data.sub}</div>
                        </td>
                        <td>
                          <div>{data.row4}</div>
                          <div>{data.end}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex mlg:flex-col 4xs:w-full mlg:w-[50%] gap-[24px] ">
            {orders?.slice(4, 5)?.map((data, i) => (
              <div key={i} className="mlg:flex 4xs:hidden w-[100%]">
                <div className="flex border border-[#C8C8C8] py-4 px-6 rounded-[8px] items-center justify-between gap-[30px] w-full">
                  <div className="flex items-end justify-between">
                    <div className="flex gap-6 items-center">
                      <div>{data?.icon}</div>
                      <div className="text-black">
                        <div className="text-[#909090]  text-[15px]">
                          {data?.title}
                        </div>
                        <div className="text-[32px] flex gap-[10px] items-center mt-[8px] leading-none font-bold">
                          <span
                            className={`text-[30px] font-medium ${
                              [1, 3, 4].includes(i) ? "flex" : "hidden"
                            }`}
                          >
                            ₦
                          </span>{" "}
                          {data?.val}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${
                        i % 2 === 0
                          ? "bg-[#FBCFD4] text-[#C30D21]"
                          : "bg-[#C8F2C1] text-[#4CB53A]"
                      } flex gap-[6px] p-[5px] rounded-[4px]`}
                    >
                      {i % 2 === 0 ? <DownTrend /> : <UpTrend />}
                      <div className="text-[11px] font-medium">-2%</div>
                    </div>
                  </div>
                  <div>
                    <RightArrow />
                  </div>
                </div>
              </div>
            ))}
            <div className="border w-full text-black border-[#C8C8C8] p-4 pr-0 rounded-[8px]">
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-[25px]">
                  <div>
                    <div className="text-[#757575]  text-[15px]">Revenue</div>
                    <div className="text-[22px] font-bold items-center  gap-[5px] flex">
                      {" "}
                      <span className="text-[21px] font-medium">₦</span> 500K
                    </div>
                  </div>
                  <div>
                    <RightArrow />
                  </div>
                </div>
                <div className="flex scale-[0.7]">
                  <Select
                    placeholder="Pick Category"
                    value={category}
                    options={DASHBOARD_FILTER}
                    onChange={(val) => setCategory(val)}
                  />
                </div>
              </div>
              <div className="h-[200px] mt-[20px]">
                <ChartArea />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(DashBoard);
