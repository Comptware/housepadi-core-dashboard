import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

import Input from "components/general/input/input";
import { Button } from "components/general/button";
import sanitizePayload from "utils/sanitizePayload";
import Select from "components/general/input/select";
import UserStore from "../../../store";

const Form = ({ toggleModal, type, modaltype, currentPage }) => {
  const { updateUser, updateUsersLoading, activeUser } = UserStore;
  const [form, setForm] = useState({
    name: activeUser?.name || "",
    phoneNumber: activeUser?.phoneNumber || "",
    addressText: activeUser?.addressText || "",
    addressLat: activeUser?.addressLat || "",
    addressLng: activeUser?.addressLng || "",
  });

  const handleChange = (prop, val) => {
    setForm({ ...form, [prop]: val });
  };

  const callbackFunc = () => toggleModal();
  const handleSubmit = async () => {
    let data = {
      ...form,
      id: activeUser?.id,
    };
    data = sanitizePayload(data);
    const payload = {
      data,
      pageNumber: currentPage,
      callbackFunc,
    };

    await updateUser(payload);
  };
  const formLoading = useMemo(() => updateUsersLoading, [updateUsersLoading]);

  const formDisabled = useMemo(
    () => !Object.values(form).every((x) => x),
    [form]
  );

  const handleGetLatLng = () => {
    if (form?.addressText) {
      geocodeByAddress(form?.addressText)
        .then((results) => getLatLng(results[0]))
        .then((res) => {
          setForm({
            ...form,
            addressLat: String(res?.lat),
            addressLng: String(res?.lng),
          });
        });
    }
  };
  useEffect(() => {
    handleGetLatLng();
  }, [form?.addressText]);

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
          label={`${modaltype} phone number`}
          value={form?.phoneNumber}
          onChangeFunc={(val) => handleChange("phoneNumber", val)}
          placeholder={`Enter ${modaltype} phone number`}
          required
          type="tel"
        />
        <Select
          label="Address"
          addressValue={form?.addressText}
          onChange={(val) => handleChange("addressText", val?.label)}
          addressPlaceholder={form?.addressText || "Enter address"}
          fullWidth
          address
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
