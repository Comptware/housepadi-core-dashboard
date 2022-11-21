import React, { useState } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

import Button from "components/general/button/button";
import Modal from "components/general/modal/modal/modal";
import ModalBody from "components/general/modal/modalBody/modalBody";
import HostStore from "pages/dashboard/hosts/store";
import ModalHeader from "components/general/modal/modalHeader/modalHeader";
import ModalFooter from "components/general/modal/modalFooter/modalFooter";
import DeleteModal from "components/general/modal/deleteModal";
import ImageModal from "components/general/modal/imageModal/ImageModal";
const HostProfileModal = ({ handleOk, active }) => {
  const navigate = useNavigate();
  const { activeHost, acceptOrRejectHost, acceptOrRejectHostLoading } =
    HostStore;
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [reason, setReason] = useState("");
  const activeHostPayload = { url: activeHost?.id, navigate, route: -1 };
  const payload = { agent_id: activeHost?.id };
  const imgTypes = [".jpg", ".jpeg", ".png"];
  const docType = imgTypes.find((item) =>
    activeHost?.agent_identification_document_url?.includes(item)
  )
    ? "img"
    : "doc";

  return (
    <Modal
      size="sm"
      active={active}
      noPadding
      bodyClass="bg-white"
      toggler={handleOk}
    >
      <ModalHeader>
        {activeHost?.first_name
          ? activeHost?.first_name + " " + activeHost?.last_name
          : "N/A"}
        's Verification
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col justify-start items-start w-full p-[18px] bg-white">
          <div className="flex flex-col space-y-2 pt-3 w-full">
            {activeHost?.agent_identification_document_url &&
              (docType === "doc" ? (
                <a
                  href={activeHost?.agent_identification_document_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    borderColor="border-blue-alt"
                    textColor="text-blue-alt"
                    type="button"
                    text="View Verification Document"
                    fullWidth
                    isOutline
                  />
                </a>
              ) : (
                <Button
                  borderColor="border-blue-alt"
                  textColor="text-blue-alt"
                  text="View Verification Document"
                  fullWidth
                  isOutline
                  onClick={() => setShowModal(true)}
                />
              ))}
            {activeHost?.agent_verified_status !== "in-progress" && (
              <Button
                yellowBg
                text="Suspend Verification"
                onClick={() =>
                  acceptOrRejectHost(
                    {
                      ...payload,
                      agent_verified_status: "in-progress",
                    },
                    activeHostPayload,
                    handleOk
                  )
                }
                fullWidth
                isLoading={acceptOrRejectHostLoading}
              />
            )}

            {activeHost?.agent_verified_status !== "completed" && (
              <Button
                text="Accept Verification"
                onClick={() =>
                  acceptOrRejectHost(
                    {
                      ...payload,
                      agent_verified_status: "completed",
                    },
                    activeHostPayload,
                    handleOk
                  )
                }
                fullWidth
                isLoading={acceptOrRejectHostLoading}
              />
            )}
            {activeHost?.agent_verified_status !== "rejected" && (
              <Button
                redBg
                text="Reject Verification"
                onClick={() => setShowRejectModal(true)}
                isLoading={acceptOrRejectHostLoading}
              />
            )}
          </div>
        </div>
        {showModal && (
          <ImageModal
            active={showModal}
            toggler={() => setShowModal(false)}
            photos={[
              {
                url: activeHost?.agent_identification_document_url,
                name: "Verification document",
              },
            ]}
          />
        )}

        <DeleteModal
          active={showRejectModal}
          noToggle
          handleDelete={() => {
            acceptOrRejectHost(
              {
                ...payload,
                agent_verified_status: "rejected",
                agent_verified_reason: reason,
              },
              activeHostPayload,
              handleOk
            );
          }}
          isDeleting={acceptOrRejectHostLoading}
          onClose={() => setShowRejectModal(false)}
          titleAlt={`Reject ${activeHost?.first_name}'s Verification`}
          onChangeFunc={(val) => setReason(val)}
          value={reason}
          actionText="Reject"
          isDisabled={!reason}
          placeholder="Enter a reason for rejecting this agent's verification"
        />
      </ModalBody>
      <ModalFooter>
        <div className="flex justify-between items-center w-full p-[18px]">
          <div>
            <Button text="Close" onClick={handleOk} />
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
};

HostProfileModal.propTypes = {
  handleOk: PropTypes.func,
  active: PropTypes.bool,
};

export default observer(HostProfileModal);
