import React, { useCallback, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { FaChevronDown } from "react-icons/fa";
import { groupBy } from "lodash";

import CircleLoader from "components/general/circleLoader/circleLoader";
import DeleteModal from "components/general/Modal/deleteModal";
import { AddButton } from "components/general/button";
import Pagination from "components/general/pagination";
import { MEALS_SORT_OPTIONS, pageCount } from "utils/constants";
import Select from "components/general/input/select";
import Card from "components/general/list";
import SettingsStore from "../../store";
import MealModal from "./modal";

const Meals = observer(() => {
  const {
    meals,
    mealsCount,
    getMeals,
    getMealsLoading,
    deleteMeal,
    deleteMealsLoading,
    setActiveMeal,
  } = SettingsStore;

  const [deleteModal, setDeleteModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState("");
  const [sortValue, setSortValue] = useState(MEALS_SORT_OPTIONS[0]);
  const [collapsed, setCollapsed] = useState([]);
  useEffect(() => {
    getMeals(currentPage);
  }, [currentPage]);

  const handleDelete = () => {
    deleteMeal({
      pageNumber: currentPage,
      callbackFunc: () => setDeleteModal(null),
    });
  };

  const type = "meal";

  const sortedMeals = useMemo(
    () => groupBy(meals, (meal) => meal[sortValue?.value]?.name),
    [sortValue, meals]
  );
  const sortedMealsHeadings = useMemo(
    () => Object.keys(sortedMeals),
    [sortedMeals]
  );
  const handleCollapse = (id) => {
    let newArr = [...collapsed];
    const match = collapsed?.find((el) => el === id);
    if (match) {
      newArr = newArr.filter((itm) => itm !== id);
    } else {
      newArr = [...newArr, id];
    }

    setCollapsed(newArr);
  };

  useEffect(() => {
    setCollapsed(["0"]);
  }, []);

  const handleFindCollapsed = useCallback(
    (index) => collapsed?.find((item) => item === index),
    [collapsed, sortedMeals]
  );

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-3 sm:p-6 max-h-fit gap-y-3 relative ">
      {getMealsLoading && (
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

        <Select
          placeholder="Sort meals by:"
          options={MEALS_SORT_OPTIONS}
          value={sortValue}
          onChange={(val) => setSortValue(val)}
        />
      </div>
      <div className="flex flex-col justify-start items-start w-full h-fit gap-4">
        {sortedMealsHeadings.map((item, i) => {
          const contentVal = handleFindCollapsed(String(i));

          return (
            <div
              key={item}
              className="flex flex-col justify-start items-start w-full h-fit gap-4 bg-white px-3 py-6 rounded-lg border-1/2 border-grey-border "
              onClick={() => handleCollapse(String(i))}
            >
              <div className="w-full flex justify-between items-center cursor-pointer gap-3 ">
                <span className="text-xl text-black whitespace-nowrap truncate">
                  {item}
                </span>

                <FaChevronDown className="w-4 text-black" />
              </div>

              <div
                style={{
                  maxHeight: `${contentVal ? "fit-content" : "0px"}`,
                  opacity: contentVal ? 1 : 0,
                  zIndex: contentVal ? 1 : -1,
                }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-between items-start transition-all duration-300 ease w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {sortedMeals[item]?.map(({ id, name, ...details }) => {
                  return (
                    <Card
                      key={id}
                      details={{ id, name, ...details }}
                      onEditClick={() => {
                        setActiveMeal({ id, name, ...details });
                        setModalType("Update");
                      }}
                      onDeleteClick={() => {
                        setActiveMeal({ id, name });
                        setDeleteModal({ id, name });
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        pageCount={Number(mealsCount) / pageCount}
        onPageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />
      <div className="w-full min-h-[400px]" />
      <DeleteModal
        active={deleteModal}
        handleDelete={handleDelete}
        isDeleting={deleteMealsLoading}
        onClose={() => setDeleteModal(null)}
        title={
          deleteModal?.name && `You are about to delete "${deleteModal?.name}"`
        }
        text={
          type &&
          `This ${type} will be permanently removed from all meals, Are you sure?`
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

export default Meals;