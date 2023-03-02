import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { observer } from "mobx-react-lite";

import { ReactComponent as Step } from "assets/icons/step-4.svg";

import { GUEST_PAYMENTS, PAYMENT_ADDONS } from "utils/constants";
import { Button } from "components/general/button";
import Input from "components/general/input/input";
import ListingStore from "pages/dashboard/listings/store";
import PaystackStore from "stores/paystack";
import AppSwitch from "components/general/switch";
import useWindowDimensions from "hooks/useWindowDimensions";
import Accordion from "./accordion";

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location?.pathname?.replace("/new-listing/step-four", "");
  const path = pathName?.replace("/", "");
  const suffix = path ? "/" + path : "";
  const { isSm } = useWindowDimensions();
  const {
    createListing,
    loading,
    savelistingFormFour,
    listingFormFour,
    listingFormThree,
    handleFindListing,
    listingDataSet,
    formFourDisabled,
    updateListing,
  } = ListingStore;

  const { banks, getBanks, getUserBankDetails } = PaystackStore;

  const [saveType, setSaveType] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  useEffect(() => {
    !listingFormThree && navigate("/new-listing/step-two", { replace: false });
    getBanks();
  }, []);

  useEffect(() => {
    path && !listingDataSet && handleFindListing(path, navigate);
  }, [path]);

  useEffect(() => {
    banks &&
      banks[0] &&
      selectedBank?.value &&
      listingFormFour?.account_number?.length > 9 &&
      getUserBankDetails(listingFormFour?.account_number, selectedBank?.value);
  }, [listingFormFour?.account_number, selectedBank]);

  const saveAndContinue = (e) => {
    e.preventDefault();
    setSaveType("continue");
    if (path) {
      updateListing({ navigate, route: "/dashboard/listings", id: path });
    } else {
      createListing({ navigate, route: "/dashboard/listings" });
    }
  };

  return (
    <form
      onSubmit={saveAndContinue}
      className="flex flex-col justify-start items-start w-full max-w-[970px] h-full min-h-[700px] relative px-5"
    >
      <div className="flex flex-col justify-start items-start w-full pb-[200px] overflow-y-scroll overflow-x-hidden">
        <div className="flex flex-col justify-start items-start space-y-1 w-full"></div>
        <div className="flex flex-col justify-start items-start w-full my-5">
          <Step className="w-full" />
        </div>

        <span className="text-black text-lg mb-1">Payments</span>
        <label className="text-base text-grey-grey regular-font mb-8">
          How do you want to recieve payments? Specify the payment types you
          accept.
        </label>

        <div className="flex flex-col justify-start items-start w-full space-y-4">
          <Accordion title="Pricing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between items-start w-full mb-8">
              <Input
                type="number"
                suffix=" ₦/night"
                label="Set rental fee"
                value={listingFormFour?.base_price}
                onChangeFunc={(val) => savelistingFormFour("base_price", val)}
                placeholder="Enter rental fee"
                isDisabled={false}
              />
            </div>
          </Accordion>

          <Accordion title="Select Add-ons">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between items-start w-full mb-8">
              {PAYMENT_ADDONS.map(({ name, value, icon }) => (
                <AppSwitch
                  key={name}
                  checked={listingFormFour[value]}
                  onChange={() =>
                    savelistingFormFour(value, !listingFormFour[value])
                  }
                  disabled={loading}
                  icon={icon}
                  title={name}
                />
              ))}
            </div>
          </Accordion>

          <Accordion title="Select Guest Payment">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between items-start w-full mb-8">
              {GUEST_PAYMENTS.map(({ name, value, icon, label }) => (
                <AppSwitch
                  key={name}
                  checked={listingFormFour[value]}
                  onChange={() =>
                    savelistingFormFour(value, !listingFormFour[value])
                  }
                  disabled={loading}
                  icon={icon}
                  title={name}
                  label={label}
                />
              ))}
            </div>
          </Accordion>
          {/* {listingFormFour?.card && (
            <div className="flex flex-col justify-start items-start w-full space-y-4">
              <span className="text-grey-text text-base uppercase regular-font">
                CARD DETAILS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between items-start w-full mb-8">
                <Input
                  type="number"
                  label="Card Number"
                  value={listingFormFour?.card_number}
                  onChangeFunc={(val) =>
                    savelistingFormFour("card_number", val)
                  }
                  placeholder="5233-0000-0000-0000"
                  isDisabled={loading}
                  format="#### #### #### ####"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between items-start w-full mb-8">
                  <Input
                    type="number"
                    label="Expiry Date"
                    value={listingFormFour?.expiry_date}
                    onChangeFunc={(val) =>
                      savelistingFormFour("expiry_date", val)
                    }
                    placeholder="DD/MM/YYYY"
                    isDisabled={loading}
                    format="##/##/####"
                  />

                  <Input
                    type="number"
                    label="CVV"
                    value={listingFormFour?.cvv}
                    onChangeFunc={(val) => savelistingFormFour("cvv", val)}
                    placeholder="123"
                    isDisabled={loading}
                    format="###"
                  />
                </div>
              </div>
            </div>
          )} */}

          {/* {listingFormFour?.bank_transfer && (
            <div className="flex flex-col justify-start items-start w-full space-y-4">
              <span className="text-grey-text text-base uppercase regular-font">
                BANK DETAILS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between items-start w-full mb-8">
                <Input
                  type="number"
                  label="Account Number"
                  labelAlt={userDetails?.account_name}
                  value={listingFormFour?.account_number}
                  onChangeFunc={(val) =>
                    savelistingFormFour("account_number", val)
                  }
                  placeholder="1234567890"
                  isDisabled={loading}
                  format="##########"
                  isLoading={detailsLoading}
                />

                <Select
                  label="Bank Name"
                  placeholder="Select bank"
                  value={selectedBank}
                  options={banks}
                  onChange={(val) => setSelectedBank(val)}
                  isLoading={banksloading}
                />
              </div>
            </div>
          )} */}
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-row justify-start items-center w-full px-10 space-x-10 py-4 fixed bottom-0 right-0 bg-white shadow-[0_-10px_20px_rgba(196,196,196,0.3)] z-[99] left-0 md:left-60 max:left-0">
        <Button
          text={isSm ? "Back" : "Back to previous step"}
          onClick={() => {
            navigate(`/new-listing/step-three${suffix}`);
          }}
          type="button"
          isDisabled
          isOutline
          textColor="text-green"
          borderColor="border-green"
        />
        <Button
          text="Save & Finish"
          type="submit"
          isDisabled={formFourDisabled() || loading}
          isLoading={loading && saveType === "continue"}
          onClick={saveAndContinue}
        />
      </div>
    </form>
  );
};

export default observer(Form);
