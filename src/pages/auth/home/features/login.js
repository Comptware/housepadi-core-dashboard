/* eslint-disable no-unneeded-ternary */
import React, { useEffect } from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";

import AuthStore from "stores/auth";
import Button from "components/general/button/button";
import { FormErrorMessage } from "components/general/errorMessage";
import Input from "components/general/input/input";
import useLoginSetup from "hooks/loginSetup";
import { isEmail } from "utils/validations";

YupPassword(Yup);

const defaultValues = {
  email: "",
  password: "",
};

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const { login, loading } = AuthStore;
  const { logUserIn } = useLoginSetup();
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
    register("email");
    register("password");
  }, []);

  const sharedOnChange = async (name, value) => {
    setValue(name, value);
    await trigger(name);
  };

  const onSubmit = (data) => {
    const { email, password } = data;
    login(
      {
        password,
        email,
      },
      logUserIn
    );
  };

  // FOr the sake of form reset
  const email = watch("email");
  const password = watch("password");

  return (
    <div
      className={`flex mx-auto md:m-auto transition-transform duration-500 ease-in-out  h-[60vh]`}
    >
      <section className="w-[90%] h-fit md:w-[380px] mx-auto md:m-auto flex flex-col">
        <h2 className="text-black text-[24px] mb-4 medium-font">
          Welcome to Housepadi Admin
        </h2>
        <h2 className="text-lg text-grey-textalt mb-3">
          Enter login email and password to login to the dashboard
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full "
        >
          <div className="w-full mb-4">
            <Input
              label="Email Address"
              value={email}
              onChangeFunc={(e) => sharedOnChange("email", e)}
              placeholder="taiwoharry@gmail.com"
              type="email"
              required
            />

            {errors.email && <FormErrorMessage type={errors.email} />}
          </div>
          <div className="w-full mb-10">
            <Input
              label="Password"
              value={password}
              onChangeFunc={(e) => sharedOnChange("password", e)}
              placeholder="Enter password"
              type="password"
              required
            />

            {errors.password && <FormErrorMessage type={errors.password} />}
          </div>
          =
          <div className="w-full ">
            <Button
              type="submit"
              text="Login"
              isLoading={loading}
              isDisabled={!password || !isEmail(email) || loading}
              fullWidth
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default observer(Login);
