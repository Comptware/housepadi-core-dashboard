import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";

import Input from "components/general/input/input";
import Modal from "components/general/Modal/modal/modal";
import ModalBody from "components/general/Modal/modalBody/modalBody";
import { Button } from "components/general/button";
import cleanPayload from "utils/cleanPayload";
import ModalHeader from "components/general/Modal/modalHeader/modalHeader";
import { uploadImageToCloud } from "utils/uploadImagesToCloud";
import ListingStore from "../../store";
import FileInput from "components/general/input/fileInput";
import { handleFileType } from "utils/functions";
import ImageModal from "components/general/Modal/imageModal/ImageModal";

const AddAarModal = ({ toggleModal, type, active }) => {
  const { createAAR, getAAR } = ListingStore;
  const emptyFiles = {
    icon_url: { type: "", url: "" },
  };
  const emptyImageModal = {
    show: false,
    type: "",
  };
  const [form, setForm] = useState({
    name: "",
    icon: "",
  });

  const [files, setFiles] = useState({ ...emptyFiles });
  const [loading, setLoading] = useState(false);
  const [imageModal, setImageModal] = useState({ ...emptyImageModal });

  useEffect(() => {
    handleFiles();
  }, [form.icon]);

  const handleFiles = () => {
    const icon_url = handleFileType(form?.icon, "icon_url");

    setFiles({ ...icon_url });
  };

  const handleChange = (prop, val) => {
    setForm({ ...form, [prop]: val });
  };
  const createUtility = async () => {
    setLoading(true);
    const icon_url = await uploadImageToCloud(form.icon);
    let data = { name: form.name, icon: icon_url };
    data = cleanPayload(data);
    await createAAR({ data, type });
    setLoading(false);
    getAAR();
    toggleModal();
  };

  const formDisabled = () => {
    return !form?.name || !form?.icon;
  };

  return (
    <>
      <Modal
        toggler={toggleModal}
        size="sm"
        noPadding
        bodyClass="bg-white py-6 px-6"
        active={active}
      >
        <ModalHeader>
          <p className="text-blue text-2xl font-bold capitalize">
            Create {type}
          </p>
        </ModalHeader>
        <ModalBody>
          <form
            className="flex flex-col justify-around gap-y-4 sm:gap-x-4 md:gap-x-6 lg:gap-x-10 w-full py-3 pr-3"
            onSubmit={createUtility}
          >
            <Input
              label={`${type} name`}
              value={form?.name}
              onChangeFunc={(val) => handleChange("name", val)}
              placeholder={`Enter ${type} name`}
              required
            />
            <div className="flex justify-between items-end w-full">
              <FileInput
                placeholder="Upload an appropriate icon"
                title="Upload an appropriate icon"
                file={form.icon}
                onChangeFunc={(val) => handleChange("icon", val)}
                isDisabled={loading}
                className={
                  files?.icon_url?.url ? "w-[calc(100%-100px)]" : "w-full"
                }
              />

              {files?.icon_url?.url &&
                (files?.icon_url?.type === "pdf" ? (
                  <a
                    href={files?.icon_url?.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button type="button" text="Preview" />
                  </a>
                ) : (
                  <Button
                    type="button"
                    text="Preview"
                    small
                    borderColor="border-none"
                    onClick={() =>
                      setImageModal({
                        show: true,
                        type: files?.icon_url?.url,
                      })
                    }
                  />
                ))}
            </div>
            <Button
              text={`Create ${type}`}
              isDisabled={formDisabled() || loading}
              isLoading={loading}
              onClick={createUtility}
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
        </ModalBody>
      </Modal>
      {imageModal.show && (
        <ImageModal
          active={imageModal.show}
          toggler={() => setImageModal({ ...emptyImageModal })}
          photos={[{ url: imageModal.type, name: form.icon?.name }]}
        />
      )}
    </>
  );
};

AddAarModal.propTypes = {
  type: PropTypes.string,
  toggleModal: PropTypes.func,
  active: PropTypes.bool,
};

export default observer(AddAarModal);
