import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Avatar from "assets/images/avatar-alt.png";
import List from "components/general/list";
import { ReactComponent as ArrowRight } from "assets/icons/arrow-right.svg";
import { Button } from "components/general/button";
import CircleLoader from "components/general/circleLoader/circleLoader";
import Pagination from "components/general/pagination";
import { pageCount } from "utils/constants";
import HomeStore from "../store";

const RecentRequests = () => {
  const listings = [
    {
      name: "Malrian Luxury Home",
      location: "Oniru, Victoria Island",
      image: Avatar,
      user: "John",
      date: "25th February - 30th February, 2022",
    },
    {
      name: "Malrian Luxury Home",
      location: "Agungi-Lekki, Lagos",
      image: Avatar,
      user: "John",
      date: "25th February - 30th February, 2022",
    },
    {
      name: "Malrian Luxury Home",
      location: "Oniru, Victoria Island",
      image: Avatar,
      user: "John",
      date: "25th February - 30th February, 2022",
    },
    {
      name: "Malrian Luxury Home",
      location: "Agungi-Lekki, Lagos",
      image: Avatar,
      user: "John",
      date: "25th February - 30th February, 2022",
    },
  ];
  const { loading, getBookings, bookingsCount, bookings } = HomeStore;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    currentPage > 1 && getBookings(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-6 space-y-6">
      <div className="flex flex-col justify-start items-start w-full h-fit space-y-5 relative">
        {loading && (
          <div className="absolute w-full flex justify-center items-center h-[100px]">
            <CircleLoader blue />
          </div>
        )}

        {bookings.map((data) => (
          <List key={data?.id} listing={data} />
        ))}
      </div>
      <Link
        to="/#"
        className="flex justify-start items-center text-base text-blue-alt underline pb-10"
      >
        View all requests
        <ArrowRight className="ml-2" />
      </Link>
      <Pagination
        pageCount={Number(bookingsCount) / pageCount}
        onPageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />
      <div className="w-full min-h-[100px]" />
    </div>
  );
};

export default observer(RecentRequests);
