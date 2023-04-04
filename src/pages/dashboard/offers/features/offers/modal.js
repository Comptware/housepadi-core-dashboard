import React from "react";
import PropTypes from "prop-types";

import ContextModal from "components/general/Modal/contextModal";
import OffersStore from "../../store";
import Form from "./form";

const OfferModal = ({ toggleModal, type, active, currentPage }) => {
  const { setActiveOffer } = OffersStore;
  const modaltype = type && "offer";
  const closeModal = () => {
    setActiveOffer(null);
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

OfferModal.propTypes = {
  type: PropTypes.string,
  toggleModal: PropTypes.func,
  active: PropTypes.bool,
  currentPage: PropTypes.string,
};

export default OfferModal;
