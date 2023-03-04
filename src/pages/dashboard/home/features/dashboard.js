import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Select from "components/general/input/select";
import { DASHBOARD_FILTER, DATE_FILTER } from "utils/constants";
import HomeStore from "../store";
import { ReactComponent as RightArrow } from "assets/icons/arrow/chevron-right.svg";
import { ReactComponent as UpTrend } from "assets/icons/arrow/up-trend.svg";
import { ReactComponent as DownTrend } from "assets/icons/arrow/down-trend.svg";
import { ReactComponent as CashStack } from "assets/icons/cards/cash-stack.svg";
import { ReactComponent as Dollar } from "assets/icons/cards/dollar-span.svg";
import { ReactComponent as Food } from "assets/icons/cards/food.svg";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { ReactComponent as ArrowRight } from "assets/icons/arrow-right-gray.svg";

const DashBoard = () => {
  const [sortValue, setSortValue] = useState("");
  const [category, setCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sliceIndex, setSliceIndex] = useState(4);

  const { getBookings, date } = HomeStore;
  useEffect(() => {
    getBookings(1);
  }, []);

  Chart.register(...registerables);

  const data = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        label: "# of Votes",
        data: ["300", "200", "500", "800", "750", "500", "1000"],
        backgroundColor: ["#EDB800"],
        pointBackgroundColor: "#fff",
        borderColor: "#5887D7",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#909090",
          stepSize: 250,
          font: {
            size: 11,
          },
        },
        grid: {
          borderDash: [5, 5],
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: "#909090",
          stepSize: 250,
          font: {
            size: 11,
          },
        },
        offset: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const heading = ["Order Detail", "Category Name", "Order ID", "Price Value"];

  const body = [
    {
      row1: "2 Meals, 1 side",
      date: "25th of July at 3.00pm",
      row2: "MEAL",
      row3: "FCSDB32",
      sub: "Valerie Uba",
      row4: "$4,356",
      end: "Revenue",
    },
  ];

  const orders = [
    {
      title: "Total Orders",
      val: "205",
      icon: <Food />,
    },
    {
      title: "Average Order Value",
      val: "2,400",
      icon: <Dollar />,
    },
    {
      title: "Highest Order Amount",
      val: "2,400",
      icon: <CashStack />,
    },
    {
      title: "Lowest Order Amount",
      val: "2,400",
      icon: <CashStack />,
    },
    {
      title: "Average Daily Orders",
      val: "115",
      icon: <Food />,
    },
  ];

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
    <div className="flex flex-col justify-start items-start pb-5 h-full w-full">
      <div className="flex justify-between items-start w-full pt-5">
        <div className="flex scale-[0.8] pl-2">
          <Select
            placeholder="Sort values by category"
            value={sortValue}
            options={DASHBOARD_FILTER}
            onChange={(val) => setSortValue(val)}
          />
        </div>

        <div className="flex scale-[0.8] pr-10">
          <Select
            placeholder="Filter date"
            value={sortValue}
            options={DATE_FILTER}
            onChange={(val) => setSortValue(val)}
          />
        </div>
      </div>

      <div className="w-full pt-[16px] px-8">
        <div className="flex 4xs:flex-col mlg:flex-row w-full gap-[24px] items-start">
          <div className="grid w-full grid-cols-2  gap-[24px]">
            {orders.slice(0, sliceIndex).map((data, i) => (
              <div key={i} className="w-full 4xs:col-span-2 xs:col-span-1 1">
                <div className="flex border border-[#C8C8C8] py-4 px-6 rounded-[8px] items-center justify-between 4xs:gap-[10px] mlg:gap-[30px] w-full">
                  <div className="flex items-end justify-between w-full">
                    <div className="flex gap-6 items-center">
                      <div>{data?.icon}</div>
                      <div className="text-black">
                        <div className="text-[#909090] 4xs:text-[14px] lg:text-[15px]">
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
                  <div className="flex items-end justify-between w-[90%]">
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
                <Line options={options} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(DashBoard);
