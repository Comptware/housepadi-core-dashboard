import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";

import Input from "components/general/input/input";
import { Button } from "components/general/button";
import sanitizePayload from "utils/sanitizePayload";
import SettingsStore from "../../store";

const Form = ({ toggleModal, type, modaltype, currentPage }) => {
  const {
    createMealType,
    updateMealType,
    mealTypes,
    createMealTypesLoading,
    updateMealTypesLoading,
    activeMealType,
  } = SettingsStore;

  const [form, setForm] = useState({
    name: activeMealType?.name || "",
  });

  const handleChange = (prop, val) => {
    setForm({ ...form, [prop]: val });
  };

  const callbackFunc = () => toggleModal();
  const handleSubmit = async () => {
    let data = {
      name: form.name,
      position: String(mealTypes?.length + 1),
      id: activeMealType?.id,
    };
    data = sanitizePayload(data);
    const payload = {
      data,
      pageNumber: currentPage,
      callbackFunc,
    };
    if (type === "Create") {
      await createMealType(payload);
    } else if (type === "Update") {
      await updateMealType(payload);
    }
  };
  const formLoading = useMemo(
    () => createMealTypesLoading || updateMealTypesLoading,
    [createMealTypesLoading, updateMealTypesLoading]
  );

  const formDisabled = useMemo(() => !form?.name, [form]);

  return (
    <form
      className="flex flex-col justify-around gap-y-4 sm:gap-x-4 md:gap-x-6 lg:gap-x-10 w-full py-3"
      onSubmit={handleSubmit}
    >
      <Input
        label={`${modaltype} name`}
        value={form?.name}
        onChangeFunc={(val) => handleChange("name", val)}
        placeholder={`Enter ${modaltype} name`}
        required
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
  );
};

Form.propTypes = {
  type: PropTypes.string,
  modaltype: PropTypes.string,
  toggleModal: PropTypes.func,
  currentPage: PropTypes.string,
};

export default observer(Form);
