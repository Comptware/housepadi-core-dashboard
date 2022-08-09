import React, { useState } from "react";
import { Outlet } from "react-router";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { ReactComponent as ArrowBack } from "assets/icons/arrow-back.svg";
import { ReactComponent as SmallLoader } from "assets/icons/loader/loader.svg";
import NewListingLayout from "components/layout/listing";
import ListingStore from "pages/dashboard/listings/store";
import DeleteModal from "components/general/modal/deleteModal";
import Loader from "components/general/loader";
const NewLising = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const listLinks = [
    "/new-listing/step-one",
    "/new-listing/step-two",
    "/new-listing/step-three",
    "/new-listing/step-four",
  ];
  let pathName = location?.pathname;
  for (let index = 0; index < listLinks.length; index++) {
    pathName = pathName?.replace(listLinks[index], "");
  }
  const path = pathName?.replace("/", "");
  const [saveType, setSaveType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const {
    loading,
    listingFormOne,
    createListing,
    updateListing,
    deleteListing,
    searchIdLoading,
  } = ListingStore;

  const saveAndExit = () => {
    setSaveType("exit");
    if (path) {
      updateListing({ navigate, route: "/dashboard/listings", id: path });
    } else {
      createListing({ navigate, route: "/dashboard/listings" });
    }
  };

  const handleDeleteListing = async () => {
    setSaveType("delete");
    if (path) {
      await deleteListing({
        navigate,
        route: "/dashboard/listings",
        shortlet_id: path,
      });
    }
    setShowModal(false);
  };

  return (
    <div>
      <NewListingLayout>
        <div className="flex justify-between items-start w-full my-6 max-w-[970px] px-5">
          {searchIdLoading && <Loader />}
          <Link
            to="/dashboard/listings"
            className="flex justify-start items-center text-base text-black cursor-pointer underline w-full text-left"
          >
            <ArrowBack className="mr-2" /> Back to Listings
          </Link>

          <div className="flex justify-between items-start w-fit space-x-10">
            <button
              type="button"
              className={`whitespace-nowrap ${
                !listingFormOne?.name || loading
                  ? "cursor-not-allowed opacity-50"
                  : ""
              } text-base text-blue-alt underline`}
              onClick={saveAndExit}
              disabled={!listingFormOne?.name || loading}
            >
              {loading && saveType === "exit" ? <SmallLoader /> : "Save & Exit"}
            </button>

            {path && (
              <button
                type="button"
                className={`whitespace-nowrap ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                } 
            text-base text-red underline`}
                onClick={() => setShowModal(true)}
                disabled={loading}
              >
                {loading && saveType === "delete" ? (
                  <SmallLoader />
                ) : (
                  "Delete listing"
                )}
              </button>
            )}
          </div>
        </div>
        <h1 className="text-black text-lg regular-font mb-2 w-full text-left max-w-[970px] px-5">
          Add New Listing
        </h1>
        {showModal && (
          <DeleteModal
            handleDelete={handleDeleteListing}
            isDeleting={loading}
            onClose={() => setShowModal(false)}
            title="You are about to delete this listing"
            text="This will delete your product from the list of products, Are you sure?"
          />
        )}
        <Outlet />
      </NewListingLayout>
    </div>
  );
};

export default observer(NewLising);
