import React from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";

import HomeStore from "pages/dashboard/home/store";
import { Button } from "components/general/button";
import { DEFAULT_AVATAR } from "utils/constants";
import { ReactComponent as Message } from "assets/icons/btn-message.svg";
import { ReactComponent as Report } from "assets/icons/report.svg";

const UserProfile = () => {
  const { currentBooking } = HomeStore;
  return (
    <div className="flex flex-col justify-start items-start w-full h-full border-r-1/2 border-grey-border py-8 px-7 space-y-2">
      <div className="flex flex-col justify-start items-start space-y-1 w-full relative pb-6">
        <div className="flex justify-start items-center w-fit space-x-6 pt-3">
          <div className="w-fit h-fit p-[4px] rounded-full border-b border-l border-blue-alt">
            <div
              className="w-[56px] h-[56px] rounded-full"
              style={{
                backgroundImage: `url(${
                  currentBooking?.user?.profile_image_url || DEFAULT_AVATAR
                })`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
              }}
            />
          </div>
          <div className="flex flex-col justify-center items-start space-y-2">
            <span className="text-base text-black regular-font">
              {" "}
              {currentBooking?.user?.first_name
                ? currentBooking?.user?.first_name +
                  " " +
                  currentBooking?.user?.last_name
                : "N/A"}{" "}
            </span>

            <span className="text-[13px] text-grey-text">
              Member since {moment(currentBooking?.user?.created_at).format("MMM Do, YYYY")}
            </span>
          </div>
        </div>
      </div>

      <Button text="Message" small icon={<Message />} fullWidth />
      <Button
        isOutline
        text="Report User"
        textColor="text-red-alt"
        borderColor="border-red-alt"
        icon={<Report />}
        small
        fullWidth
      />
    </div>
  );
};

export default observer(UserProfile);
