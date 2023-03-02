import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { observer } from "mobx-react-lite";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

import { ReactComponent as Step } from "assets/icons/step-1.svg";

import { ReactComponent as Bedroom } from "assets/icons/bedroom.svg";
import { ReactComponent as Shower } from "assets/icons/shower.svg";
import { ReactComponent as Clock } from "assets/icons/clock.svg";

import { HOUSE_TYPES } from "utils/constants";
import { Button } from "components/general/button";
import Input from "components/general/input/input";
import Textarea from "components/general/input/textarea";
import DatePicker from "components/general/datePicker";
import ListingStore from "pages/dashboard/listings/store";
import Select from "components/general/input/select";
import useWindowDimensions from "hooks/useWindowDimensions";
import DescriptionItem from "./descriptionItem";

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location?.pathname?.replace("/new-listing/step-one", "");
  const path = pathName?.replace("/", "");
  const suffix = path ? "/" + path : "";
  const { isSm } = useWindowDimensions();
  const {
    loading,
    handleFindListing,
    savelistingFormOne,
    listingFormOne,
    selectedAddress,
    setSelectedAddress,
    listingDataSet,
    formOneDisabled,
  } = ListingStore;

  const [saveType, setSaveType] = useState("");

  useEffect(() => {
    path && !listingDataSet && handleFindListing(path, navigate);
  }, [path]);

  useEffect(() => {
    handleSortAddress();
  }, [selectedAddress]);

  const handleSortAddress = () => {
    if (selectedAddress?.value) {
      const {
        label,
        value: { terms },
      } = selectedAddress;
      const termsLen = terms?.length;
      geocodeByAddress(label)
        .then((results) => getLatLng(results[0]))
        .then((ress) => {
          const lat = String(ress?.lat);
          const lng = String(ress?.lng);
          const address = label;
          const city = terms && terms[termsLen - 3]?.value;
          const state = terms && terms[termsLen - 2]?.value;

          savelistingFormOne("lat", lat);
          savelistingFormOne("lng", lng);
          savelistingFormOne("address", address);
          savelistingFormOne("city", city);
          savelistingFormOne("state", state);
        });
    }
  };
  const saveAndContinue = (e) => {
    e.preventDefault();
    setSaveType("continue");
    navigate(`/new-listing/step-two${suffix}`);
  };

  return (
    <form
      onSubmit={saveAndContinue}
      className="flex flex-col justify-start items-start w-full max-w-[970px] h-full min-h-[700px] relative px-5"
    >
      <div className="flex flex-col justify-start items-start w-full pb-[200px] overflow-y-scroll overflow-x-hidden">
        <div className="flex flex-col justify-start items-start w-full my-5">
          <Step className="w-full" />
        </div>

        <span className="text-black text-lg mb-1">Apartment Details</span>
        <label className="text-base text-grey-grey regular-font mb-8">
          What is your home like? Provide more information about shortlet.
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between items-start w-full mb-8">
          <Input
            label="Apartment Name"
            value={listingFormOne?.name}
            onChangeFunc={(val) => savelistingFormOne("name", val)}
            placeholder="Enter apartment name"
          />

          <Select
            label="Address"
            addressValue={selectedAddress}
            onChange={(val) => {
              setSelectedAddress(val);
            }}
            addressPlaceholder={selectedAddress?.label || "Enter address"}
            isDisabled={loading}
            address
          />
          <Select
            label="House Type"
            value={HOUSE_TYPES?.find(
              ({ label }) => label === listingFormOne?.house_type
            )}
            onChange={(val) => savelistingFormOne("house_type", val.label)}
            placeholder="Select house type"
            options={HOUSE_TYPES}
            isDisabled={loading}
          />
        </div>

        <Textarea
          label="Say Something intresting about your rental"
          placeholder="Enter property description"
          onChangeFunc={(val) => savelistingFormOne("description", val)}
          rows="10"
          value={listingFormOne?.description}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 justify-between items-start w-full my-8">
          <div className="flex flex-col justify-start items-start w-full">
            <span className="text-black text-lg mb-1">
              Describe Your Shortlet
            </span>
            <label className="text-base text-grey-grey regular-font mb-2">
              Tell prospective renters a bit about your home by providing a
              description and address.
            </label>

            <DescriptionItem
              title="Guests"
              icon={<Bedroom />}
              decrementClick={() =>
                savelistingFormOne(
                  "number_of_guests",
                  listingFormOne?.number_of_guests,
                  "-"
                )
              }
              incrementClick={() =>
                savelistingFormOne(
                  "number_of_guests",
                  listingFormOne?.number_of_guests,
                  "+"
                )
              }
              itemCount={listingFormOne?.number_of_guests}
            />

            <DescriptionItem
              title="Bedrooms"
              icon={<Bedroom />}
              decrementClick={() =>
                savelistingFormOne(
                  "number_of_bedrooms",
                  listingFormOne?.number_of_bedrooms,
                  "-"
                )
              }
              incrementClick={() =>
                savelistingFormOne(
                  "number_of_bedrooms",
                  listingFormOne?.number_of_bedrooms,
                  "+"
                )
              }
              itemCount={listingFormOne?.number_of_bedrooms}
            />

            <DescriptionItem
              title="Bathrooms"
              icon={<Shower />}
              decrementClick={() =>
                savelistingFormOne(
                  "number_of_bathrooms",
                  listingFormOne?.number_of_bathrooms,
                  "-"
                )
              }
              incrementClick={() =>
                savelistingFormOne(
                  "number_of_bathrooms",
                  listingFormOne?.number_of_bathrooms,
                  "+"
                )
              }
              itemCount={listingFormOne?.number_of_bathrooms}
            />

            <DescriptionItem
              title="Rest rooms"
              icon={<Shower />}
              decrementClick={() =>
                savelistingFormOne(
                  "number_of_restrooms",
                  listingFormOne?.number_of_restrooms,
                  "-"
                )
              }
              incrementClick={() =>
                savelistingFormOne(
                  "number_of_restrooms",
                  listingFormOne?.number_of_restrooms,
                  "+"
                )
              }
              itemCount={listingFormOne?.number_of_restrooms}
            />
          </div>
          <div className="flex flex-col justify-start items-start w-full">
            <span className="text-black text-lg mb-1">Booking Time</span>
            <label className="text-base text-grey-grey regular-font mb-2">
              What time would your renters come in and leave?
            </label>

            <div className="flex justify-between items-center w-full mb-2">
              <div className="flex justify-start items-center text-base text-black uppercase whitespace-nowrap w-[200px]">
                <span className="w-[20px] mr-4">
                  <Clock className="" />
                </span>
                Check in
              </div>

              <DatePicker
                placeholder="HH : MM"
                value={listingFormOne?.check_in_time}
                onChange={(val) => savelistingFormOne("check_in_time", val)}
                showTimeSelect
                showTimeSelectOnly
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>

            <div className="flex justify-between items-center w-full">
              <div className="flex justify-start items-center text-base text-black uppercase whitespace-nowrap w-[200px]">
                <span className="w-[20px] mr-4">
                  <Clock className="" />
                </span>
                Check out
              </div>

              <DatePicker
                placeholder="HH : MM"
                value={listingFormOne?.check_out_time}
                onChange={(val) => savelistingFormOne("check_out_time", val)}
                showTimeSelect
                showTimeSelectOnly
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-row justify-start items-center w-full px-10 space-x-10 py-4 fixed bottom-0 right-0 bg-white shadow-[0_-10px_20px_rgba(196,196,196,0.3)] z-[99] left-0 md:left-60 max:left-0">
        <Button
          text={isSm ? "Back" : "Back to previous step"}
          type="button"
          isDisabled
          isOutline
          textColor="text-green"
          borderColor="border-green"
        />
        <Button
          text="Save & Continue"
          type="submit"
          isDisabled={formOneDisabled() || loading}
          isLoading={loading && saveType === "continue"}
          onClick={saveAndContinue}
        />
      </div>
    </form>
  );
};

export default observer(Form);
