import React from "react";
import { Outlet } from "react-router";
import DashboardLayout from "components/layout/dashboard";

const Messages = () => {
  return (
    <div>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </div>
  );
};

export default Messages;
