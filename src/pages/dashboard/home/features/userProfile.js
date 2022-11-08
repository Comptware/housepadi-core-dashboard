import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { FaSwimmingPool } from "react-icons/fa";

import { ReactComponent as Host } from "assets/icons/host.svg";
import CommonStore from "stores/common";
import { EditButton } from "components/general/button";
import CircleLoader from "components/general/circleLoader/circleLoader";
import { DEFAULT_AVATAR } from "utils/constants";

const UserProfile = () => {
  const { loadingFetchMe, getMe, me } = CommonStore;

  useEffect(() => {
    !me && getMe();
  }, []);
  return (
    <div className="flex flex-col justify-start items-start w-full h-full bg-white py-8 px-7 border-b-1/2 border-grey-border">
      <div className="flex justify-start items-center w-fit mb-5 space-x-4 relative">
        {loadingFetchMe && (
          <div className=" w-full flex justify-center items-center h-full">
            <CircleLoader blue />
          </div>
        )}
        {!loadingFetchMe && (
          <div className="w-fit h-fit p-[4px] rounded-full border-b border-l border-blue-alt">
            <div
              className="w-[56px] h-[56px] rounded-full"
              style={{
                backgroundImage: `url(${
                  me?.profile_image_url || DEFAULT_AVATAR
                })`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
              }}
            />
          </div>
        )}

        <span className="text-xl text-black regular-font">
          {me?.first_name} {me?.last_name}{" "}
        </span>
      </div>

      <p className="text-base text-grey-text text-left mb-5 w-full ">
        Manage PaymentManage Payments Manage 1Manage Paymentsss Manage
        PaymentManage
      </p>

      <p className="text-[13px] text-grey-text text-left mb-5 w-full">
        Quick actions
      </p>

      <div className="flex flex-col justify-start items-start mb-10 space-y-3 w-full">
        <Link
          to="/dashboard/listings/utilities"
          className="space-x-3 flex justify-start items-center py-4 border-b-1/2 border-grey-border w-full"
        >
          <FaSwimmingPool className="fill-black" />
          <p className="text-base text-black">Manage Utilities</p>
        </Link>

        <Link
          to="/dashboard/me"
          className="space-x-3 flex justify-start items-center py-4 border-b-1/2 border-grey-border w-full"
        >
          <Host />
          <p className="text-base text-black">Host Information</p>
        </Link>
      </div>

      <Link to="/dashboard/me" className="w-full">
        <EditButton text="Edit Profile" />
      </Link>
      <div className="w-full min-h-[200px]" />
    </div>
  );
};

export default observer(UserProfile);
