import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import HomeStore from "pages/dashboard/home/store";
import { ReactComponent as Logo } from "assets/icons/logo/logo-green.svg";
import { ReactComponent as Notification } from "assets/icons/notification.svg";
import CommonStore from "stores/common";
import Toast from "../../general/toast/toast";
import NotificationPane from "../notification";
import Hamburger from "../hamburger";

const Header = () => {
  const { notificationItems } = HomeStore;
  const { sidenavOpen, setSidenavOpen } = CommonStore;
  const [notificationPaneOpen, setNotificationPaneOpen] = useState(false);
  return (
    <header className="flex flex-row justify-between items-center w-full py-4 fixed left-0 right-0 top-0 border-b-1/2 border-grey-border z-[99] h-[70px] bg-white">
      <div className="relative flex flex-row justify-between items-center mx-auto w-full px-3 sm:px-10 ">
        <Link className="h-8 w-[110px] !my-0" to="/">
          <Logo className="w-full h-full z-90" />
        </Link>
        <Toast />

        <div className="flex flex-row justify-start items-center space-x-[20px]">
          <button
            onClick={() => setNotificationPaneOpen(true)}
            className="relative"
          >
            {notificationItems?.length > 0 && (
              <div className="absolute right-[15px] top-[17px] bg-red-alt rounded-full w-[5px] h-[5px]" />
            )}
            <Notification className="hover:fill-grey-lighter transition-all duration-300 ease-in-out cursor-pointer" />
          </button>

          <Hamburger
            click={() => {
              setSidenavOpen(!sidenavOpen);
            }}
            className={sidenavOpen ? "ham_crossed" : ""}
          />
        </div>
      </div>

      <div className="relative">
        {notificationPaneOpen && (
          <NotificationPane onClose={() => setNotificationPaneOpen(false)} />
        )}
      </div>
    </header>
  );
};

export default observer(Header);
