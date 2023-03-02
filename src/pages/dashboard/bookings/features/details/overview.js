import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";

import HomeStore from "pages/dashboard/home/store";
import { formatter } from "utils/functions";

const Overview = () => {
  const { currentBooking } = HomeStore;
  const [formData, setFormData] = useState({
    paymentMethod: "",
    diffDays: 0,
    totalPrice: "",
    grandTotal: "",
  });

  useEffect(() => {
    currentBooking?.check_in_date &&
      calcDateDiff(
        new Date(currentBooking?.check_in_date),
        new Date(currentBooking?.check_out_date)
      );
  }, [currentBooking]);
  const calcDateDiff = (startDate, endDate) => {
    const date1 = new Date(moment(startDate).format("l"));
    const date2 = new Date(moment(endDate).format("l"));

    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalPrice = currentBooking?.shortlet?.base_price * diffDays;
    const grandTotal =
      totalPrice + (currentBooking?.shortlet?.addon_caution_fee_price || 0);
    setFormData((prev) => {
      return {
        ...prev,
        diffDays,
        totalPrice,
        grandTotal,
      };
    });
  };
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start w-full h-fit sm:space-x-8 md:space-x-14 lg:space-x-20">
      <div className="flex flex-col justify-start items-start space-y-3 w-full bg-white rounded-lg py-5 px-8">
        <div className="flex flex-col justify-start items-start space-y-2">
          <h1 className="text-grey-text text-xs uppercase">Address</h1>
          <span className="text-base text-black regular-font">
            {currentBooking?.shortlet?.address}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-2  w-full">
          <div className="flex flex-col justify-start items-start space-y-2">
            <h1 className="text-grey-text text-xs uppercase">CHECK IN</h1>
            <span className="text-base text-black regular-font">
              {moment(currentBooking?.check_in_date)?.format("MMMM Do, YYYY")}
            </span>
          </div>

          <div className="flex flex-col justify-start items-start space-y-2">
            <h1 className="text-grey-text text-xs uppercase">CHECK OUT</h1>
            <span className="text-base text-black regular-font">
              {moment(currentBooking?.check_out_date)?.format("MMMM Do, YYYY")}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start space-y-2">
          <h1 className="text-grey-text text-xs uppercase">Number of guests</h1>
          <span className="text-base text-black regular-font">
            {currentBooking?.number_of_guests}
          </span>
        </div>
      </div>
      <div className="px-4 flex flex-col gap-4 w-full">
        <h1 className="text-grey-text text-xs uppercase">Price Details</h1>
        <div className="flex flex-col gap-y-3 text-black">
          <div className="flex justify-between">
            <p className="font-light">
              {formatter.format(currentBooking?.shortlet?.base_price)} &#215;{" "}
              {formData?.diffDays}{" "}
              {formData?.diffDays === 1 ? "Night" : "Nights"}
            </p>
            <p className="text-[20px]">
              {formatter.format(formData?.totalPrice || 0)}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="font-light">Other Fees</p>
            <p className="text-[20px]">
              {formatter.format(
                currentBooking?.shortlet?.addon_caution_fee_price || 0
              )}
            </p>
          </div>

          <div className="flex justify-between regular-font">
            <p>TOTAL</p>
            <p className="text-[24px]">
              {formatter.format(formData?.grandTotal || 0)}
            </p>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default observer(Overview);
