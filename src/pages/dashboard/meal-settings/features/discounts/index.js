import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import CircleLoader from "components/general/circleLoader/circleLoader";
import DeleteModal from "components/general/Modal/deleteModal";
import { AddButton } from "components/general/button";
import Pagination from "components/general/pagination";
import { pageCount } from "utils/constants";
import Card from "components/general/list";
import SettingsStore from "../../store";
import DiscountModal from "./modal";

const Discounts = observer(() => {
  const {
    discounts,
    discountsCount,
    getDiscounts,
    getDiscountsLoading,
    deleteDiscount,
    deleteDiscountsLoading,
    setActiveDiscount,
  } = SettingsStore;

  const [deleteModal, setDeleteModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    getDiscounts(currentPage);
  }, [currentPage]);

  const handleDelete = () => {
    deleteDiscount({
      pageNumber: currentPage,
      callbackFunc: () => setDeleteModal(null),
    });
  };

  const type = "discount";

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-3 sm:p-6 max-h-fit gap-y-3 relative ">
      {getDiscountsLoading && (
        <div className="absolute w-full flex justify-center items-center h-[100px]">
          <CircleLoader blue />
        </div>
      )}

      <div className="flex justify-between items-start w-full h-fit gap-x-3 mb-6">
        <AddButton
          text={`Create ${type}`}
          xsmall
          onClick={() => setModalType("Create")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xlg:grid-cols-4 gap-8 justify-between items-start transition-all duration-300 ease w-full">
        {discounts?.map(({ id, name, ...details }) => {
          return (
            <Card
              key={id}
              details={{ id, name, ...details }}
              onEditClick={() => {
                setActiveDiscount({ id, name, ...details });
                setModalType("Update");
              }}
              onDeleteClick={() => {
                setActiveDiscount({ id, name });
                setDeleteModal({ id, name });
              }}
            />
          );
        })}
      </div>

      <Pagination
        pageCount={Number(discountsCount) / pageCount}
        onPageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />
      <div className="w-full min-h-[400px]" />
      <DeleteModal
        active={deleteModal}
        handleDelete={handleDelete}
        isDeleting={deleteDiscountsLoading}
        onClose={() => setDeleteModal(null)}
        title={
          deleteModal?.name && `You are about to delete "${deleteModal?.name}"`
        }
        text={
          type &&
          `This ${type} will be permanently removed from all discounts, Are you sure?`
        }
      />
      <DiscountModal
        active={modalType}
        toggleModal={() => setModalType("")}
        type={modalType}
        currentPage={currentPage}
      />
    </div>
  );
});

export default Discounts;
