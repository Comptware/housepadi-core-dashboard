import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import clsx from "classnames";

import { ReactComponent as PasswordCloseIcon } from "assets/icons/password/password_close_icon.svg";
import { ReactComponent as PasswordIcon } from "assets/icons/password/password_icon.svg";
import Loading from "../circleLoader/circleLoader";
import styled from "styled-components";

const InputLoader = styled(Loading)`
  .content {
    margin-bottom: 0;
  }
`;

const useClickOutside = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const maybeHandler = (event) => {
      if (!domNode.current.contains(event.target || event.target.childNodes)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const Input = ({
  placeholder,
  name,
  required,
  value,
  label,
  type,
  onChangeFunc,
  isFocused,
  isLoading,
  isError,
  currency,
  isDisabled,
  prefix,
  icon,
  labelAlt,
  ...rest
}) => {
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef();

  const domNode = useClickOutside(() => {
    setActive(false);
  });

  useEffect(() => {
    if (!isFocused) return;
    inputRef.current.focus();
    setActive(true);
  }, [isFocused]);

  useEffect(() => {
    if (!isError) return setError(false);
    setError(true);
  }, [isError]);

  return (
    <div className="w-full ">
      {label && (
        <div className="flex justify-between items-start w-full space-x-2">
          <label className="general-input-label text-grey-label text-sm capitalize">
            {label}
          </label>
          {labelAlt && (
            <label className="general-input-label text-grey-label text-sm">
              {labelAlt}
            </label>
          )}
        </div>
      )}

      <div
        className={`relative flex flex-col justify-start items-center h-full w-full`}
        ref={domNode}
      >
        <div
          className={`relative h-11 w-full bg-white rounded-lg flex  space-x-1 items-center justify-between  font-normal outline-none capitalize tracking-wider focus:outline-none transition-all duration-150 ease-in-out whitespace-nowrap  text-base leading-relaxed border border-solid shadow-none text-left 
        ${
          error
            ? "!border-red"
            : active
            ? "border-blue"
            : "hover:bg-grey-whitesmoke border-grey-border"
        }
        ${isLoading && "pointer-events-none"}
        `}
          onClick={() => setActive(true)}
          ref={domNode}
        >
          {type === "number" ? (
            <div
              className={clsx("w-full h-full flex justify-start items-center", {
                "pl-3": currency,
              })}
            >
              {currency && <span>{currency}</span>}
              <NumberFormat
                ref={inputRef}
                value={value}
                name={name}
                required={required}
                placeholder={placeholder}
                thousandSeparator
                prefix={prefix}
                className={`p-3 ease-in-out h-full w-full z-10 focus:outline-none focus:border-none rounded-lg bg-transparent placeholder:text-grey text-black`}
                inputMode="numeric"
                onValueChange={(number) =>
                  onChangeFunc(number.value, { name, value: number.value })
                }
                {...rest}
              />
            </div>
          ) : (
            <input
              ref={inputRef}
              type={
                type === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : "text"
              }
              value={value}
              onChange={({ target }) => {
                onChangeFunc(target.value, { name, value: target.value });
              }}
              placeholder={placeholder}
              className={`p-3 ease-in-out h-full w-full z-10 focus:outline-none focus:border-none rounded-lg bg-transparent placeholder:text-grey ${
                !value
                  ? ""
                  : value?.length > 0 || value > 0
                  ? "text-black"
                  : "placeholder:text-grey"
              } ${type === "password" || icon ? "mr-3" : ""} `}
              {...rest}
            />
          )}

          {isDisabled && (
            <span
              className={`h-full w-full absolute top-0 right-0 flex justify-center items-center cursor-pointer z-10 `}
            ></span>
          )}

          {type === "password" && (
            <span
              className={`h-full w-12 absolute top-0 right-0 flex justify-center items-center cursor-pointer z-20`}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <PasswordCloseIcon className="stroke-current" />
              ) : (
                <PasswordIcon className="stroke-current" />
              )}
            </span>
          )}
          <div>
            <div className="h-full flex mx-1 justify-center items-center">
              {icon && (
                <span
                  className={`h-full w-12 absolute top-0 right-0 flex justify-center items-center cursor-pointer z-30`}
                >
                  {icon}
                </span>
              )}
              {isLoading && <InputLoader size="tiny" className="mb-0" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.any,
  onChangeFunc: PropTypes.func,
  isFocused: PropTypes.any,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  currency: PropTypes.any,
  isDisabled: PropTypes.bool,
  prefix: PropTypes.string,
  rest: PropTypes.object,
  icon: PropTypes.element,
  labelAlt: PropTypes.string,
};

export default Input;
