import React from "react";
import PropTypes from "prop-types";

import ContextModal from "components/general/Modal/contextModal";
import { Button } from "components/general/button";
import UserProfile from "pages/dashboard/users/features/userProfile/profile";

const UserModal = ({ toggleModal, active, details }) => {
  return (
    <ContextModal
      active={active}
      title="User Details"
      toggleModal={toggleModal}
      size="lg"
    >
      {active && (
        <div className="flex flex-col justify-around gap-y-4 sm:gap-x-4 md:gap-x-6 lg:gap-x-10 w-full py-3 pr-3">
          <UserProfile isInModal details={details} />

          <Button text={`Done`} onClick={toggleModal} />
        </div>
      )}
    </ContextModal>
  );
};

UserModal.propTypes = {
  toggleModal: PropTypes.func,
  active: PropTypes.bool,
  details: PropTypes.object,
};

export default UserModal;
