import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import Tippy from "@tippyjs/react";
import { AiFillExclamationCircle } from "react-icons/ai";

import Input from "components/general/input/input";
import { Button } from "components/general/button";
import sanitizePayload from "utils/sanitizePayload";
import FileBox from "components/general/input/fileBox";
import Select from "components/general/input/select";
import { uploadImageToCloud } from "utils/uploadImagesToCloud";
import SettingsStore from "../../store";
import { MODAL_TYPES } from "../../utils";
import LaundryTypeModal from "../laundryTypes/modal";
import { errorToast } from "components/general/toast/toast";

const Form = ({ toggleModal, type, modaltype, currentPage }) => {
  const {
    createLaundry,
    updateLaundry,
    createLaundriesLoading,
    updateLaundriesLoading,
    activeLaundry,
    laundryTypes,
    getLaundryTypesLoading,
    getLaundryTypes,
  } = SettingsStore;
  const { LAUNDRY_TYPE } = MODAL_TYPES;
  const [form, setForm] = useState({
    name: activeLaundry?.name || "",
    price: activeLaundry?.price || "",
    value: activeLaundry?.value || "",
    imageUrl: activeLaundry?.imageUrl || "",
    laundryTypeId: activeLaundry?.laundryTypeId || "",
  });
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLaundryTypes();
  }, []);
  const handleChange = (prop, val) => {
    setForm({ ...form, [prop]: val });
  };

  const callbackFunc = () => toggleModal();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const imageUrl = await uploadImageToCloud(form?.imageUrl);
      let data = { ...form, imageUrl, id: activeLaundry?.id };
      data = sanitizePayload(data);
      const payload = {
        data,
        pageNumber: currentPage,
        callbackFunc,
      };
      if (type === "Create") {
        await createLaundry(payload);
      } else if (type === "Update") {
        await updateLaundry(payload);
      }
    } catch (error) {
      errorToast("Error encountered while uploading image", error?.toString());
    } finally {
      setLoading(false);
    }
  };
  const formLoading = useMemo(
    () => createLaundriesLoading || updateLaundriesLoading || loading,
    [createLaundriesLoading, updateLaundriesLoading, loading]
  );

  const formDisabled = useMemo(
    () => !Object.values(form).every((x) => x || x === false),
    [form]
  );

  const laundryTypeId = useMemo(
    () => laundryTypes?.find(({ id }) => id === form?.laundryTypeId),
    [laundryTypes, form.laundryTypeId]
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

        <Input
          label={`${modaltype} value`}
          labelAlt={
            <Tippy content="the laundry item amount will be its price multiplied by this value ">
              <div>
                <AiFillExclamationCircle className="text-grey mt-0.5" />
              </div>
            </Tippy>
          }
          type="number"
          value={form?.value}
          onChangeFunc={(val) => handleChange("value", val)}
          placeholder={`Enter ${modaltype} value`}
          required
        />
        <Select
          label="Laundry Type"
          labelControl={
            <label
              onClick={() => setModalType(LAUNDRY_TYPE)}
              className="general-input-label !text-green text-sm cursor-pointer "
            >
              Create laundry type
            </label>
          }
          value={laundryTypeId}
          onChange={(val) => handleChange("laundryTypeId", val.value)}
          placeholder="Select laundry type"
          options={laundryTypes}
          isLoading={getLaundryTypesLoading}
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

      <LaundryTypeModal
        active={modalType === LAUNDRY_TYPE}
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
