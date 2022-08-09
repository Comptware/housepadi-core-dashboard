import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { observer } from "mobx-react-lite";

import { ReactComponent as Step } from "assets/icons/step-2.svg";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";

import { Button } from "components/general/button";
import Input from "components/general/input/input";
import CircleLoader from "components/general/circleLoader/circleLoader";
import ListingStore from "pages/dashboard/listings/store";
import Amenities from "./amenities";
import Allowances from "./allowances";
import Rules from "./rules";

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location?.pathname?.replace("/new-listing/step-two", "");
  const path = pathName?.replace("/", "");
  const suffix = path ? "/" + path : "";
  const {
    loading,
    savelistingFormTwo,
    listingFormOne,
    listingFormTwo,
    getAAR,
    allowances,
    amenities,
    rules,
    aarLoading,
    handleFindListing,
    listingDataSet,
    formTwoDisabled,
    aarUpdateLoading,
  } = ListingStore;

  const [saveType, setSaveType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    !listingFormOne && navigate("/new-listing/step-one", { replace: false });
    getAAR();
  }, []);

  useEffect(() => {
    path && !listingDataSet && handleFindListing(path, navigate);
  }, [path]);

  const saveAndContinue = (e) => {
    e.preventDefault();
    setSaveType("continue");
    navigate(`/new-listing/step-three${suffix}`);
  };

  return (
    <form
      onSubmit={saveAndContinue}
      className="flex flex-col justify-start items-start w-full max-w-[970px] h-full relative px-5"
    >
      <div className="flex flex-col justify-start items-start w-full pb-[400px] overflow-y-scroll overflow-x-hidden">
        <div className="flex flex-col justify-start items-start w-full my-5">
          <Step className="w-full" />
        </div>

        <span className="text-black text-lg mb-1">
          Describe Your Special Features
        </span>
        <label className="text-base text-grey-grey regular-font mb-8">
          Tell prospective renters a bit about special features
        </label>

        <Input
          onChangeFunc={(e) => setSearchQuery(e)}
          placeholder="Search Amenities"
          value={searchQuery}
          icon={<SearchIcon />}
          leftIcon
          containerClass="!shadow-[5px_10px_25px_4px_rgba(50,106,217,0.12)] mb-10"
        />
        <div className="flex flex-col justify-between items-center w-full my-8">
          {((aarLoading && amenities?.length < 1) || aarUpdateLoading) && (
            <CircleLoader blue />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 justify-between items-start w-full">
            <Amenities
              amenities={amenities}
              searchQuery={searchQuery}
              handleCheckboxChange={savelistingFormTwo}
              items={listingFormTwo?.amenities}
              path={path}
            />

            <Allowances
              allowances={allowances}
              searchQuery={searchQuery}
              handleCheckboxChange={savelistingFormTwo}
              items={listingFormTwo?.allowances}
              path={path}
            />

            <Rules
              rules={rules}
              searchQuery={searchQuery}
              handleCheckboxChange={savelistingFormTwo}
              items={listingFormTwo?.rules}
              path={path}
            />
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-row justify-start items-center w-full px-10 space-x-10 py-4 fixed bottom-0 right-0 bg-white shadow-[0_-10px_20px_rgba(196,196,196,0.3)] z-[99] left-60 max:left-0">
        <Button
          text="Back to previous step"
          onClick={() => {
            navigate(`/new-listing/step-one${suffix}`);
          }}
          type="button"
          isOutline
          textColor="text-blue-alt"
          borderColor="border-blue-alt"
        />
        <Button
          text="Save & Continue"
          type="submit"
          isDisabled={formTwoDisabled() || loading}
          isLoading={loading && saveType === "continue"}
          onClick={saveAndContinue}
        />
      </div>
    </form>
  );
};

export default observer(Form);
