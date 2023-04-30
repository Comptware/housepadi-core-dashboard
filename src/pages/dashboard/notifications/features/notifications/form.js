import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";

import Input from "components/general/input/input";
import { Button } from "components/general/button";
import sanitizePayload from "utils/sanitizePayload";

import { uploadImageToCloud } from "utils/uploadImagesToCloud";
import { errorToast } from "components/general/toast/toast";
import Textarea from "components/general/input/textarea";
import NotificationsStore from "../../store";

const Form = ({ toggleModal, type, modaltype, currentPage }) => {
  const {
    createNotification,
    updateNotification,
    createNotificationsLoading,
    updateNotificationsLoading,
    activeNotification,
  } = NotificationsStore;

  const [form, setForm] = useState({
    title: activeNotification?.title || "",
    body: activeNotification?.body || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (prop, val) => {
    setForm({ ...form, [prop]: val });
  };

  const callbackFunc = () => toggleModal();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const imageUrl = await uploadImageToCloud(form?.imageUrl);
      let data = { ...form, imageUrl, id: activeNotification?.id };
      data = sanitizePayload(data);
      const payload = {
        data,
        pageNumber: currentPage,
        callbackFunc,
      };
      if (type === "Create") {
        await createNotification(payload);
      } else if (type === "Update") {
        await updateNotification(payload);
      }
    } catch (error) {
      errorToast(
        "Error encountered while updating notification",
        error?.toString()
      );
    } finally {
      setLoading(false);
    }
  };
  const formLoading = useMemo(
    () => createNotificationsLoading || updateNotificationsLoading || loading,
    [createNotificationsLoading, updateNotificationsLoading, loading]
  );

  const formDisabled = useMemo(
    () => !Object.values(form).every((x) => x || x === false),
    [form]
  );

  return (
    <>
      <form
        className="flex flex-col justify-around gap-y-4 sm:gap-x-4 md:gap-x-6 lg:gap-x-10 w-full py-3 pr-3"
        onSubmit={handleSubmit}
      >
        <Input
          label={`${modaltype} title`}
          value={form?.title}
          onChangeFunc={(val) => handleChange("title", val)}
          placeholder={`Enter ${modaltype} title`}
          required
        />

        <Textarea
          label={`${modaltype} body`}
          value={form?.body}
          onChangeFunc={(val) => handleChange("body", val)}
          placeholder={`Enter ${modaltype} body`}
          required
        />

        <Button
          text={`${type === "Create" ? "Send" : type} ${modaltype}`}
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
