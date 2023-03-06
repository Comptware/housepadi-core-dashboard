import React from "react";
import ReactSelect from "react-select";
import AsyncSelect from "react-select/async";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import PropTypes from "prop-types";

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
  ...rest
}) => {
  const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const classNames =
    "w-[calc(100%-2px)] h-fit mx-[1px] text-base border-slate-300 placeholder-slate-400 !placeholder:text-grey cursor-pointer";
  const styles = {
    control: (base, state) => ({
      ...base,
      height: "44px",
      borderRadius: 8,
      border: "1px solid #909090 !important",
      cursor: "pointer",
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
      fontSize: "16px",
      backgroundColor: (state.isFocused || state.isSelected) && "#F5F6FA",
      cursor: "pointer",
      color: "#000",
    }),
  };
  return (
    <div className="w-full searchable-select-component">
      {label && (
        <div className="flex justify-between">
          <label className="general-input-label text-grey-label text-sm">
            {label}
          </label>
          {labelControl || null}
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
