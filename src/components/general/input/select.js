import React from "react";
import ReactSelect, { components } from "react-select";
import AsyncSelect from "react-select/async";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import PropTypes from "prop-types";

import { BsCaretDownFill } from "react-icons/bs";

const Select = ({
  label,
  options,
  name,
  onChange,
  async,
  labelControl,
  address,
  addressValue,
  addressPlaceholder,
  fullWidth,
  style,
  ...rest
}) => {
  const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const classNames = `${
    fullWidth ? "w-full" : "w-fit"
  } h-fit mx-[1px] text-xs border-slate-300 placeholder-slate-400 !placeholder:text-grey cursor-pointer`;
  const styles = {
    control: (base, state) => ({
      ...base,
      height: address ? "38px" : "30px",
      minHeight: address ? "38px" : "30px",
      borderRadius: 30,
      border: state.isFocused
        ? `1px solid ${style?.color || "#7DD13A"} !important`
        : `1px solid ${style?.color || "#909090"} !important`,
      outline: state.isFocused ? "none !important" : "none !important",
      boxShadow: "none",
      cursor: "pointer",
      fontSize: "12px",
      backgroundColor: `${style?.background || ""}`,
    }),

    singleValue: (base) => ({
      ...base,
      color: `${style?.color || "#000000"} !important`,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    placeholder: (base) => ({
      ...base,
      color: addressValue ? "#000000" : "#ADB2B8",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "99%",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "white",
      zIndex: 20,
      cursor: "pointer",
      border: "1px solid #E1E1E1",
      top: "40px",
      borderRadius: 8,
    }),
    option: (base, state) => ({
      ...base,
      fontSize: "12px",
      backgroundColor: (state.isFocused || state.isSelected) && "#F5F6FA",
      cursor: "pointer",
      color: "#000",
    }),
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <BsCaretDownFill size={11} color={style?.color || "#000"} />
      </components.DropdownIndicator>
    );
  };
  return (
    <div className={`${fullWidth ? "w-full" : "w-fit"}`}>
      {label && (
        <div className="flex justify-between mb-1">
          <label className="general-input-label text-grey-label text-sm">
            {label}
          </label>
          {labelControl && labelControl}
        </div>
      )}
      {async ? (
        <AsyncSelect
          cacheOptions
          options={options}
          onChange={(selected) => onChange(selected, { name, value: selected })}
          styles={styles}
          className={classNames}
          {...rest}
        ></AsyncSelect>
      ) : address ? (
        <GooglePlacesAutocomplete
          apiKey={GOOGLE_MAP_API_KEY}
          selectProps={{
            address: addressValue,
            onChange,

            styles,
            options,
            placeholder: addressPlaceholder,
            componentRestrictions: {
              country: "ng",
            },
          }}
        />
      ) : (
        <ReactSelect
          options={options}
          onChange={(selected) => onChange(selected, { name, value: selected })}
          styles={styles}
          className={classNames}
          components={{ DropdownIndicator }}
          {...rest}
        ></ReactSelect>
      )}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  async: PropTypes.bool,
  labelControl: PropTypes.any,
  address: PropTypes.bool,
  addressValue: PropTypes.any,
  addressPlaceholder: PropTypes.string,
};

export default Select;
