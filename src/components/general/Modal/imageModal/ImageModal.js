import "./styles.css";
import React from "react";
import PropTypes from "prop-types";
import { Slide } from "react-slideshow-image";
import Modal from "../modal/modal";
import ModalBody from "../modalBody/modalBody";

const ImageModal = ({
  active,
  toggler,
  photos,
  className,
  togglerClass,
  size = "md",
}) => {
  return (
    <Modal
      size={size}
      active={active}
      toggler={toggler}
      noPadding
      bodyClass=""
      togglerClass={togglerClass}
    >
      <ModalBody>
        <div className={`w-full h-full ${className}`}>
          <Slide cssClass="w-full h-full" arrows={photos?.length > 1}>
            {photos?.map((slideImage, index) => (
              <div className="each-slide w-full h-full" key={index}>
                {/* <div className='w-full h-full' style={{'backgroundImage': `url(${slideImage.url})`}}>
                
                <span>{slideImage.name}</span>
              </div> */}
                {/* <div
                className="w-full h-full"
                  style={{
                    backgroundImage: `url(${slideImage.url})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top",
                    zIndex: 9999,
                  }}
                /> */}
                <span className="text-white medium-font">
                  {slideImage.name}
                </span>
                <img className="w-full h-full z-99" src={slideImage.url} />
              </div>
            ))}
          </Slide>
        </div>
      </ModalBody>
    </Modal>
  );
};
ImageModal.propTypes = {
  active: PropTypes.bool,
  toggler: PropTypes.func,
  photos: PropTypes.array,
  className: PropTypes.string,
  togglerClass: PropTypes.string,
  size: PropTypes.string,
};
export default ImageModal;
