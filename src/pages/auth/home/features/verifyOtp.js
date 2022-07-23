/* eslint-disable no-unneeded-ternary */
import React, { useEffect } from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import AuthStore from "store/auth";
import { ReactComponent as Loader } from "assets/icons/loader/loader.svg";
import Button from "components/general/button/button";
import { FormErrorMessage } from "components/general/errorMessage";
import useLoginSetup from "hooks/loginSetup";
import Banner from "./banner";
import OtpField from "components/general/input/otpInput";

YupPassword(Yup);

const defaultValues = {
  otp: "",
};

const schema = Yup.object({
  otp: Yup.string().required("Required"),
});

const VerifyOtp = observer(() => {
  const phone = localStorage.getItem("otp_phone_number");
  const { loading, verifyOtp, loadingVerify, sendOtp } = AuthStore;
  const { logUserIn } = useLoginSetup();
  const phone_number = "0" + phone.substring(4);
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

  useEffect(() => {
    register("otp");
  }, []);

  const sharedOnChange = async (name, value) => {
    setValue(name, value);
    await trigger(name);
  };

  const onSubmit = (data) => {
    const { otp } = data;
    verifyOtp(
      {
        phone_number,
        otp,
        action: "REGISTRATION",
      },
      logUserIn
    );
  };
  const resendOtp = async (data) => {
    await sendOtp({
      phone_number,
      action: "REGISTRATION",
    });
  };
  // FOr the sake of form reset
  const otp = watch("otp");

  return (
    <div className="flex mx-auto md:m-auto ">
      <div className="w-[40%]  hidden md:flex">
        <Banner />
      </div>
      <section className="w-[90%] h-fit md:w-[380px] mx-auto md:m-auto flex flex-col">
        <h2 className="text-black text-[24px] mb-6 medium-font">
          {" "}
          Verify Phone Number
        </h2>
        <h2 className="text-lg text-grey-textalt mb-8">
          {" "}
          A message with a verification code has been sent to your phone number!
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full "
        >
          <div className="w-full mb-10">
            <OtpField
              label="Enter 4 digit otp"
              value={otp}
              onChangeFunc={(e) => sharedOnChange("otp", e)}
              name="otp"
              required
            />
            {errors.otp && <FormErrorMessage type={errors.otp} />}
          </div>
          <div className="flex justify-between items-start space-x-3 mb-3 regular-font">
            <label className="text-black text-[14px]">
              Wrong phone number?
            </label>
            <Link className="text-blue-9 underline" to="/otp/send">
              Change
            </Link>{" "}
          </div>
          <div className="flex justify-between items-start space-x-3 mb-14 regular-font">
            <label className="text-black text-[14px]">
              Didn’t recieve a code?
            </label>
            <button
              className="text-blue-9 underline"
              onClick={resendOtp}
              type="button"
              disabled={loadingVerify || loading}
            >
              {loading ? <Loader /> : "Request Again"}
            </button>{" "}
          </div>
          <div className="w-full ">
            <Button
              type="submit"
              text="Verify"
              isLoading={loadingVerify}
              isDisabled={otp?.length < 4 || loading}
              fullWidth
            />
          </div>
        </form>
      </section>
    </div>
  );
});

export default VerifyOtp;
