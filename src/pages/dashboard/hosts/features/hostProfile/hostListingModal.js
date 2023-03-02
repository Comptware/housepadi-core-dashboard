import React, { useState } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import Button from "components/general/button/button";
import Modal from "components/general/Modal/modal/modal";
import ModalBody from "components/general/Modal/modalBody/modalBody";
import HostStore from "pages/dashboard/hosts/store";
import ModalHeader from "components/general/Modal/modalHeader/modalHeader";
import ModalFooter from "components/general/Modal/modalFooter/modalFooter";
import { ReactComponent as Report } from "assets/icons/report.svg";
import DeleteModal from "components/general/Modal/deleteModal";

const HostListingModal = ({ handleOk, data, page_number }) => {
  const {
    activeHost,
    acceptOrRejectListing,
    acceptOrRejectListingLoading,
    blockListing,
    blockListingLoading,
  } = HostStore;
  const activeListingPayload = {
    payload: { agent_id: activeHost?.id },
    page_number,
  };
  const payload = { shortlet_id: data?.id };

  const [showModal, setShowModal] = useState(false);

  const [modalData, setModalData] = useState(null);

  const [rejectReason, setRejectReason] = useState("");

  const [blockReason, setBlockReason] = useState("");

  const blockHostPayload = {
    shortlet_id: data?.id,
    blocked_reason: blockReason,
  };

  const rejectData = {
    title: `Reject ${data?.name}`,
    placeholder: "Enter a reason for rejecting this listing",
    onChangeFunc: (val) => setRejectReason(val),
    actionText: "Reject",
  };
  const blockData = {
    title: `Block ${data?.name}`,
    placeholder: "Enter a reason for blocking this listing",
    onChangeFunc: (val) => setBlockReason(val),
    actionText: "Block",
  };

  const handleBlockListing = () =>
    blockListing(blockHostPayload, activeListingPayload, handleOk);

  const handleRejectListing = () =>
    acceptOrRejectListing(
      {
        ...payload,
        shortlet_verified_status: "rejected",
        shortlet_verified_reason: rejectReason,
      },
      activeListingPayload,
      handleOk
    );

  return (
    <Modal size="sm" active noPadding bodyClass="bg-white" toggler={handleOk}>
      <ModalHeader>Manage {data?.name}</ModalHeader>
      <ModalBody>
        <div className="flex flex-col justify-start items-start w-full p-[18px] bg-white">
          <div className="flex flex-col space-y-2 pt-3 w-full border-b border-grey-border pb-3 mb-4">
            <Link to={`/new-listing/step-one/${data?.id}`}>
              <Button
                borderColor="border-green"
                textColor="text-green"
                type="button"
                text="View Listing"
                fullWidth
                isOutline
              />
            </Link>

            {data?.shortlet_verified_status !== "in-progress" && (
              <Button
                yellowBg
                text="Suspend Listing"
                onClick={() =>
                  acceptOrRejectListing(
                    {
                      ...payload,
                      shortlet_verified_status: "in-progress",
                    },
                    activeListingPayload,
                    handleOk
                  )
                }
                fullWidth
                isLoading={acceptOrRejectListingLoading}
              />
            )}
            {data?.shortlet_verified_status !== "completed" && (
              <Button
                text="Accept Listing"
                onClick={() =>
                  acceptOrRejectListing(
                    {
                      ...payload,
                      shortlet_verified_status: "completed",
                    },
                    activeListingPayload,
                    handleOk
                  )
                }
                fullWidth
                isLoading={acceptOrRejectListingLoading}
              />
            )}
            {data?.shortlet_verified_status !== "rejected" && (
              <Button
                redBg
                text="Reject Listing"
                onClick={() => {
                  setShowModal(true);
                  setModalData(rejectData);
                }}
                isLoading={acceptOrRejectListingLoading}
              />
            )}
          </div>

          <Button
            isOutline
            text={data?.blocked ? "Unblock Listing" : "Block Listing"}
            textColor="text-red-alt"
            borderColor="border-red-alt"
            icon={<Report />}
            small
            fullWidth
            onClick={() => {
              setShowModal(true);
              setModalData(blockData);
            }}
          />
        </div>

        <DeleteModal
          active={showModal}
          noToggle
          handleDelete={() =>
            modalData?.actionText === "Block"
              ? handleBlockListing()
              : handleRejectListing()
          }
          isDeleting={
            modalData?.actionText === "Block"
              ? blockListingLoading
              : acceptOrRejectListingLoading
          }
          onClose={() => setShowModal(false)}
          titleAlt={modalData?.title}
          onChangeFunc={(val) => modalData?.onChangeFunc(val)}
          value={modalData?.actionText === "Block" ? blockReason : rejectReason}
          actionText={modalData?.actionText}
          isDisabled={
            modalData?.actionText === "Block" ? !blockReason : !rejectReason
          }
          placeholder={modalData?.placeholder}
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

HostListingModal.propTypes = {
  handleOk: PropTypes.func,
  data: PropTypes.any,
  page_number: PropTypes.number,
};

export default observer(HostListingModal);
