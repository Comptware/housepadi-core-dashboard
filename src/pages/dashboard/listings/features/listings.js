import React from "react";
import { Chart, registerables } from "chart.js";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import AddButton from "components/general/button/addButton";
import ListingStore from "pages/dashboard/listings/store";

Chart.register(...registerables);
const Listings = () => {
  const { resetlistingForm, listingsCount, reservedListings } = ListingStore;
  return (
    <div className="flex justify-between items-start w-full h-fit space-x-10">
      <div className="flex flex-col justify-start items-start space-y-2 w-full relative">
        <span className="text-2xl text-black regular-font">
          {`${
            listingsCount ? reservedListings?.length + "/" + listingsCount : 0
          }`}
        </span>
        <span className="text-[13px] text-black">Total listings </span>
      </div>
      <Link
        to="/new-listing/step-one"
        className="flex flex-col justify-end items-end"
      >
        <AddButton
          text="Create New Listing"
          onClick={() => resetlistingForm()}
        />
      </Link>
    </div>
  );
};

export default observer(Listings);
