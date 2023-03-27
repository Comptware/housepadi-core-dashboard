import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as Logo } from "assets/icons/logo.svg";
import CircleLoader from "components/general/circleLoader/circleLoader";
import Modal from "../Modal/modal/modal";
const Loader = ({ absolute }) => {
  return (
    <Modal noPadding bodyClass="" size="md" active={true} absolute={absolute}>
      <div className="w-full flex justify-center items-center h-[100px]">
        <CircleLoader blue icon={<Logo className="scale-50" />} />
      </div>
    </Modal>
  );
};
Loader.propTypes = {
  absolute: PropTypes.bool,
};

export default Loader;
