import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { useNavigate } from "react-router";

import { Button } from "components/general/button";
import { DEFAULT_AVATAR } from "utils/constants";
import { Agent } from "assets/icons";
import { ReactComponent as Report } from "assets/icons/report.svg";
import { determineHostType } from "utils/hosts";
import DeleteModal from "components/general/modal/deleteModal";
import HostStore from "../../store";
import HostProfileModal from "./hostProfileModal";

const UserProfile = () => {
  const navigate = useNavigate();
  const { activeHost, blockHost, blockHostLoading } = HostStore;
  const [showModal, setShowModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [reason, setReason] = useState("");
  const blockHostPayload = {
    user_id: activeHost?.id,
    blocked_reason: reason,
  };
  const activeHostPayload = { url: activeHost?.id, navigate, route: -1 };
  return (
    <div className="flex flex-col justify-start items-start w-full h-full border-r-1/2 border-grey-border py-8 px-7 space-y-2">
      <div className="flex flex-col justify-start items-start space-y-1 w-full relative pb-6">
        <div className="flex justify-start items-center w-fit space-x-6 pt-3">
          <div className="w-fit h-fit p-[4px] rounded-full border-b border-l border-blue-alt">
            <div
              className="w-[56px] h-[56px] rounded-full"
              style={{
                backgroundImage: `url(${
                  activeHost?.profile_image_url || DEFAULT_AVATAR
                })`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
              }}
            />
          </div>
          <div className="flex flex-col justify-center items-start space-y-2">
            <span className="text-base text-black regular-font capitalize">
              {activeHost?.first_name
                ? activeHost?.first_name + " " + activeHost?.last_name
                : "N/A"}{" "}
            </span>

            <span className="text-[13px] text-grey-text">
              Member since{" "}
              {moment(activeHost?.created_at).format("MMM Do, YYYY")}
            </span>
            {determineHostType(activeHost?.agent_verified_status)}
          </div>
        </div>
      </div>

      {activeHost?.agent_identification_document_url && (
        <Button
          text="Manage agent verification"
          small
          icon={<Agent className="fill-white" />}
          fullWidth
          onClick={() => setShowDocModal(true)}
        />
      )}
      <Button
        isOutline
        text={activeHost?.blocked ? "Unblock Agent" : "Block Agent"}
        textColor="text-red-alt"
        borderColor="border-red-alt"
        icon={<Report />}
        small
        fullWidth
        onClick={() => setShowModal(true)}
      />

      {showModal && (
        <DeleteModal
          handleDelete={() => {
            blockHost(
              blockHostPayload,
              () => setShowModal(false),
              activeHostPayload
            );
          }}
          isDeleting={blockHostLoading}
          onClose={() => setShowModal(false)}
          titleAlt={`Block Agent ${activeHost?.first_name}`}
          onChangeFunc={(val) => setReason(val)}
          value={reason}
          actionText="Block"
          isDisabled={!reason}
          placeholder="Enter a reason for blocking this agent"
        />
      )}

      {showDocModal && (
        <HostProfileModal handleOk={() => setShowDocModal(false)} />
      )}
    </div>
  );
};

export default observer(UserProfile);
