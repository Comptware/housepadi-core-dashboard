import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";

import Input from "components/general/input/input";
import { Button } from "components/general/button";
import sanitizePayload from "utils/sanitizePayload";
import FileBox from "components/general/input/fileBox";
import Select from "components/general/input/select";
import { uploadImageToCloud } from "utils/uploadImagesToCloud";
import SettingsStore from "../../store";
import { MODAL_TYPES } from "../../utils";
import MealTypeModal from "../mealTypes/modal";
import MealcategoryModal from "../mealCategories/modal";
import { errorToast } from "components/general/toast/toast";

const Form = ({ toggleModal, type, modaltype, currentPage }) => {
  const {
    createMeal,
    updateMeal,
    createMealsLoading,
    updateMealsLoading,
    activeMeal,
    mealTypes,
    mealCategories,
    getMealTypesLoading,
    getMealCategoriesLoading,
    getMealCategories,
    getMealTypes,
  } = SettingsStore;
  const { MEAL_TYPE, MEAL_CATEGORY } = MODAL_TYPES;
  const [form, setForm] = useState({
    name: activeMeal?.name || "",
    price: activeMeal?.price || "",
    imageUrl: activeMeal?.imageUrl || "",
    mealTypeId: activeMeal?.mealTypeId || "",
    mealCategoryId: activeMeal?.mealCategoryId || "",
  });
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMealCategories();
    getMealTypes();
  }, []);
  const handleChange = (prop, val) => {
    setForm({ ...form, [prop]: val });
  };

  const callbackFunc = () => toggleModal();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const imageUrl = await uploadImageToCloud(form?.imageUrl);
      let data = { ...form, imageUrl, id: activeMeal?.id };
      data = sanitizePayload(data);
      const payload = {
        data,
        pageNumber: currentPage,
        callbackFunc,
      };
      if (type === "Create") {
        await createMeal(payload);
      } else if (type === "Update") {
        await updateMeal(payload);
      }
    } catch (error) {
      errorToast("Error encountered while uploading image", error?.toString());
    } finally {
      setLoading(false);
    }
  };
  const formLoading = useMemo(
    () => createMealsLoading || updateMealsLoading || loading,
    [createMealsLoading, updateMealsLoading, loading]
  );

  const formDisabled = useMemo(
    () => !Object.values(form).every((x) => x),
    [form]
  );

  const mealTypeId = useMemo(
    () => mealTypes?.find(({ id }) => id === form?.mealTypeId),
    [mealTypes, form.mealTypeId]
  );
  const mealCategoryId = useMemo(
    () => mealCategories?.find(({ id }) => id === form?.mealCategoryId),
    [mealCategories, form.mealCategoryId]
  );
  return (
    <>
      <form
        className="flex flex-col justify-around gap-y-4 sm:gap-x-4 md:gap-x-6 lg:gap-x-10 w-full py-3 pr-3"
        onSubmit={handleSubmit}
      >
        <Input
          label={`${modaltype} name`}
          value={form?.name}
          onChangeFunc={(val) => handleChange("name", val)}
          placeholder={`Enter ${modaltype} name`}
          required
        />

        <Input
          label={`${modaltype} price`}
          type="number"
          value={form?.price}
          onChangeFunc={(val) => handleChange("price", val)}
          placeholder={`Enter ${modaltype} price`}
          prefix="NGN"
          required
        />
        <Select
          label="Meal Type"
          labelControl={
            <label
              onClick={() => setModalType(MEAL_TYPE)}
              className="general-input-label !text-green text-sm cursor-pointer "
            >
              Create meal type
            </label>
          }
          value={mealTypeId}
          onChange={(val) => handleChange("mealTypeId", val.value)}
          placeholder="Select meal type"
          options={mealTypes}
          isLoading={getMealTypesLoading}
          fullWidth
        />

        <Select
          label="Meal Category"
          labelControl={
            <label
              onClick={() => setModalType(MEAL_CATEGORY)}
              className="general-input-label !text-green text-sm cursor-pointer "
            >
              Create meal category
            </label>
          }
          value={mealCategoryId}
          onChange={(val) => handleChange("mealCategoryId", val.value)}
          placeholder="Select meal category"
          options={mealCategories}
          isLoading={getMealCategoriesLoading}
          fullWidth
        />

        <FileBox
          placeholder="Not more that 2MB"
          title={`${modaltype} image`}
          required
          file={form?.imageUrl}
          onChangeFunc={(e) => handleChange("imageUrl", e)}
          removeAllClick={() => {
            handleChange("imageUrl", null);
          }}
          isDisabled={formDisabled || formLoading}
          isError={false}
          maxSize={3}
          onSizeError={(file) => console.log("sizeerror", file)}
        />

        <Button
          text={`${type} ${modaltype}`}
          isDisabled={formDisabled}
          isLoading={formLoading}
          onClick={handleSubmit}
        />
        <Button
          isOutline
          text="Cancel"
          textColor="text-red-alt"
          borderColor="border-transparent"
          className=""
          onClick={toggleModal}
          type="button"
        />
      </form>

      <MealTypeModal
        active={modalType === MEAL_TYPE}
        toggleModal={() => setModalType("")}
        type={"Create"}
      />
      <MealcategoryModal
        active={modalType === MEAL_CATEGORY}
        toggleModal={() => setModalType("")}
        type={"Create"}
      />
    </>
  );
};

Form.propTypes = {
  type: PropTypes.string,
  modaltype: PropTypes.string,
  toggleModal: PropTypes.func,
  pageNumber: PropTypes.string,
  currentPage: PropTypes.string,
};

export default observer(Form);
