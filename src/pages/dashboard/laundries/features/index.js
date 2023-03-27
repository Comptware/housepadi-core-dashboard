import React, { useEffect, useMemo, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";

import { useTabs } from "hooks/useTabs";
import { ORDER_STATUSES } from "utils/constants";
import LaundriesStore from "../store";
import { ORDER_TABS } from "../utils";

const { INPROGRESS, PENDING, COMPLETED, CANCELLED } = ORDER_STATUSES;
const LaundriesHome = () => {
  const location = useLocation();
  const path = location.pathname;
  const containerRef = useRef(null);

  const {
    ordersCount,
    completedOrdersCount,
    pendingOrdersCount,
    cancelledOrdersCount,
    inProgressOrdersCount,
    getOrdersLoading,
  } = LaundriesStore;
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const { filterActiveTab, filterActiveContent, activeTabIndex } = useTabs({
    tabs: ORDER_TABS,
  });
  useEffect(() => {
    handleSlide();
  }, []);

  useEffect(() => {
    handleSlide();
  }, [path]);

  const handleSlide = () => {
    const width = containerRef?.current?.getBoundingClientRect()?.width;
    const slideContainerWidth = width / ORDER_TABS.length;
    const slideWidth = slideContainerWidth;
    const slidePosition = slideContainerWidth * activeTabIndex;
    setSliderWidth(slideWidth);
    setSliderPosition(slidePosition);
  };
  const activeTabObject = filterActiveTab();
  const orderCount = useMemo(() => {
    const status = activeTabObject?.status;
    switch (status) {
      case INPROGRESS:
        return { count: inProgressOrdersCount, text: "In-progress" };
      case PENDING:
        return { count: pendingOrdersCount, text: "Pending" };
      case COMPLETED:
        return { count: completedOrdersCount, text: "Completed" };
      case CANCELLED:
        return { count: cancelledOrdersCount, text: "Cancelled" };
      default:
        return { count: ordersCount, text: "Ongoing" };
    }
  }, [activeTabObject, getOrdersLoading]);

  return (
    <div className="text-black w-full">
      <div className="flex justify-between items-center w-full border-b-1/2 border-grey-border pl-6">
        <div className="flex justify-between items-center" ref={containerRef}>
          {ORDER_TABS.map(({ title, link }, index) => (
            <Link
              key={title + index}
              to={link}
              className={`w-[140px] h-fit p-3 text-center whitespace-nowrap text-base hover:bg-grey-lighter transition-all duration-300 ease-in-out rounded-t-lg ${
                path === link ? "text-green bold-font" : "text-grey-text"
              }`}
            >
              <span className="">{title} </span>
            </Link>
          ))}
        </div>

        <div className="flex 4xs:ml-[30px] 1xs:ml-0 4xs:mr-0 mlg:mr-[35px] py-[8px] px-[18px] items-center text-[14px] gap-[15px] bg-[#D4EEF8] rounded-full">
          <div className="flex gap-[4px] items-center text-[#4A4A4A] ">
            <div className="text-red font-medium text-[16px]">
              {orderCount?.count}
            </div>
            <div className="text-[11px]">
              {orderCount?.text} {orderCount.count <= 1 ? " Order" : " Orders"}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-fit  pl-6">
        <div
          className="h-[1.5px] bg-green rounded-lg transition-all duration-300 ease-in-out"
          style={{
            width: `${sliderWidth}px`,
            transform: `translateX(${sliderPosition}px)`,
          }}
        />
      </div>

      <div className="flex flex-col justify-start items-start h-full w-full max-h-[700px] rounded-lg overflow-y-scroll">
        {filterActiveContent()}
      </div>
    </div>
  );
};

export default observer(LaundriesHome);
