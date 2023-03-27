import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { MdOutlineDragIndicator } from "react-icons/md";
import { AiFillExclamationCircle } from "react-icons/ai";
import { ReactSortable } from "react-sortablejs";
import Tippy from "@tippyjs/react";

import CircleLoader from "components/general/circleLoader/circleLoader";
import DeleteModal from "components/general/Modal/deleteModal";
import { Button } from "components/general/button";
import Pagination from "components/general/pagination";
import SettingsStore from "../../store";
import MealModal from "./modal";
import { pageCount } from "utils/constants";

const MealCategories = observer(() => {
  const {
    mealCategories,
    mealCategoriesCount,
    getMealCategories,
    getMealCategoriesLoading,
    deleteMealCategory,
    deleteMealCategoriesLoading,
    setMealCategories,
    setActiveMealCategory,
  } = SettingsStore;
  const [deleteModal, setDeleteModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    getMealCategories(currentPage);
  }, [currentPage]);

  const handleDelete = () => {
    deleteMealCategory({
      pageNumber: currentPage,
      callbackFunc: () => setDeleteModal(null),
    });
  };

  const type = "meal category";
  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-3 sm:p-6 max-h-fit gap-y-3 relative ">
      {getMealCategoriesLoading && (
        <div className="absolute w-full flex justify-center items-center h-[100px]">
          <CircleLoader blue />
        </div>
      )}

      <div className="flex justify-between items-start w-full h-fit gap-x-3 mt-2 mb-3">
        <button
          onClick={() => setModalType("Create")}
          className="text-green underline text-sm"
          type="button"
        >
          Create {type}
        </button>
        {mealCategoriesCount && (
          <Tippy content="drag and drop the cards below to rearrange meal categories">
            <div className="w-fit flex items-start justify-end gap-2">
              <Button text={`Save arrangement`} xsmall />

              <div>
                <AiFillExclamationCircle className="text-grey mt-0.5" />
              </div>
            </div>
          </Tippy>
        )}
      </div>
      <ReactSortable
        list={mealCategories}
        setList={setMealCategories}
        className="w-full flex flex-col justify-start items-start gap-2"
        animation={300}
        delayOnTouchStart={true}
        delay={1.5}
      >
        {mealCategories?.map(({ id, icon, name }) => {
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
                    setActiveMealCategory({ id, name });
                    setModalType("Update");
                  }}
                  type="button"
                  className="underline text-green text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setActiveMealCategory({ id, name });
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
        pageCount={Number(mealCategoriesCount) / pageCount}
        onPageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />
      <div className="w-full min-h-[400px]" />
      <DeleteModal
        active={deleteModal}
        handleDelete={handleDelete}
        isDeleting={deleteMealCategoriesLoading}
        onClose={() => setDeleteModal(null)}
        title={
          deleteModal?.name && `You are about to delete "${deleteModal?.name}"`
        }
        text={
          type &&
          `This ${type} will be permanently removed from all meal categories, Are you sure?`
        }
      />
      <MealModal
        active={modalType}
        toggleModal={() => setModalType("")}
        type={modalType}
        currentPage={currentPage}
      />
    </div>
  );
});

export default MealCategories;
