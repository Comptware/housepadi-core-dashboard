import React, { useState } from "react";
import { ReactComponent as Hairpin } from "assets/icons/hairpin.svg";
import { ReactComponent as Delete } from "assets/icons/delete.svg";
import Avatar from "assets/images/avatar.png";
import { ArrowButton } from "components/general/button";
import Input from "components/general/input/input";
import Chat from "components/general/chat";

const chats = [
  {
    image: Avatar,
    title: "Sammy Swiss",
    date: "7 mins ago",
    isUser: false,
    messages: [
      "Incididunt",
      "Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
    ],
  },
  {
    image: Avatar,
    title: "Taiwo Harry",
    date: "5 mins ago",
    isUser: true,
    messages: [
      `Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea `,
    ],
  },
];
const ChatSection = () => {
  const [message, setMessage] = useState("");
  return (
    <div className="bg-white flex flex-col justify-start items-start w-full relative h-full">
      <div className="bg-white flex justify-between items-center w-full space-x-4 py-4 px-6 absolute right-0 top-[0px] z-[9999] border-1/2 border-grey-border">
        <div className="flex justify-start items-center w-fit space-x-4">
          <div className="w-fit h-fit">
            <div
              className="w-[42px] h-[42px] rounded-full"
              style={{
                backgroundImage: `url(${Avatar})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
              }}
            />
          </div>
          <span className="text-lg text-black medium-font whitespace-nowrap">
            Taiwo Harry{" "}
          </span>
          <p className="text-base text-grey-text text-left w-full whitespace-nowrap">
            +234123454321
          </p>
        </div>

        <Delete />
      </div>
      <div className="flex flex-col justify-start items-start w-full h-full bg-white py-8 px-7 my-[80px] border-b-1/2 border-grey-border relative overflow-y-scroll">
        {chats?.map(({ image, title, date, isUser, messages }, i) => {
          return (
            <Chat
              key={i}
              image={image}
              title={title}
              messages={messages}
              date={date}
              isUser={isUser}
            />
          );
        })}
      </div>
      <div className="flex justify-between items-center w-full mt-auto space-x-4 py-3 pl-14 pr-6 absolute right-0 bottom-[10px]">
        <Hairpin />
        <Input
          onChangeFunc={(e) => {
            setMessage(e);
          }}
          placeholder="Write Message"
          value={message}
        />
        <ArrowButton />
      </div>
    </div>
  );
};
export default ChatSection;
