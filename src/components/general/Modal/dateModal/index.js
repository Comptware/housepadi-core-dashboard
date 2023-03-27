import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import React from "react";
import PropTypes from "prop-types";
import { DateRange } from "react-date-range";

import ContextModal from "components/general/Modal/contextModal";
import { Button } from "components/general/button";

const DateModal = ({ toggleModal, active, ...props }) => {
  return (
    <ContextModal
      active={active}
      title="Date Filter"
      toggleModal={toggleModal}
      size="lg"
    >
      {active && (
        <div className="flex flex-col justify-around gap-y-4 sm:gap-x-4 md:gap-x-6 lg:gap-x-10 w-full py-3 pr-3">
          <div>
            <div className="flex justify-between text-[#8B8E93] text-xs px-6 uppercase">
              <p>Start date</p> <p>End date</p>
            </div>
            <DateRange
              moveRangeOnFirstSelection={false}
              startDatePlaceholder="Start date"
              endDatePlaceholder="End date"
              color="#000000"
              className="text-green w-full"
              {...props}
            />
          </div>

          <Button text={`Done`} onClick={toggleModal} />
        </div>
      )}
    </ContextModal>
  );
};

DateModal.propTypes = {
  toggleModal: PropTypes.func,
  active: PropTypes.bool,
  props: PropTypes.object,
};

export default DateModal;
