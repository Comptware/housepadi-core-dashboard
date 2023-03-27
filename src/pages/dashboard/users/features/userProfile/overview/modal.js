import React from "react";
import PropTypes from "prop-types";

import ContextModal from "components/general/Modal/contextModal";
import Form from "./form";

const UserModal = ({ toggleModal, type = "Update", active, currentPage }) => {
  const modaltype = type && "user";

  return (
    <ContextModal
      active={active}
      title={`${type} ${modaltype}`}
      toggleModal={toggleModal}
      currentPage={currentPage}
      size="lg"
    >
      {active && type && (
        <Form modaltype={modaltype} toggleModal={toggleModal} type={type} />
      )}
    </ContextModal>
  );
};

UserModal.propTypes = {
  type: PropTypes.string,
  toggleModal: PropTypes.func,
  active: PropTypes.bool,
  currentPage: PropTypes.string,
};

export default UserModal;
