import React from "react";
import PropTypes from "prop-types";

import ContextModal from "components/general/Modal/contextModal";
import SettingsStore from "../../store";
import Form from "./form";

const LaundryModal = ({ toggleModal, type, active, currentPage }) => {
  const { setActiveLaundry } = SettingsStore;
  const modaltype = type && "laundry";
  const closeModal = () => {
    setActiveLaundry(null);
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

LaundryModal.propTypes = {
  type: PropTypes.string,
  toggleModal: PropTypes.func,
  active: PropTypes.bool,
  currentPage: PropTypes.string,
};

export default LaundryModal;
