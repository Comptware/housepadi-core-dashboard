import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import { ReactComponent as ArrowBack } from "assets/icons/arrow-back.svg";
import { findPath } from "utils/findPath";
import HomeStore from "pages/dashboard/home/store";
import Profile from "./profile";
import Overview from "./overview";
import Loader from "components/general/loader";

const BookingDetails = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleFindBooking, searchLoading } = HomeStore;
  const path = findPath(location, "/dashboard/bookings");

  // useEffect(() => {
  //   handleFindBooking({ url: path.path, navigate, route: -1 });
  // }, []);

  return (
    <div className="flex flex-col justify-start items-start h-full w-full relative">
      {searchLoading && <Loader absolute />}
      <div className="flex flex-row justify-start items-start h-fit  w-full p-4 mb-8">
        <button
          type="button"
          className="flex justify-start items-center text-base text-black cursor-pointer underline w-full text-left"
          onClick={() => navigate(-1)}
        >
          <ArrowBack className="mr-2" /> Back
        </button>
      </div>

      <div className="flex flex-col justify-start items-start h-auto md:h-full w-full mb-24 px-6 md:pb-8 space-y-12">
        <Profile />

        <Overview />
      </div>
    </div>
  );
});

export default BookingDetails;
