import React, { useState } from "react";
import { ReactComponent as RightArrow } from "assets/icons/arrow/chevron-right.svg";
import { ReactComponent as CircleInfo } from "assets/icons/circle-info.svg";
import { ReactComponent as Dots } from "assets/icons/dots.svg";
import { ReactComponent as ChevronUp } from "assets/icons/arrow/chevron-up.svg";
import SelectInput from "components/general/input/SelectInput";
import {
  extras,
  filtered,
  orders,
  sides,
  status,
} from "components/arrays/meals";

const All = () => {
  const ref = React.useRef(null);
  const [filter, setFilter] = useState("");
  const [stats, setStats] = useState("");
  const [pull, setPull] = useState("");
  const [drop, setDrop] = useState(false);

  const scroll = (direction) => {
    if (direction === "left") {
      ref.current.scrollLeft -= 1000;
    } else {
      ref.current.scrollLeft += 1000;
    }
  };

  return (
    <div>
      <div className="w-fit">
        <SelectInput
          label="Recent"
          array={filtered}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <div className="flex pr-[25px] items-center justify-end mb-[10px] gap-[5px]">
        <div
          onClick={() => scroll("left")}
          className="transform rotate-180 bg-[#DEDEDE] text-[15px] rounded-full py-[7px] px-[7px]  cursor-pointer"
        >
          <RightArrow className="w-[20px] h-[20px]" />
        </div>
        <div
          onClick={() => scroll("right")}
          className="bg-[#DEDEDE] gap-[10px] text-[15px] items-center flex rounded-full py-[8px] px-[16px]  cursor-pointer"
        >
          <div>Next</div>
          <div>
            <RightArrow className="w-[20px] h-[20px]" />
          </div>
        </div>
      </div>

      <div className="flex pb-5 overflow-x-scroll scrolling" ref={ref}>
        {orders.map((data, i) => (
          <div
            key={i + 1}
            className="mr-[20px] border border-[#e0e0e0] rounded-[8px] min-w-[389px] px-[16px] py-[12px]"
          >
            <div className="border-b pb-[16px] border-[#E0E0E0]">
              <div className="flex justify-between">
                <div>
                  <div className="text-[#2d2d2d]">5CFF59</div>
                  <div className="text-[12px] text-[#ACACAC]">
                    Valerie Church
                  </div>
                </div>
                <div>
                  {data?.status ? (
                    <SelectInput stat={data?.status} />
                  ) : (
                    <SelectInput
                      label="Set Status"
                      array={status}
                      filter={stats}
                      setFilter={setStats}
                    />
                  )}
                </div>
              </div>
              <div className="flex mt-[16px] justify-between items-center bg-[#E5F5FB] p-[8px] rounded-[4px]">
                <div className="flex gap-[8px] items-center">
                  <div className="bg-white p-[6px] rounded-[4px]">
                    <CircleInfo />
                  </div>
                  <div className="text-[#acacac] text-[12px]">
                    Address:
                    <span className="text-black font-medium"> Chevron</span>
                  </div>
                </div>
                <div>
                  <Dots />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between pt-[16px]">
                <div className="text-[#909090] text-[14px]">Order Details</div>
                <div className="text-[12px]">2 mins ago</div>
              </div>

              <div className="flex pb-[16px] mt-[20px] justify-between">
                <div className="flex gap-[28px]">
                  <div className="text-[#C30D21] font-medium">1x</div>
                  <div className="text-[12px]">
                    <div className="text-black">
                      Pulled BBQ Chicken Shawarma
                    </div>
                    <div className="text-[#757575] w-[80%]">
                      Special shawarma loaded with pulled BBQ chicken with
                      veggies & special sauce
                    </div>
                  </div>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setDrop((prev) => !prev);
                    setPull(data.id);
                  }}
                >
                  {pull === data.id && drop ? (
                    <div className="transform rotate-180">
                      <ChevronUp />
                    </div>
                  ) : (
                    <ChevronUp />
                  )}
                </div>
              </div>

              {pull === data.id && drop ? (
                <div className="mt-[16px]">
                  <div className="text-[12px] text-[#909090]">Extras</div>
                  {extras.map((data, i) => (
                    <div
                      key={i}
                      className="flex mt-[12px] justify-between text-[13px]"
                    >
                      <div className="flex gap-[12px] items-center">
                        <div className="border border-[#C30D21] h-[16px] w-[16px] rounded-[3px]" />
                        {data.title}
                      </div>
                      <div>{data.price}</div>
                    </div>
                  ))}
                  <div className="mt-[12px] text-[12px] text-[#909090]">
                    Sides
                  </div>
                  {sides.map((data, i) => (
                    <div
                      key={i}
                      className="flex mt-[12px] justify-between text-[13px]"
                    >
                      <div className="flex gap-[8px]">
                        <div className="flex gap-[12px] items-center">
                          <div className="border border-[#C30D21] h-[16px] w-[16px] rounded-[3px]" />
                          {data.title}
                        </div>
                        <div className="bg-[#FBCFD4] flex flex-col justify-center text-[#C30D21] font-medium text-[11px] rounded-full py=[3px] px-[13px]">
                          x 1
                        </div>
                      </div>
                      <div>{data.price}</div>
                    </div>
                  ))}
                  <div className="mt-[12px] text-[12px] text-[#909090]">
                    Drinks
                  </div>
                  <div className="flex pb-[18px] mt-[12px] justify-between text-[13px]">
                    <div className="flex gap-[8px]">
                      <div className="flex gap-[12px] items-center">
                        <div className="border border-[#C30D21] h-[16px] w-[16px] rounded-[3px]" />
                        Malta Guiness
                      </div>
                      <div className="bg-[#FBCFD4] flex flex-col justify-center text-[#C30D21] font-medium text-[11px] rounded-full py=[3px] px-[13px]">
                        x 1
                      </div>
                    </div>
                    <div>₦ 760</div>
                  </div>
                  <div className="flex border-[#e0e0e0] border-t pt-[16px] items-center justify-between">
                    <div>
                      <div className="text-[13px] text-[#acacac]">Total</div>
                      <div className="mt-[8px] text-[22px] font-bold">
                        ₦ 6,650
                      </div>
                    </div>

                    <div className="border text-red border-red rounded-full py-1 flex flex-col justify-center items-center px-5">
                      Cancel
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex border-[#e0e0e0] border-t pt-[16px] items-center justify-between">
                  <div>
                    <div className="text-[13px] text-[#acacac]">Total</div>
                    <div className="mt-[8px] text-[22px] font-bold">
                      ₦ 6,650
                    </div>
                  </div>

                  <div className="border text-red border-red rounded-full py-1 flex flex-col justify-center items-center px-5">
                    Cancel
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default All;
