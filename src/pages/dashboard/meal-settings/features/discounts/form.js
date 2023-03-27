import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import Tippy from "@tippyjs/react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { debounce } from "lodash";

import Input from "components/general/input/input";
import { Button } from "components/general/button";
import sanitizePayload from "utils/sanitizePayload";
import DatePicker from "components/general/datePicker";
import Select from "components/general/input/select";
import SettingsStore from "../../store";
import { errorToast } from "components/general/toast/toast";
import { DISCOUNT_TYPES, DISCOUNT_TYPE_OPTIONS } from "../../utils";
import moment from "moment";

const Form = ({ toggleModal, type, modaltype, currentPage }) => {
  const {
    createDiscount,
    updateDiscount,
    createDiscountsLoading,
    updateDiscountsLoading,
    activeDiscount,
    checkDiscount,
    checkDiscountsLoading,
    discountCodeisValid,
  } = SettingsStore;
  const { FIXED, PERCENTAGE } = DISCOUNT_TYPES;
  const [form, setForm] = useState({
    discountCode: activeDiscount?.discountCode || "",
    discountValue: activeDiscount?.discountValue || "",
    discountExpiryTime: activeDiscount?.discountExpiryTime
      ? moment(activeDiscount?.discountExpiryTime).toDate()
      : "",
    discountType: activeDiscount?.discountType || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (prop, val) => {
    setForm({ ...form, [prop]: val });
  };

  const debouncedFetchData = debounce((query) => {
    checkDiscount({ data: { discountCode: query } });
  }, 1000);
  const discountCodeIsUnchanged =
    form?.discountCode === activeDiscount?.discountCode;
  useEffect(() => {
    !discountCodeIsUnchanged &&
      form?.discountCode &&
      debouncedFetchData(form.discountCode);
  }, [form.discountCode]);

  const callbackFunc = () => toggleModal();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { discountValue, discountType } = form;
      let data = {
        ...form,
        id: activeDiscount?.id,
        discountValue:
          discountType === FIXED
            ? Number(discountValue)
            : parseFloat(discountValue),
      };
      data = sanitizePayload(data);
      const payload = {
        data,
        pageNumber: currentPage,
        callbackFunc,
      };
      if (type === "Create") {
        await createDiscount(payload);
      } else if (type === "Update") {
        await updateDiscount(payload);
      }
    } catch (error) {
      errorToast("Error encountered!", error?.toString());
    } finally {
      setLoading(false);
    }
  };
  const formLoading = useMemo(
    () => createDiscountsLoading || updateDiscountsLoading || loading,
    [createDiscountsLoading, updateDiscountsLoading, loading]
  );

  const formDisabled = useMemo(
    () =>
      !Object.values(form).every((x) => x) ||
      (!discountCodeIsUnchanged && !discountCodeisValid),
    [form, discountCodeisValid]
  );

  const discountType = useMemo(
    () =>
      DISCOUNT_TYPE_OPTIONS?.find(({ value }) => value === form?.discountType),
    [form.discountType]
  );

  return (
    <>
      <form
        className="flex flex-col justify-around gap-y-4 sm:gap-x-4 md:gap-x-6 lg:gap-x-10 w-full py-3 pr-3"
        onSubmit={handleSubmit}
      >
        <Input
          label={`${modaltype}`}
          value={form?.discountCode}
          onChangeFunc={(val) => handleChange("discountCode", val)}
          placeholder={`Enter ${modaltype}`}
          isLoading={checkDiscountsLoading}
          required
        />

        <Select
          label="Discount Type"
          value={discountType}
          onChange={(val) => handleChange("discountType", val.value)}
          placeholder="Select discount type"
          options={DISCOUNT_TYPE_OPTIONS}
          fullWidth
          labelControl={
            <Tippy content="if Discount Type is Fixed, Discount Value should be a whole number E.G 4000, else if Discount Type is Percentage, Discount Value should be a decimal less than 1 E.G 0.25(25%), 0.80(80%)">
              <div>
                <AiFillExclamationCircle className="text-grey mt-0.5" />
              </div>
            </Tippy>
          }
        />
        <Input
          label={`${modaltype} Value`}
          type="number"
          value={form?.discountValue}
          onChangeFunc={(val) => handleChange("discountValue", val)}
          placeholder={
            discountType === FIXED
              ? "400"
              : discountType === PERCENTAGE
              ? "0.2"
              : `Enter ${modaltype} Value`
          }
          prefix={discountType === FIXED ? "NGN" : ""}
          required
          labelAlt={
            <Tippy content="if Discount Type is Fixed, Discount Value should be a whole number E.G 4000, else if Discount Type is Percentage, Discount Value should be a decimal less than 1 E.G 0.25(25%), 0.80(80%)">
              <div>
                <AiFillExclamationCircle className="text-grey mt-0.5" />
              </div>
            </Tippy>
          }
        />
        <DatePicker
          placeholder="yyyy-mm-dd:hh:mm"
          value={form?.discountExpiryTime}
          onChange={(val) => handleChange("discountExpiryTime", val)}
          showTimeSelect
          timeCaption="Time"
          dateCaption="Date"
          dateFormat="yyyy-MM-dd hh:mm aa"
        />

        <Button
          text={`${type} ${modaltype}`}
          isDisabled={formDisabled}
          isLoading={formLoading}
          onClick={handleSubmit}
        />
        <Button
          isOutline
          text="Cancel"
          textColor="text-red-alt"
          borderColor="border-transparent"
          className=""
          onClick={toggleModal}
          type="button"
        />
      </form>
    </>
  );
};

Form.propTypes = {
  type: PropTypes.string,
  modaltype: PropTypes.string,
  toggleModal: PropTypes.func,
  pageNumber: PropTypes.string,
  currentPage: PropTypes.string,
};

export default observer(Form);
