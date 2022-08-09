import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import { pageCount } from "utils/constants";

import CircleLoader from "components/general/circleLoader/circleLoader";
import Pagination from "components/general/pagination";
import List from "components/general/list";
import HomeStore from "pages/dashboard/home/store";

const AllBookings = observer(({ data }) => {
  const { loading, getBookings, bookingsCount } = HomeStore;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    currentPage > 1 && getBookings(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-6 space-y-5 max-h-fit relative">
      {data.map((booking) => (
        <List key={booking?.id} listing={booking} isAlt/>
      ))}
      {loading && (
        <div className="absolute w-full flex justify-center items-center h-[100px]">
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
