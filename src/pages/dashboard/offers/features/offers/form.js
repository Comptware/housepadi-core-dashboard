import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";

import Input from "components/general/input/input";
import { Button } from "components/general/button";
import sanitizePayload from "utils/sanitizePayload";
import FileBox from "components/general/input/fileBox";

import { uploadImageToCloud } from "utils/uploadImagesToCloud";
import { errorToast } from "components/general/toast/toast";
import OffersStore from "../../store";
import Textarea from "components/general/input/textarea";

const Form = ({ toggleModal, type, modaltype, currentPage }) => {
  const {
    createOffer,
    updateOffer,
    createOffersLoading,
    updateOffersLoading,
    activeOffer,
  } = OffersStore;

  const [form, setForm] = useState({
    title: activeOffer?.title || "",
    subtitle: activeOffer?.subtitle || "",
    tag: activeOffer?.tag || "",
    imageUrl: activeOffer?.imageUrl || "",
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
      let data = { ...form, imageUrl, id: activeOffer?.id };
      data = sanitizePayload(data);
      const payload = {
        data,
        pageNumber: currentPage,
        callbackFunc,
      };
      if (type === "Create") {
        await createOffer(payload);
      } else if (type === "Update") {
        await updateOffer(payload);
      }
    } catch (error) {
      errorToast("Error encountered while updating offer", error?.toString());
    } finally {
      setLoading(false);
    }
  };
  const formLoading = useMemo(
    () => createOffersLoading || updateOffersLoading || loading,
    [createOffersLoading, updateOffersLoading, loading]
  );

  const formDisabled = useMemo(
    () => !Object.values(form).every((x) => x),
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
          label={`${modaltype} subtitle`}
          value={form?.subtitle}
          onChangeFunc={(val) => handleChange("subtitle", val)}
          placeholder={`Enter ${modaltype} subtitle`}
          required
        />

        <Input
          label={`${modaltype} tag`}
          value={form?.tag}
          onChangeFunc={(val) => handleChange("tag", val)}
          placeholder={`Enter ${modaltype} tag`}
          required
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
