import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { MdOutlineDragIndicator } from "react-icons/md";
import { ReactSortable } from "react-sortablejs";

import CircleLoader from "components/general/circleLoader/circleLoader";
import DeleteModal from "components/general/Modal/deleteModal";
import { AddButton } from "components/general/button";
import Pagination from "components/general/pagination";
import { pageCount } from "utils/constants";
import SettingsStore from "../../store";
import LaundryModal from "./modal";

const LaundryTypes = observer(() => {
  const {
    laundryTypes,
    laundryTypesCount,
    getLaundryTypes,
    getLaundryTypesLoading,
    deleteLaundryType,
    deleteLaundryTypesLoading,
    setLaundryTypes,
    setActiveLaundryType,
  } = SettingsStore;
  const [deleteModal, setDeleteModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    getLaundryTypes(currentPage);
  }, [currentPage]);

  const handleDelete = () => {
    deleteLaundryType({
      pageNumber: currentPage,
      callbackFunc: () => setDeleteModal(null),
    });
  };

  const type = "laundry type";
  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-3 sm:p-6 max-h-fit gap-y-3 relative ">
      {getLaundryTypesLoading && (
        <div className="absolute w-full flex justify-center items-center h-[100px]">
          <CircleLoader blue />
        </div>
      )}

      <div className="flex justify-between items-start w-full h-fit gap-x-3 mt-2 mb-3">
        <AddButton
          onClick={() => setModalType("Create")}
          text={`Create ${type}`}
          xsmall
        />

        {/* {laundryTypesCount && (
          <Tippy content="drag and drop the cards below to rearrange laundry types">
            <div className="w-fit flex items-start justify-end gap-2">
              <Button text={`Save arrangement`} xsmall />

              <div>
                <AiFillExclamationCircle className="text-grey mt-0.5" />
              </div>
            </div>
          </Tippy>
        )} */}
      </div>
      <ReactSortable
        list={laundryTypes}
        setList={setLaundryTypes}
        className="w-full flex flex-col justify-start items-start gap-2"
        animation={300}
        delayOnTouchStart={true}
        delay={1.5}
      >
        {laundryTypes?.map(({ id, icon, name }) => {
          return (
            <div
              key={id}
              className="flex justify-between px-6 py-2 bg-white border-[0.5px] border-[#E7EAEE] items-center w-full cursor-grab "
            >
              <div className="flex justify-start items-center gap-x-6">
                <MdOutlineDragIndicator color="#000000" />
                <p className="text-sm whitespace-nowrap text-black">{name}</p>
              </div>
              <div className="w-fit flex items-center justify-end gap-6">
                <button
                  onClick={() => {
                    setActiveLaundryType({ id, name });
                    setModalType("Update");
                  }}
                  type="button"
                  className="underline text-green text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setActiveLaundryType({ id, name });
                    setDeleteModal({ id, name });
                  }}
                  type="button"
                  className="underline text-red text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </ReactSortable>
      <Pagination
        pageCount={Number(laundryTypesCount) / pageCount}
        onPageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />
      <div className="w-full min-h-[400px]" />
      <DeleteModal
        active={deleteModal}
        handleDelete={handleDelete}
        isDeleting={deleteLaundryTypesLoading}
        onClose={() => setDeleteModal(null)}
        title={
          deleteModal?.name && `You are about to delete "${deleteModal?.name}"`
        }
        text={
          type &&
          `This ${type} will be permanently removed from all laundry types, Are you sure?`
        }
      />
      <LaundryModal
        active={modalType}
        toggleModal={() => setModalType("")}
        type={modalType}
        currentPage={currentPage}
      />
    </div>
  );
});

export default LaundryTypes;
