import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useAuth } from "hooks/auth";
import { ReactComponent as Logout } from "assets/icons/logout.svg";
import CommonStore from "stores/common";

import Header from "../header";
import { dashboardLinks } from "components/arrays/dashboard";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const { sidenavOpen, setSidenavOpen } = CommonStore;

  const listingLinks = [
    {
      title: "Logout",
      link: "/auth/login",
      click: () => {
        logout();
      },
      icon: <Logout className="w-3.5 mr-1" />,
    },
  ];

  return (
    <div className="overflow-x-hidden relative">
      <div className="min-h-screen overflow-x-hidden">
        <Header />
        <aside
          className={`lg:w-[277px] pt-[130px] pb-28 min-h-[100vh] flex flex-col fixed z-[5] mlg:z-[5] bg-[#f4f4f4] 
         border-r-1/2 border-[#c8c8c8]
         transition-transform duration-150 ease-in-out
          ${
            sidenavOpen ? "translate-x-[0]" : "-translate-x-60"
          } lg:translate-x-0
         `}
        >
          <div className="flex pl-8 pr-4 flex-1 border-t border-[#e0e0e0] pt-[24px] flex-col justify-start items-start pb-10 w-full space-y-2 cursor-pointer transition-all duration-150 ease-in-out">
            {dashboardLinks.map(({ title, icon, link, slug }) => (
              <Link
                to={link}
                addAarModal
                key={title}
                onClick={() => setSidenavOpen(false)}
                className="w-full"
              >
                <div
                  className={`flex justify-start items-center hover:!text-green-hover text-grey text-sm space-x-2 px-5 py-3 rounded-lg w-full ${
                    location.pathname.includes(slug || link) &&
                    "!text-green bg-grey-dark"
                  }`}
                >
                  {icon}
                  <span className="text-current">{title}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex pl-8 pr-4 border-t border-[#e0e0e0] pt-[24px] flex-col justify-start items-start w-full  cursor-pointer transition-all duration-150 ease-in-out">
            {listingLinks.map(({ title, icon, link, click }) => (
              <Link
                to={link}
                key={title}
                onClick={() => {
                  setSidenavOpen(false);
                  click();
                }}
                className="w-full"
              >
                <div className="flex justify-start items-center bg-[#FBCFD4] text-[#EA0F27] text-sm space-x-2 px-5 py-3 rounded-lg w-full">
                  {icon}
                  <span className="text-current">{title}</span>
                </div>
              </Link>
            ))}
          </div>
        </aside>
        <main className="bg-grey-whitesmoke min-h-[100vh] w-full lg:pl-[277px] pt-[120px] mlg:pb-14">
          {children}
        </main>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.any,
};

export default observer(DashboardLayout);
