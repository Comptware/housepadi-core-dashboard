import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";

import ListingStore from "../../store/index";
import AllListings from "./allListings";
const Overview = observer(() => {
  const { listings } = ListingStore;

  const containerRef = useRef(null);
  const tabs = [
    {
      title: "All",
      content: <AllListings data={listings} />,
    },
    {
      title: "Drafts",
      content: (
        <AllListings
          data={listings.filter(({ status }) => status === "draft")}
        />
      ),
    },
    {
      title: "Unoccupied",
      content: (
        <AllListings
          data={listings.filter(({ status }) => status === "unreserved")}
        />
      ),
    },
    {
      title: "Reserved",
      content: (
        <AllListings
          data={listings.filter(({ status }) => status === "reserved")}
        />
      ),
    },
  ];
  const [activeTab, setActiveTab] = useState({
    title: tabs[0].title,
    index: 0,
  });
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);

  useEffect(() => {
    handleSlide();
  }, []);

  useEffect(() => {
    handleSlide();
  }, [activeTab]);

  const handleSlide = () => {
    const width = containerRef?.current?.getBoundingClientRect()?.width;
    const slideContainerWidth = width / tabs.length;
    const slideWidth = slideContainerWidth;
    const slidePosition = slideContainerWidth * activeTab.index;
    setSliderWidth(slideWidth);
    setSliderPosition(slidePosition);
  };
  return (
    <div className="flex flex-col justify-start items-start w-full h-fit rounded-lg">
      <div className="flex justify-between items-center w-full border-b-1/2 border-grey-border">
        <div className="flex justify-between items-center" ref={containerRef}>
          {tabs.map(({ title }, index) => (
            <button
              key={title + index}
              className={`w-[100px] h-fit p-3 text-center whitespace-nowrap text-base hover:bg-grey-lighter transition-all duration-300 ease-in-out rounded-t-lg ${
                activeTab?.title === title
                  ? "text-blue medium-font"
                  : "text-grey-text"
              }`}
              onClick={() => setActiveTab({ title, index })}
            >
              <span className="">{title} </span>
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-fit">
        <div
          className="h-[1.5px] bg-blue rounded-lg transition-all duration-300 ease-in-out"
          style={{
            width: `${sliderWidth}px`,
            transform: `translateX(${sliderPosition}px)`,
          }}
        />
      </div>

      <div className="flex flex-col justify-start items-start h-full w-full max-h-[700px] rounded-lg overflow-y-scroll">
        {tabs
          .filter(({ title }) => title === activeTab?.title)
          .map(({ content }, index) => (
            <div key={index} className="w-full h-full rounded-lg">
              {content}
            </div>
          ))}
      </div>
    </div>
  );
});

export default Overview;
