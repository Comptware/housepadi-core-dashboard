import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { isEmpty } from "lodash";

import { extractFileNameFromUrl, handleFileType } from "utils/functions";
import { uploadImageToCloud } from "utils/uploadImagesToCloud";
import { Button } from "components/general/button";
import Input from "components/general/input/input";
import CommonStore from "stores/common";
import AvatarPhoto from "components/general/input/avatarPhoto";
import PhoneNumber from "components/general/phoneNumber/phoneNumber";
import FileInput from "components/general/input/fileInput";
import ImageModal from "components/general/modal/imageModal/ImageModal";
import CircleLoader from "components/general/circleLoader/circleLoader";
import cleanPayload from "utils/cleanPayload";
import Select from "components/general/input/select";
import PaystackStore from "stores/paystack";

const Form = () => {
  const navigate = useNavigate();

  const { loading, loadingFetchMe, getMe, updateMe } = CommonStore;
  const {
    banks,
    getBanks,
    userDetails,
    getUserBankDetails,
    loading: banksloading,
    detailsLoading,
  } = PaystackStore;
  const emptyFiles = {
    agent_identification_document_url: { type: "", url: "" },
    agent_land_document_url: { type: "", url: "" },
    agent_license_document_url: { type: "", url: "" },
  };
  const emptyImageModal = {
    show: false,
    type: "",
  };
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    profile_image_url: "",
    email: "",
    agent_identification_document_url: "",
    account_name: "",
    account_number: "",
    agent_land_document_url: "",
    agent_license_document_url: "",
  });

  const [files, setFiles] = useState({ ...emptyFiles });
  const [uploading, setUploading] = useState(false);
  const [imageModal, setImageModal] = useState({ ...emptyImageModal });
  const [selectedBank, setSelectedBank] = useState("");

  useEffect(() => {
    handleSetForm();
  }, []);

  useEffect(() => {
    handleFiles("agent_identification_document_url");
  }, [form.agent_identification_document_url]);
  useEffect(() => {
    handleFiles("agent_license_document_url");
  }, [form.agent_license_document_url]);
  useEffect(() => {
    handleFiles("agent_land_document_url");
  }, [form.agent_land_document_url]);

  useEffect(() => {
    handleFindSelectedBank(form?.bank_name);
  }, [banks]);

  useEffect(() => {
    !isEmpty(banks) &&
      selectedBank?.value &&
      form?.account_number?.length > 9 &&
      getUserBankDetails(form?.account_number, selectedBank?.value);
  }, [form?.account_number, selectedBank]);

  const handleSetForm = async () => {
    const res = await Promise.all([getMe(), getBanks()]);
    const data = res[0];
    const {
      first_name,
      last_name,
      phone_number,
      profile_image_url,
      email,
      agent_identification_document_url,
      account_name,
      account_number,
      agent_land_document_url,
      agent_license_document_url,
      bank_name,
    } = data;

    const me = {
      first_name,
      last_name,
      phone_number: "+234" + phone_number?.replace("+2340", ""),
      profile_image_url,
      email,
      agent_identification_document_url,
      account_name,
      bank_name,
      account_number,
      agent_land_document_url,
      agent_license_document_url,
    };

    setForm({ ...me });
  };
  const handleFiles = (type) => {
    const val = handleFileType(form[type], type);
    setFiles((prev) => ({ ...prev, ...val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const phone_number = "";
    const fileUrls = await Promise.all([
      uploadImageToCloud(form.profile_image_url),

      uploadImageToCloud(form.agent_identification_document_url),

      uploadImageToCloud(form.agent_license_document_url),

      uploadImageToCloud(form.agent_land_document_url),
    ]);

    const profile_image_url = fileUrls[0];
    const agent_identification_document_url = fileUrls[1];
    const agent_license_document_url = fileUrls[2];
    const agent_land_document_url = fileUrls[3];
    setUploading(false);
    let payload = {
      ...form,
      phone_number,
      profile_image_url,
      agent_identification_document_url,
      agent_license_document_url,
      agent_land_document_url,
      bank_name: form?.bank_name || selectedBank?.label,
      account_name: form?.account_name || userDetails?.account_name,
    };
    payload = cleanPayload(payload);
    updateMe({ data: payload, navigate, route: "/dashboard/me" });
  };
  const handleChange = (prop, val) => {
    setForm({ ...form, [prop]: val });
  };
  const formDisabled = () => {
    const emptyFormField = Object.values(form).find((item) => item === "");

    if (emptyFormField === "") {
      return true;
    }
    return false;
  };

  const handleFindSelectedBank = (bank_name) => {
    const selectedBankMatch =
      banks?.find(({ label }) => label === bank_name) || "";
    setSelectedBank(selectedBankMatch);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-start items-start w-full h-full relative px-5 space-y-8 mb-24 "
    >
      <div className="pt-8">
        <AvatarPhoto
          file={form.profile_image_url}
          onChangeFunc={(val) => handleChange("profile_image_url", val)}
          isDisabled={loading}
          isEdit
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 xl:gap-14 justify-between items-start w-full">
        <div className="flex flex-col justify-start items-start w-full h-fit relative gap-5">
          <span className="text-grey-text text-base uppercase regular-font">
            PERSONAL DETAILS *
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 justify-between items-start w-full">
            <Input
              label="First Name"
              value={form?.first_name}
              onChangeFunc={(val) => handleChange("first_name", val)}
              placeholder="Enter first Name"
              required
            />

            <Input
              label="Last Name"
              value={form?.last_name}
              onChangeFunc={(val) => handleChange("last_name", val)}
              placeholder="Enter last Name"
              required
            />
          </div>

          <Input
            label="Email Address"
            value={form?.email}
            onChangeFunc={(val) => handleChange("email", val)}
            placeholder="taiwoharry@gmail.com"
            type="email"
            required
          />

          <PhoneNumber
            label="Contact Number"
            value={form.phone_number}
            onPhoneChange={(val) => handleChange("phone_number", val)}
            placeholder="Enter contact number"
            // labelClass="!text-black regular-font"
            required
          />
        </div>

        <div className="flex flex-col justify-start items-start w-full space-y-5">
          <span className="text-grey-text text-base uppercase regular-font">
            BANK DETAILS *
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 justify-between items-start w-full">
            <Input
              type="number"
              label="Account Number"
              labelAlt={userDetails?.account_name}
              value={form?.account_number}
              onChangeFunc={(val) => handleChange("account_number", val)}
              placeholder="1234567890"
              isDisabled={loading}
              format="##########"
              isLoading={detailsLoading}
              labelAltClassName="text-blue-alt"
            />

            <Select
              label="Bank Name"
              placeholder="Select bank"
              value={selectedBank}
              options={banks}
              onChange={(val) => setSelectedBank(val)}
              isLoading={banksloading}
            />
          </div>

          <span className="text-grey-text text-base uppercase regular-font">
            VERIFICATION DETAILS *
          </span>
          {/* ID document */}
          <div className="flex justify-between items-end w-full">
            <FileInput
              placeholder="Upload a valid government issued ID"
              title="Upload a valid government issued ID"
              file={form.agent_identification_document_url}
              onChangeFunc={(val) =>
                handleChange("agent_identification_document_url", val)
              }
              isDisabled={loading}
              type="pdf_image"
              className={
                files?.agent_identification_document_url?.url
                  ? "w-[calc(100%-100px)]"
                  : "w-full"
              }
            />

            {files?.agent_identification_document_url?.url &&
              (files?.agent_identification_document_url?.type === "pdf" ? (
                <a
                  href={files?.agent_identification_document_url?.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button type="button" text="Preview" small />
                </a>
              ) : (
                <Button
                  type="button"
                  text="Preview"
                  small
                  onClick={() =>
                    setImageModal({
                      show: true,
                      type: files?.agent_identification_document_url?.url,
                    })
                  }
                />
              ))}
          </div>
          {/* License document */}

          <div className="flex justify-between items-end w-full">
            <FileInput
              placeholder="Upload a valid government issued license document"
              title="Upload a valid government issued license document"
              file={form.agent_license_document_url}
              onChangeFunc={(val) =>
                handleChange("agent_license_document_url", val)
              }
              isDisabled={loading}
              type="pdf_image"
              className={
                files?.agent_license_document_url?.url
                  ? "w-[calc(100%-100px)]"
                  : "w-full"
              }
            />

            {files?.agent_license_document_url?.url &&
              (files?.agent_license_document_url?.type === "pdf" ? (
                <a
                  href={files?.agent_license_document_url?.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button type="button" text="Preview" small />
                </a>
              ) : (
                <Button
                  type="button"
                  text="Preview"
                  small
                  onClick={() =>
                    setImageModal({
                      show: true,
                      type: files?.agent_license_document_url?.url,
                    })
                  }
                />
              ))}
          </div>

          {/* Land Document */}

          <div className="flex justify-between items-end w-full">
            <FileInput
              placeholder="Upload a valid government issued land document"
              title="Upload a valid government issued land document"
              file={form.agent_land_document_url}
              onChangeFunc={(val) =>
                handleChange("agent_land_document_url", val)
              }
              isDisabled={loading}
              type="pdf_image"
              className={
                files?.agent_land_document_url?.url
                  ? "w-[calc(100%-100px)]"
                  : "w-full"
              }
            />

            {files?.agent_land_document_url?.url &&
              (files?.agent_land_document_url?.type === "pdf" ? (
                <a
                  href={files?.agent_land_document_url?.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button type="button" text="Preview" small />
                </a>
              ) : (
                <Button
                  type="button"
                  text="Preview"
                  small
                  onClick={() =>
                    setImageModal({
                      show: true,
                      type: files?.agent_land_document_url?.url,
                    })
                  }
                />
              ))}
          </div>
        </div>
      </div>

      <Button
        text="Save & Continue"
        type="submit"
        isDisabled={formDisabled() || loading || uploading}
        isLoading={loading || uploading}
        onClick={handleSubmit}
      />
      {loadingFetchMe && (
        <div className="absolute w-full flex justify-center items-center h-full z-[99]">
          <CircleLoader blue />
        </div>
      )}
      <div className="w-full min-h-[100px]" />
      {/* {imageModal.show && ( */}
      <ImageModal
        active={imageModal.show}
        toggler={() => setImageModal({ ...emptyImageModal })}
        photos={[
          {
            url: imageModal.type,
            name: extractFileNameFromUrl(imageModal.type),
          },
        ]}
      />
      {/* )} */}
    </form>
  );
};

export default observer(Form);
