import React from "react";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";

import ChatTile from "components/general/chatTile";

const ChatList = observer(({ data }) => {

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-6 max-h-fit">
      {data?.map(({ user: { image, name }, id, label, time, status }, i) => {
        return (
          <ChatTile
            key={i + id}
            image={image}
            title={name}
            label={label}
            count={1}
            date={time}
            read={status === "read"}
          />
        );
      })}
    </div>
  );
});
ChatList.propTypes = {
  data: PropTypes.array,
};
export default ChatList;
