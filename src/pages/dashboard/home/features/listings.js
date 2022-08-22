import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Tippy from "@tippyjs/react";

import AddButton from "components/general/button/addButton";
import { ReactComponent as House } from "assets/icons/house.svg";
import { ReactComponent as Wallet } from "assets/icons/wallet.svg";
import ListingStore from "pages/dashboard/listings/store";

Chart.register(...registerables);
const Listings = () => {
  const { resetlistingForm, listingsCount, reservedListings, getListings } =
    ListingStore;

  useEffect(() => {
    getListings("1");
  }, []);

  const data = {
    labels: ["Occupied listings", "All listings"],
    datasets: [
      {
        label: "# of Votes",
        data: [reservedListings?.length, listingsCount],
        backgroundColor: ["#EDB800", "#E0E0E0"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: 47.5,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };
  return (
    <div className="flex flex-col justify-between items-end w-full h-fit space-y-10 pb-10 mb-6 border-b-1/2 border-grey-border">
      <Link
        to="/new-listing/step-one"
        className="flex flex-col justify-end items-end"
      >
        <AddButton
          text="Create New Listing"
          onClick={() => resetlistingForm()}
        />
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start w-full h-fit space-y-10 md:space-x-10 md:space-y-0">
        <div className="flex justify-start items-center w-full basis-[50%] space-x-6">
          <div className="w-[105px] h-[105px] relative">
            <Doughnut data={data} options={options} />
            <Tippy
              content={`${reservedListings?.length}  of ${listingsCount} listings occupied`}
            >
              <House className="absolute left-0 right-0 top-0 bottom-0 m-auto w-[30px] h-[30px]" />
            </Tippy>
          </div>
          <div className="flex flex-col justify-center items-start space-y-2 w-full relative">
            <Tippy
              content={`${reservedListings?.length}  of ${listingsCount} listings occupied`}
            >
              <span className="text-2xl text-black regular-font">
                {`${
                  listingsCount
                    ? reservedListings?.length + "/" + listingsCount
                    : 0
                }`}
              </span>
            </Tippy>
            <span className="text-[13px] text-black">Total listings </span>
            <Link
              className="text-[13px] text-blue-alt regular-font underline ml-auto !mt-0 absolute right-0 -bottom-[40px]"
              to="/dashboard/listings"
            >
              View all listings
            </Link>
          </div>
        </div>
        <div className="flex justify-start items-center w-full basis-[50%] space-x-6">
          <div className="w-[105px] h-[105px] relative">
            <Doughnut data={data} options={options} />
            <Tippy content={`Total Income: ${"₦0.00"}`}>
              <Wallet className="absolute left-0 right-0 top-0 bottom-0 m-auto w-[30px] h-[30px]" />
            </Tippy>
          </div>
          <div className="flex flex-col justify-center items-start space-y-2 w-full relative">
            <Tippy content={`Total Income: ${"₦0.00"}`}>
              <span className="text-2xl text-black regular-font">₦0.00 </span>
            </Tippy>
            <span className="text-[13px] text-black">Total Income</span>
            <Link
              className="text-[13px] text-blue-alt regular-font underline ml-auto !mt-0 absolute right-0 -bottom-[40px]"
              to="/"
            >
              View all transactions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Listings);
