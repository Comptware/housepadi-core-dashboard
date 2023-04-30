import React from "react";
import PropTypes from "prop-types";

import ContextModal from "components/general/Modal/contextModal";
import NotificationsStore from "../../store";
import Form from "./form";

const NotificationModal = ({ toggleModal, type, active, currentPage }) => {
  const { setActiveNotification } = NotificationsStore;
  const modaltype = type && "notification";
  const closeModal = () => {
    setActiveNotification(null);
    toggleModal();
  };
  return (
    <ContextModal
      active={active}
      title={`${type} ${modaltype}`}
      toggleModal={closeModal}
      currentPage={currentPage}
      size="lg"
    >
      {active && type && (
        <Form modaltype={modaltype} toggleModal={toggleModal} type={type} />
      )}
    </ContextModal>
  );
};

NotificationModal.propTypes = {
  type: PropTypes.string,
  toggleModal: PropTypes.func,
  active: PropTypes.bool,
  currentPage: PropTypes.string,
};

export default NotificationModal;
