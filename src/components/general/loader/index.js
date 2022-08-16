import React from "react";
import PropTypes from "prop-types";

import { ZuscoIcon } from "assets/icons";
import CircleLoader from "components/general/circleLoader/circleLoader";
import Modal from "../modal/modal/modal";
const Loader = ({ absolute }) => {
  return (
    <Modal noPadding bodyClass="" size="md" active={true} absolute={absolute}>
      <div className="w-full flex justify-center items-center h-[100px]">
        <CircleLoader blue icon={<ZuscoIcon />} />
      </div>
    </Modal>
  );
};
Loader.propTypes = {
  absolute: PropTypes.bool,
};

export default Loader;
