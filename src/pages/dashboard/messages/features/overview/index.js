import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";

import Avatar from "assets/images/avatar.png";
import ChatList from "./chatList";
const Overview = observer(() => {
  const data = [
    {
      user: { image: Avatar, name: "Taiwo Harry" },
      label:
        "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ...",
      time: "5 mins",
      status: "unread",
      id: "01",
    },
    {
      user: { image: Avatar, name: "Taiwo Harry" },
      label:
        "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ...",
      time: "5 mins",
      status: "unread",
      id: "02",
    },
    {
      user: { image: Avatar, name: "Taiwo Harry" },
      label:
        "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ...",
      time: "5 mins",
      status: "unread",
      id: "03",
    },
    {
      user: { image: Avatar, name: "Taiwo Harry" },
      label:
        "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ...",
      time: "5 mins",
      status: "unread",
      id: "04",
    },
    {
      user: { image: Avatar, name: "Taiwo Harry" },
      label:
        "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ...",
      time: "5 mins",
      status: "unread",
      id: "05",
    },

    {
      user: { image: Avatar, name: "Taiwo Harry" },
      label:
        "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ...",
      time: "5 mins",
      status: "read",
      id: "06",
    },
    {
      user: { image: Avatar, name: "Taiwo Harry" },
      label:
        "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ...",
      time: "5 mins",
      status: "read",
      id: "07",
    },
    {
      user: { image: Avatar, name: "Taiwo Harry" },
      label:
        "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ...",
      time: "5 mins",
      status: "read",
      id: "08",
    },
    {
      user: { image: Avatar, name: "Taiwo Harry" },
      label:
        "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ...",
      time: "5 mins",
      status: "read",
      id: "09",
    },
    {
      user: { image: Avatar, name: "Taiwo Harry" },
      label:
        "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ...",
      time: "5 mins",
      status: "read",
      id: "10",
    },
  ];

  const readMessages = data.filter(({ status }) => status === "read");
  const unReadMessages = data.filter(({ status }) => status === "unread");
  const containerRef = useRef(null);
  const tabs = [
    {
      title: `Unread (${unReadMessages.length})`,
      content: <ChatList data={unReadMessages} />,
    },
    {
      title: "Opened",
      content: <ChatList data={readMessages} />,
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
