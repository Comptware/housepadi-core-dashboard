import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";

import { SETTINGS_TABS } from "../utils";
import { useTabs } from "hooks/useTabs";

const LaundrySettingsHome = observer(() => {
  const location = useLocation();
  const path = location.pathname;
  const containerRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const { filterActiveContent, activeTabIndex } = useTabs({
    tabs: SETTINGS_TABS,
  });
  useEffect(() => {
    handleSlide();
  }, []);

  useEffect(() => {
    handleSlide();
  }, [path]);

  const handleSlide = () => {
    const width = containerRef?.current?.getBoundingClientRect()?.width;
    const slideContainerWidth = width / SETTINGS_TABS.length;
    const slideWidth = slideContainerWidth;
    const slidePosition = slideContainerWidth * activeTabIndex;
    setSliderWidth(slideWidth);
    setSliderPosition(slidePosition);
  };

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit rounded-lg">
      <div className="flex justify-between items-center w-full border-b-1/2 border-grey-border pl-10">
        <div
          className="flex justify-between items-center gap-3"
          ref={containerRef}
        >
          {SETTINGS_TABS.map(({ title, link }, index) => (
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
      </div>
      <div className="w-full h-fit pl-10">
        <div
          className="h-[1.5px] bg-green rounded-lg transition-all duration-300 ease-in-out"
          style={{
            width: `${sliderWidth}px`,
            transform: `translateX(${sliderPosition}px)`,
          }}
        />
      </div>

      <div className="flex flex-col justify-start items-start h-full w-full max-h-[700px] rounded-lg overflow-y-scroll p-6">
        {filterActiveContent()}
      </div>
    </div>
  );
});

export default LaundrySettingsHome;
