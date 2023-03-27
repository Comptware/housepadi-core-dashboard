import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { useNavigate } from "react-router";
import DeleteModal from "components/general/Modal/deleteModal";

import UserStore from "../../store";
import { DeleteButton } from "components/general/button";
import UserModal from "./overview/modal";

const UserProfile = () => {
  const navigate = useNavigate();
  const { activeUser, deleteUser, deleteUsersLoading } = UserStore;

  const [modalType, setModalType] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete = () => {
    deleteUser({
      pageNumber: 1,
      callbackFunc: () => {
        navigate(-1);
      },
    });
  };

  return (
    <div className="flex flex-col justify-start items-start w-full h-full border-r-1/2 border-grey-border pb-8 px-7 space-y-2">
      <div className="flex flex-col justify-start items-start gap-y-10 w-full relative pb-6">
        <div className="flex justify-start items-center w-fit space-x-6 pt-3">
          <div className="flex flex-col justify-center items-start space-y-2">
            <span className="text-base text-black regular-font capitalize">
              {activeUser?.name || "Name: N/A"}{" "}
            </span>

            <span className="text-[13px] text-grey-text">
              Phone: {activeUser?.phoneNumber || "N/A"}
            </span>

            <span className="text-[13px] text-grey-text">
              Email: {activeUser?.email}
            </span>
            <span className="text-[13px] text-grey-text">
              Role: {activeUser?.role}
            </span>
            <span className="text-[13px] text-grey-text">
              Address: {activeUser?.addressText || "N/A"}
            </span>
            <span className="text-[13px] text-grey-text">
              Member since{" "}
              {moment(activeUser?.createdAt).format("MMM Do, YYYY")}
            </span>
          </div>
        </div>

        <DeleteButton
          text="Delete User"
          onClick={() => setDeleteModal(true)}
          fullWidth
        />
      </div>

      <DeleteModal
        active={deleteModal}
        handleDelete={handleDelete}
        isDeleting={deleteUsersLoading}
        onClose={() => setDeleteModal(false)}
        title={
          activeUser?.name && `You are about to delete "${activeUser?.name}"`
        }
        text={`This user will be permanently removed from all users, Are you sure?`}
      />
      <UserModal
        active={modalType}
        toggleModal={() => setModalType("")}
        currentPage={1}
      />
    </div>
  );
};

export default observer(UserProfile);
