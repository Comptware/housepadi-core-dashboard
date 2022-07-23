import React from "react";

import Avatar from "assets/images/avatar-alt.png";
import List from "components/general/list";
import { ReactComponent as ArrowRight } from "assets/icons/arrow-right.svg";
import { Button } from "components/general/button";
import { Link } from "react-router-dom";
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
  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-6 space-y-6">
      <div className="flex flex-col justify-start items-start w-full h-fit space-y-5 ">
        {listings.map(({ name, user, image, location, date }, i) => (
          <List
            key={name + i}
            titleOne={name}
            location={location}
            label={location}
            image={image}
            date={date}
            bigImg
            caption={user + " is asking for"}
            className="px-6 border-b-1/2 border-grey-border"
            button={
              <Button
                isOutline
                text="View details"
                borderColor="blue-alt"
                small
              />
            }
          />
        ))}
      </div>
      <Link
        to="/#"
        className="flex justify-start items-center text-base text-blue-alt underline pb-10"
      >
        View all requests
        <ArrowRight className="ml-2" />
      </Link>
      <div className="w-full min-h-[100px]" />
    </div>
  );
};

export default RecentRequests;
