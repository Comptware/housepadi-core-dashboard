import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import CircleLoader from "components/general/circleLoader/circleLoader";
import { Button } from "components/general/button";

import NotificationsStore from "../../store";
import NotificationModal from "./modal";
import { AiTwotoneNotification } from "react-icons/ai";

const Notifications = observer(() => {
  const { getNotificationsLoading } = NotificationsStore;

  const [modalType, setModalType] = useState("");

  const type = "notification";

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-3 sm:p-6 max-h-fit gap-y-3 relative ">
      {getNotificationsLoading && (
        <div className="absolute w-full flex justify-center items-center h-[100px]">
          <CircleLoader blue />
        </div>
      )}

      <div className="flex justify-between items-start w-full h-fit gap-x-3 mb-6">
        <Button
          icon={<AiTwotoneNotification />}
          text={`Send ${type}`}
          xsmall
          onClick={() => setModalType("Create")}
        />
      </div>

      <div className="w-full min-h-[400px]" />

      <NotificationModal
        active={modalType}
        toggleModal={() => setModalType("")}
        type={modalType}
        currentPage={1}
      />
    </div>
  );
});

export default Notifications;
