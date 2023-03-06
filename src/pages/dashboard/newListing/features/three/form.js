import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { observer } from "mobx-react-lite";

import { ReactComponent as Step } from "assets/icons/step-3.svg";

import { Button } from "components/general/button";
import ListingStore from "pages/dashboard/listings/store";
import FileBox from "components/general/input/fileBox";
import { SPACES } from "utils/constants";
import useWindowDimensions from "hooks/useWindowDimensions";

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location?.pathname?.replace("/new-listing/step-three", "");
  const path = pathName?.replace("/", "");
  const suffix = path ? "/" + path : "";
  const { isSm } = useWindowDimensions();

  const {
    loading,
    listingFormTwo,
    listingFormThree,
    savelistingFormThree,
    handleFindListing,
    listingDataSet,
    formThreeDisabled,
  } = ListingStore;

  const [saveType, setSaveType] = useState("");

  // useEffect(() => {
  //   !listingFormTwo && navigate("/new-listing/step-two", { replace: false });
  // }, []);

  // useEffect(() => {
  //   path && !listingDataSet && handleFindListing(path, navigate);
  // }, [path]);
  const saveAndContinue = (e) => {
    e.preventDefault();
    setSaveType("continue");
    navigate(`/new-listing/step-four${suffix}`);
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

        <span className="text-black text-lg mb-1">Upload Photos</span>
        <label className="text-base text-grey-grey regular-font mb-8">
          Show your guests high-resolution photos that highlight the beauty of
          your space!
        </label>

        <FileBox
          placeholder=""
          title=""
          required
          file={listingFormThree?.images}
          onChangeFunc={(e) => {
            savelistingFormThree("images", e);
          }}
          removeAllClick={() => {
            savelistingFormThree("images", null);
          }}
          isDisabled={loading}
          isError={false}
          isXl
          multiple
        />
        <div className="flex flex-col justify-between items-start w-full my-8">
          <span className="mb-4 text-black text-base regular-font">
            Add at least one photo of each space available in your apartment
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-between items-start w-full">
            {SPACES.map(({ name, value }) => (
              <FileBox
                key={name}
                placeholder="Not more that 10MB"
                title={name}
                required
                file={listingFormThree && listingFormThree[value]}
                onChangeFunc={(e) => savelistingFormThree(value, e)}
                removeAllClick={() => {
                  savelistingFormThree(value, null);
                }}
                isDisabled={loading}
                isError={false}
                maxSize={3}
                onSizeError={(file) => console.log("sizeerror", file)}
                multiple
              />
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-row justify-start items-center w-full px-10 space-x-10 py-4 fixed bottom-0 right-0 bg-white shadow-[0_-10px_20px_rgba(196,196,196,0.3)] z-[99] left-0 md:left-60 max:left-0">
        <Button
          text={isSm ? "Back" : "Back to previous step"}
          onClick={() => {
            navigate(`/new-listing/step-two${suffix}`);
          }}
          type="button"
          isOutline
          textColor="text-green"
          borderColor="border-green"
        />
        <Button
          text="Save & Continue"
          type="submit"
          isDisabled={formThreeDisabled() || loading}
          isLoading={loading && saveType === "continue"}
          onClick={saveAndContinue}
        />
      </div>
    </form>
  );
};

export default observer(Form);
