import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";

import { ReactComponent as Location } from "assets/icons/location.svg";
import { determineListingType } from "utils/listings";
import { Button } from "components/general/button";
import Table from "components/general/table/main";
import CheckBox from "components/general/input/checkBox";
import ChatTile from "components/general/chatTile";
const listingsHead = [
  "",
  "LISTING",
  "STATUS",
  "ACTIONS",
  "BED",
  "BATHROOM",
  "LOCATION",
];
const ChatList = observer(({ data }) => {
  const [checked, setChecked] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    handleGlobalCheckboxChange();
  }, [checked]);

  const handleCheckboxChange = (item) => {
    let newArr = [...selectedRows, item];
    newArr = [...new Set(newArr)];
    let match = selectedRows?.find((el) => el === item);
    if (match) {
      newArr = newArr.filter((itm) => itm !== item);
    }
    setSelectedRows(newArr);
  };

  const handleGlobalCheckboxChange = () => {
    let newArr = checked ? data?.map(({ id }) => id) : [];
    setSelectedRows(newArr);
  };
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
            read={status === "read" ? true : false}
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
