import React from "react";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import moment from "moment";

import ChatTile from "components/general/chatTile";
import { DEFAULT_AVATAR } from "utils/constants";
import MessagesStore from "../../store";

const ChatList = ({ data }) => {
  const { setCurrentChat } = MessagesStore;

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-2 md:p-6 max-h-fit">
      {data?.map(
        (
          {
            userImage,
            userName,
            lastMessage,
            lastMessageAt,
            userId,
            userPhoneNumber,
            unreadUserChats,
            ...rest
          },
          i
        ) => {
          return (
            <ChatTile
              key={i}
              image={userImage || DEFAULT_AVATAR}
              title={userName}
              label={lastMessage}
              count={unreadUserChats}
              date={moment(new Date(lastMessageAt?.toDate())).fromNow()}
              read={unreadUserChats < 1}
              onClick={() => {
                setCurrentChat({
                  userImage,
                  userName,
                  lastMessage,
                  lastMessageAt,
                  userId,
                  userPhoneNumber,
                  unreadUserChats,
                  ...rest,
                });
              }}
            />
          );
        }
      )}
    </div>
  );
};
ChatList.propTypes = {
  data: PropTypes.array,
};
export default observer(ChatList);
