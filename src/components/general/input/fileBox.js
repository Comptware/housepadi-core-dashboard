import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FileUploader } from "react-drag-drop-files";

import ImageModal from "../Modal/imageModal/ImageModal";

const FileBox = ({
  placeholder,
  title,
  required,
  file,
  type,
  onChangeFunc,
  isDisabled,
  isError,
  isXl,
  url,
  removeAllClick,
  multiple,
  isAvatar,
  ...rest
}) => {

  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileTypes = ["JPG", "PNG", "JPEG"];
  useEffect(() => {
    if (!isError) return setError(false);
    setError(true);
  }, [isError]);

  useEffect(() => {
    const fileSize = (file?.size || 0) / 1024 ** 2;
    if (fileSize > 50) return setError(true);
    console.log("effect file", file);
    setError(false);
  }, [file]);

  const extractFileNameFromUrl = (image) => {
    let filename = "";
    if (image?.name) {
      filename = image?.name;
    } else if (typeof image === "string") {
      const startIndex = image?.lastIndexOf("/") + 1;
      const endIndex = image?.length;
      filename = image?.slice(startIndex, endIndex);
    } else {
      filename = "Image";
    }
    return filename;
  };

  return (
    <div className="flex flex-col justify-start items-start space-y-2 w-full min-w-full relative file-box">
      {title && (
        <span className="flex justify-start items-center text-grey-text text-xs font-light pl-2">
          <span className="mr-2">•</span>
          {title}
        </span>
      )}

      {
        <p
          className={`w-full h-fit text-center overflow-ellipsis overflow-hidden whitespace-nowrap z-[99] absolute
            bottom-[5%] mx-auto

            ${
              file && file[0]
                ? "medium-font text-white cursor-pointer"
                : "text-grey-text text-[8px]"
            }

            ${isXl ? "text-base" : "text-[10px]"}
            `}
          onClick={() => {
            if (file) {
              setShowModal(true);
            }
          }}
        >
          {file && file[0] ? "Preview " : placeholder}
        </p>
      }

      {file && file[0] && !isAvatar && (
        <div
          className="absolute -top-3 right-2 z-[99] cursor-pointer flex justify-center items-center text-black bg-grey bg-opacity-30 hover:bg-opacity-100 hover:!text-white hover:!regular-font hover:bg-red rounded-lg transition-all duration-150 ease-in-out "
          onClick={removeAllClick}
        >
          <div className="relative flex justify-center items-center px-2 py-1 text-xs">
            Clear all
          </div>
        </div>
      )}

      <FileUploader
        handleChange={(e) => {
          if (multiple) {
            onChangeFunc(Object.values(e));
          } else {
            onChangeFunc(e);
          }
        }}
        name="file"
        types={fileTypes}
        multiple={multiple}
        className="w-full"
        {...rest}
      >
        <button
          className={`flex flex-col justify-center items-center 
       ${isAvatar ? "rounded-full" : "rounded-2xl"}  
       text-sm font-thin p-4 
        ${
          isXl
            ? "h-[220px] w-full"
            : isAvatar
            ? "h-[150px] w-[150px]"
            : "h-[150px] w-full"
        }
       border border-dashed space-y-3 relative 
       bg-no-repeat bg-center bg-cover 
       ${error || isError ? "!border-red" : "border-grey"} 
      `}
          type="button"
         
          disabled={isDisabled}
        >
          {file && file[0] && (
            <div
              className={`
            absolute top-0 right-0 left-0 bottom-0 z-[9] bg-blue-backdrop fade-in rounded-2xl
            ${isAvatar ? " bg-no-repeat bg-center bg-cover" : ""}
            `}
              style={{
                backgroundImage: url ? `url(${url})` : "",
              }}
            />
          )}
          {file && file[0] && (
            <span className="flex justify-start items-center text-white text-xs medium-font pl-2 z-[99]">
              {file?.length} {file?.length === 1 ? "photo" : "photos"}
            </span>
          )}

          <p
            className={`w-full z-[99] text-sm 
          ${file && file[0] ? "medium-font text-white" : "text-blue"}
          ${isXl ? "text-sm" : "text-xs"}
        
        `}
          >
            Upload or drog a photo right here.
          </p>
        </button>
      </FileUploader>

      {showModal && (
        <ImageModal
          active={showModal}
          toggler={() => setShowModal(false)}
          photos={file?.map((item) => {
            return {
              name: extractFileNameFromUrl(item),
              url: typeof item === "string" ? item : URL.createObjectURL(item),
            };
          })}
        />
      )}
    </div>
  );
};

FileBox.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  required: PropTypes.bool,
  file: PropTypes.any,
  type: PropTypes.string,
  onChangeFunc: PropTypes.func,
  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  url: PropTypes.any,
  isXl: PropTypes.bool,
  rest: PropTypes.object,
  removeAllClick: PropTypes.func,
  multiple: PropTypes.bool,
  isAvatar: PropTypes.bool,
};

export default FileBox;
