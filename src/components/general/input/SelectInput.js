import React, { useState } from "react";
import { CaretDown } from "assets/icons";

const SelectInput = ({ array, label, stat, opt, filter, setFilter }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      {stat ? (
        <div
          className={`border ${
            stat === "In Progress" || stat === "Pending"
              ? "bg-[#F7F6DA] text-[#B5B03A] border-[#B5B03A]"
              : stat === "Completed"
              ? "bg-[#DEF7DA] text-[#4CB53A] border-[#4CB53A]"
              : stat === "Cancelled"
              ? "bg-[#FBCFD4] text-[#C30D21] border-[#C30D21]"
              : ""
          } flex text-[12px] items-center  rounded-full gap-[2px] py-[5px] p-[10px] `}
        >
          {stat}
          <div>
            <CaretDown
              fill={
                stat === "In Progress" || stat === "Pending"
                  ? "#B5B03A"
                  : stat === "Completed"
                  ? "#4CB53A"
                  : stat === "Cancelled"
                  ? "#C30D21"
                  : "#2D2D2D"
              }
            />
          </div>
        </div>
      ) : (
        <>
          <div
            onClick={() => setShow((prev) => !prev)}
            className={`border cursor-pointer ${
              filter === "In Progress" || filter === "Pending"
                ? "bg-[#F7F6DA] text-[#B5B03A] border-[#B5B03A]"
                : filter === "Completed"
                ? "bg-[#DEF7DA] text-[#4CB53A] border-[#4CB53A]"
                : filter === "Cancelled"
                ? "bg-[#FBCFD4] text-[#C30D21] border-[#C30D21]"
                : ""
            } flex text-[12px] items-center border-[#909090] rounded-full gap-[2px] py-[5px] p-[10px] `}
          >
            {!filter ? label : filter}
            <div>
              <CaretDown
                fill={
                  filter === "In Progress" || filter === "Pending"
                    ? "#B5B03A"
                    : filter === "Completed"
                    ? "#4CB53A"
                    : filter === "Cancelled"
                    ? "#C30D21"
                    : "#2D2D2D"
                }
              />
            </div>
          </div>
          {show && (
            <div
              className={`absolute text-[15px] min-w-[150px] mt-1 ${
                opt ? "right-0" : "left-0"
              } bg-white shadow-lg p-3 rounded-md`}
            >
              {array?.map((data, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setShow(false);
                    setFilter(data);
                  }}
                  className="cursor-pointer hover:bg-[#f1f1f1] hover:rounded-md px-[10px] py-[5px] mb-[5px]"
                >
                  {data}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SelectInput;
