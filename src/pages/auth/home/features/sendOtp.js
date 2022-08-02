/* eslint-disable no-unneeded-ternary */
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";

import AuthStore from "store/auth";
import Button from "components/general/button/button";
import { FormErrorMessage } from "components/general/errorMessage";
import PhoneNumber from "components/general/phoneNumber/phoneNumber";
import CheckBox from "components/general/input/checkBox";
import Banner from "./banner";

YupPassword(Yup);

const schema = Yup.object({
  phone_number: Yup.string().nullable(),
});

const SendOtp = observer(() => {
  const navigate = useNavigate();
  const { loading, sendOtp } = AuthStore;
  const phone = localStorage.getItem("otp_phone_number");
  const defaultValues = {
    phone_number: "",
  };

  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    sharedOnChange("", { name: "phone_number", value: phone }, "From effect");
    register("phone_number");
  }, []);
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    trigger,
    watch,
  } = useForm({
    defaultValues,
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const sharedOnChange = async (e, { name, value }, msg) => {
    setValue(name, value);
    await trigger(name);
  };

  const onSubmit = async (data) => {
    const { phone_number } = data;
    const phone_no = "0" + phone_number.substring(4);
    await sendOtp(
      {
        phone_number: phone_no,
        action: "REGISTRATION",
      },
      phone_number,
      navigate
    );
  };

  // FOr the sake of form reset
  const phone_number = watch("phone_number");

  return (
    <div className="flex mx-auto md:m-auto">
      <div className="w-[40%] hidden md:flex">
        <Banner />
      </div>
      <section className="w-[90%] h-fit md:w-[380px] mx-auto md:m-auto flex flex-col">
        <h2 className="text-black text-[24px] mb-4 medium-font">Welcome to Zusco Host</h2>
        <h2 className="text-lg text-grey-textalt mb-3">
          {" "}
          Enter your phone number to receive veification code.
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full "
        >
          <div className="w-full mb-6">
            <PhoneNumber
              label="Phone Number"
              value={phone_number}
              onPhoneChange={sharedOnChange}
              name="phone_number"
              placeholder="Enter phone number"
              labelClass="!text-black regular-font"
              required
            />
            {errors.phone_number && (
              <FormErrorMessage type={errors.phone_number} />
            )}
          </div>
          <button
            className="flex space-x-3 relative cursor-pointer mb-14"
            type="button"
            onClick={() => setAgreed((prev) => !prev)}
          >
            <CheckBox checked={agreed} />
            <label
              className="text-black regular-font text-[12px] items-center absolute left-6 top-[50%] translate-y-[-50%]"
              htmlFor="agreed"
            >
              {" "}
              I agree to{" "}
              <Link className="text-blue-9 underline" to="/">
                Zusco’s Privacy Policy,
              </Link>{" "}
              and{" "}
              <Link className=" text-blue-9 underline" to="/">
                Terms and conditions
              </Link>{" "}
              .
            </label>
          </button>
          <div className="w-full ">
            <Button
              type="submit"
              text="Send Otp"
              isLoading={loading}
              isDisabled={!phone_number || phone_number?.length < 14 || !agreed}
              fullWidth
            />
          </div>
        </form>
      </section>
    </div>
  );
});

export default SendOtp;
