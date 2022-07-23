import React from "react";
import { Outlet } from "react-router";
import AuthLayout from "components/layout/auth";

const AuthHome = () => {
  return (
    <div>
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </div>
  );
};

export default AuthHome;
