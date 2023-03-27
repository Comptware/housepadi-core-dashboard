import React from "react";
import PropTypes from "prop-types";

import ContextModal from "components/general/Modal/contextModal";
import Form from "./form";

const LaundryModal = ({ toggleModal, type, active, currentPage }) => {
  const modaltype = type && "laundry type";
  return (
    <ContextModal
      active={active}
      title={`${type} ${modaltype}`}
      toggleModal={toggleModal}
      currentPage={currentPage}
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
