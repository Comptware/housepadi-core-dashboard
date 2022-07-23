import React from "react";
import PropTypes from "prop-types";

const Chat = ({ image, title, messages, date, isUser }) => {
  return (
    <div
      className={`bg-white flex justify-between items-start w-full h-fit pb-6 ${
        isUser ? "flex-row-reverse" : "space-x-6 "
      }`}
    >
      <div className="w-fit h-fit">
        <div
          className={`w-[40px] h-[40px] rounded-full ${isUser ? "ml-6" : ""}`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
          }}
        />
      </div>

      <div
        className={`flex flex-col justify-center space-y-3 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`flex justify-start items-start pb-3 
                        ${isUser ? "flex-row-reverse" : "space-x-2"}`}
        >
          <p className="text-sm text-blue-sky regular-font">{title}</p>
          <span
            className={`text-[11px] text-grey-text light-font  ${
              isUser ? "mr-2" : ""
            }`}
          >
            {date}
          </span>
        </div>

        {messages?.map((msg, i) => (
          <div
            className={`
          p-4 rounded-t-[14px] 
          ${
            i === messages.length - 1
              ? "rounded-br-[14px] rounded-bl-0"
              : "rounded-b-[14px]"
          } 
          ${isUser ? "text-white bg-blue-sky" : "bg-grey-alt text-black"}`}
            key={i}
          >
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};
Chat.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  isUser: PropTypes.bool,
  date: PropTypes.string,
  messages: PropTypes.array,
};
export default Chat;
