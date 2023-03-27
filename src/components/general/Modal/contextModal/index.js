import React from "react";
import PropTypes from "prop-types";

import Modal from "components/general/Modal/modal/modal";
import ModalBody from "components/general/Modal/modalBody/modalBody";
import ModalHeader from "components/general/Modal/modalHeader/modalHeader";

const ContextModal = ({
  toggleModal,
  children,
  active,
  title,
  size = "sm",
}) => (
  <Modal
    toggler={toggleModal}
    size={size}
    noPadding
    bodyClass="bg-white py-6 px-6"
    active={active}
  >
    {title && (
      <ModalHeader>
        <p className="text-green text-2xl font-bold capitalize">{title}</p>
      </ModalHeader>
    )}
    <ModalBody>{children}</ModalBody>
  </Modal>
);

ContextModal.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  toggleModal: PropTypes.func,
  active: PropTypes.bool,
  size: PropTypes.string,
};

export default ContextModal;
