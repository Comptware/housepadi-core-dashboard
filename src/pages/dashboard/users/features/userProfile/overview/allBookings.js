import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router";

import { pageCount } from "utils/constants";
import CircleLoader from "components/general/circleLoader/circleLoader";
import Pagination from "components/general/pagination";
import List from "components/general/list";
import { findPath } from "utils/findPath";
import UserStore from "../../../store";

const AllBookings = observer(() => {
  const location = useLocation();
  const { path } = findPath(location, "/dashboard/users");
  const {
    userBookingsLoading,
    getUserBookings,
    userBookingsCount,
    userBookings,
  } = UserStore;
  const [currentPage, setCurrentPage] = useState(1);
  // useEffect(() => {
  //   getUserBookings({ agent_id: path }, currentPage);
  // }, [currentPage]);

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit px-3 py-6 sm:p-6 space-y-5 max-h-fit relative">
      {userBookings?.map((booking) => (
        <List key={booking?.id} listing={booking} isAlt />
      ))}
      {userBookingsLoading && (
        <div className="absolute w-full flex justify-center items-center h-[100px]">
          <CircleLoader blue />
        </div>
      )}

      {!userBookingsLoading && userBookings?.length < 1 && (
        <p className="text-base text-grey-text text-left mb-5 w-full uppercase">
          This user has no bookings at the moment
        </p>
      )}
      <Pagination
        pageCount={Number(userBookingsCount) / pageCount}
        onPageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />
      <div className="w-full min-h-[400px]" />
    </div>
  );
});
export default AllBookings;
