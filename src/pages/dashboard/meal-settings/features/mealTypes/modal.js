import React from "react";
import PropTypes from "prop-types";

import ContextModal from "components/general/Modal/contextModal";
import Form from "./form";

const MealModal = ({ toggleModal, type, active, currentPage }) => {
  const modaltype = type && "meal type";
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

MealModal.propTypes = {
  type: PropTypes.string,
  toggleModal: PropTypes.func,
  active: PropTypes.bool,
  currentPage: PropTypes.string,
};

export default MealModal;
