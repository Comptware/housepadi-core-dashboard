import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";

import CircleLoader from "components/general/circleLoader/circleLoader";
import ListingStore from "../../store/index";
import DeleteModal from "components/general/modal/deleteModal";
import { AddButton } from "components/general/button";
import AddAarModal from "./addAarModal";
import { Link } from "react-router-dom";

const AllUtilities = observer(({ data, type }) => {
  const { aarLoading, getAAR } = ListingStore;
  const [deleteModal, setDeleteModal] = useState(null);
  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    getAAR();
  }, []);

  const handleDelete = async () => {
    setDeleteModal(null);
  };

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-3 sm:p-6 max-h-fit gap-y-3 ">
      <div className="flex justify-between items-start w-full h-fit gap-x-3 mt-2 mb-3">
        <Link
          to="/dashboard/listings"
          className="text-blue-alt underline text-sm"
        >
          View listings
        </Link>

        <AddButton
          text={`Create ${type}`}
          xsmall
          onClick={() => setAddModal(true)}
        />
      </div>

      {data.map(({ id, icon, name }) => {
        return (
          <div
            key={id}
            className="flex justify-between px-6 py-2 bg-white border-[0.5px] border-[#E7EAEE] items-center w-full"
          >
            <div className="flex justify-start items-center gap-x-6">
              <div
                className="w-[24px] h-[24px] rounded-lg bg-no-repeat bg-center bg-cover"
                style={{
                  backgroundImage: `url(${icon})`,
                }}
              />
              <p className="text-sm whitespace-nowrap text-black">{name}</p>
            </div>

            <button
              onClick={() => setDeleteModal({ id, icon, name })}
              type="button"
              className="underline text-red text-xs"
            >
              Delete
            </button>
          </div>
        );
      })}
      {aarLoading && (
        <div className="absolute w-full flex justify-center items-center h-[100px]">
          <CircleLoader blue />
        </div>
      )}

      <div className="w-full min-h-[400px]" />

      <DeleteModal
        active={deleteModal}
        handleDelete={handleDelete}
        isDeleting={aarLoading}
        onClose={() => setDeleteModal(null)}
        title={`You are about to delete ${deleteModal?.name}`}
        text={`This ${type} will be permanently removed from all utilities, Are you sure?`}
      />

      <AddAarModal
        active={addModal}
        toggleModal={() => setAddModal(false)}
        type={type}
      />
    </div>
  );
});
AllUtilities.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
};
export default AllUtilities;
