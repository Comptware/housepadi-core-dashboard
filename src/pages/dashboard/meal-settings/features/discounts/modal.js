import React from "react";
import PropTypes from "prop-types";

import ContextModal from "components/general/Modal/contextModal";
import SettingsStore from "../../store";
import Form from "./form";

const DiscountModal = ({ toggleModal, type, active, currentPage }) => {
  const { setActiveDiscount } = SettingsStore;
  const modaltype = type && "discount code";
  const closeModal = () => {
    setActiveDiscount(null);
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

DiscountModal.propTypes = {
  type: PropTypes.string,
  toggleModal: PropTypes.func,
  active: PropTypes.bool,
  currentPage: PropTypes.string,
};

export default DiscountModal;
