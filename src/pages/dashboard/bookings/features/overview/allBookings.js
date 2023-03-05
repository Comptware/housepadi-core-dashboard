import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import { pageCount } from "utils/constants";

import CircleLoader from "components/general/circleLoader/circleLoader";
import Pagination from "components/general/pagination";
import List from "components/general/list";
import HomeStore from "pages/dashboard/home/store";

const AllBookings = observer(({ data }) => {
  const listTopRef = useRef(null);
  const { loading, getBookings, bookingsCount, bookings } = HomeStore;
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   getBookings(currentPage);
  // }, [currentPage]);

  useEffect(() => {
    return scrollToListTop();
  }, [bookings]);

  const scrollToListTop = () => listTopRef?.current?.scrollIntoView();
  return (
    <div className="flex flex-col justify-start items-start w-full h-fit px-3 py-6 sm:p-6 space-y-5 max-h-fit relative">
      <div ref={listTopRef} />
      {data?.map((booking) => (
        <List key={booking?.id} listing={booking} />
      ))}
      {loading && (
        <div className=" w-full flex justify-center items-center h-[100px]">
          <CircleLoader blue />
        </div>
      )}
      <Pagination
        pageCount={Number(bookingsCount) / pageCount}
        onPageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />
      <div className="w-full min-h-[400px]" />
    </div>
  );
});
AllBookings.propTypes = {
  data: PropTypes.array,
};
export default AllBookings;
