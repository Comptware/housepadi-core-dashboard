import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { useAuth } from "hooks/auth";
import { DEFAULT_AVATAR } from "utils/constants";
import {
  Dashboard,
  Settings,
  Listings,
  Messages,
  BookAStay,
  Agent,
} from "assets/icons";
import { ReactComponent as Logout } from "assets/icons/logout.svg";
import { ReactComponent as Call } from "assets/icons/call.svg";
import { ReactComponent as Facebook } from "assets/icons/facebook.svg";
import { ReactComponent as Twitter } from "assets/icons/twitter.svg";
import { ReactComponent as Linkedin } from "assets/icons/linkedin.svg";

import ListingStore from "pages/dashboard/listings/store";
import CommonStore from "stores/common";
import SettingsStore from "pages/dashboard/settings/store";
import HomeStore from "pages/dashboard/home/store";
import notificationAlertSound from "assets/audios/quick-alert.wav";
import { getUserInfoFromStorage } from "utils/storage";
import db from "services/firebase.config";

import useInterval from "hooks/useInterval";
import Header from "../header";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const { setListingDataSet } = ListingStore;
  const { getMe, me, sidenavOpen, setSidenavOpen } = CommonStore;
  const { getSettings, settings } = SettingsStore;
  const { notificationItems, getNotificationData, handleSetNotificationItems } =
    HomeStore;
  const userInfo = getUserInfoFromStorage();

  useEffect(() => {
    setListingDataSet(false);
  }, []);

  const notificationAlertAudio = new Audio(notificationAlertSound);
  const playAudio = (audioFile) => {
    audioFile?.play();
  };

  useInterval(() => {
    getNotificationData(1, () => playAudio(notificationAlertAudio));
  }, 5000);

  const dashboardLinks = [
    {
      title: "Overview",
      link: "/dashboard/overview",
      icon: <Dashboard className="fill-current" />,
    },
    {
      title: "Listings",
      link: "/dashboard/listings",
      icon: <Listings className="fill-current" />,
    },
    {
      title: "Bookings",
      link: "/dashboard/bookings",
      icon: <BookAStay className="fill-current" />,
    },

    {
      title: "Agents",
      link: "/dashboard/agents",
      icon: <Agent className="fill-current" />,
    },

    {
      title: "Users",
      link: "/dashboard/users",
      icon: <Agent className="fill-current" />,
    },
    {
      title: "Messages",
      link: "/dashboard/messages",
      icon: <Messages className="fill-current" />,
    },
  ];

  const listingLinks = [
    {
      title: me?.first_name
        ? me.first_name + " " + me.last_name
        : "Edit Profile",
      link: "/dashboard/me",
      icon: (
        <img
          className={` w-[25px] h-[25px] border rounded-full `}
          src={me?.profile_image_url || DEFAULT_AVATAR}
          alt=""
        />
      ),
    },

    {
      title: "Settings",
      link: "/dashboard/settings",
      icon: <Settings className="fill-current" />,
    },
    {
      title: "Logout",
      link: "/auth/login",
      click: () => {
        logout();
      },
      icon: <Logout className="fill-current" />,
    },
  ];

  const getConversations = async () => {
    let convos = [];
    const convoRef = collection(db, "conversations");
    const q = query(convoRef, where("agentId", "==", userInfo?.id));
    let loaded = false;
    onSnapshot(q, (querySnapshot) => {
      convos = [];

      querySnapshot.forEach((item) => {
        convos.push(item.data());
      });

      convos = convos.sort(
        (a, b) =>
          new Date(b?.lastMessageAt?.toDate()) -
          new Date(a?.lastMessageAt?.toDate())
      );

      const unreadConvos = convos?.filter((item) => item?.unreadUserChats > 0);

      if (unreadConvos.length > 0 && loaded) {
        unreadConvos?.map((item) => {
          const itemIsInNotificationItems = notificationItems?.find(
            (ntf) =>
              ntf.unreadUserChats + ntf.lastMessageAt?.toDate() ===
              item.unreadUserChats + item.lastMessageAt?.toDate()
          )?.lastMessageAt;
          if (!itemIsInNotificationItems) {
            handleSetNotificationItems([
              {
                ...item,
                notification_type: "message",
                link: `/dashboard/messages`,
              },
            ]);
          }
        });

        settings?.chat_notification && playAudio(notificationAlertAudio);
      }
      loaded = true;
    });
  };

  useEffect(() => {
    getMe();
    getConversations();
    getSettings();
  }, []);

  return (
    <div className="w-screen min-h-screen h-screen flex flex-grow flex-col relative">
      <Header />

      <section className="w-full h-full flex flex-row flex-grow max-w-9xl mx-auto relative mt-[70px] overflow-hidden">
        <aside
          className={`dashboard-sidenav w-52 pt-[20px] pb-28 h-full flex flex-col flex-grow absolute left-0 top-0 bottom-0 z-[999] mlg:z-50 bg-white
         overflow-y-scroll border-r-1/2 border-grey-border
         transition-transform duration-150 ease-in-out 
          ${
            sidenavOpen ? "translate-x-[0]" : "-translate-x-60"
          } lg:translate-x-0
         `}
        >
          <div className="flex flex-col justify-between items-start w-full h-full px-10">
            <div className="flex flex-col justify-start items-start pb-10 w-full space-y-8 cursor-pointer transition-all duration-150 ease-in-out">
              <span className="text-grey uppercase text-sm pt-6">
                DASHBOARD
              </span>
              {dashboardLinks.map(({ title, icon, link }) => (
                <Link
                  to={link}
                  key={title}
                  onClick={() => setSidenavOpen(false)}
                >
                  <div
                    className={`flex justify-center items-center hover:text-blue text-grey text-sm space-x-2 ${
                      location.pathname.includes(link) && "!text-blue-alt"
                    }`}
                  >
                    {icon}
                    <span className="text-current">{title}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className=" flex flex-col justify-start items-start pb-10 w-full space-y-8 cursor-pointer transition-all duration-150 ease-in-out">
              <span className="text-grey uppercase text-sm  pt-6">ACtions</span>
              {listingLinks.map(({ title, icon, link, click }) => (
                <Link
                  to={link}
                  key={title}
                  onClick={() => {
                    setSidenavOpen(false);
                    click && click();
                  }}
                >
                  <div
                    className={`flex justify-center items-center hover:text-blue text-grey text-sm space-x-2 ${
                      location.pathname.includes(link) && "!text-blue-alt "
                    }`}
                  >
                    {icon}
                    <span className="text-current">{title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <main className="dashboard-content bg-grey-whitesmoke w-full lg:ml-52 mlg:pb-14 flex flex-col flex-grow overflow-y-auto">
          {children}
        </main>
      </section>
      <footer className="hidden mlg:flex flex-row justify-between items-center w-full py-2 fixed left-0 right-0 bottom-0 border-t-1/2 border-grey-border z-[99] h-[50px] bg-white">
        <div className="relative flex flex-row justify-between items-center mx-auto w-full px-20 ">
          <p className="text-base text-black text-left">
            © 2022 Zusco, All Rights Reserved
          </p>

          <div className="flex justify-start items-center  w-fit space-x-3">
            <a
              className="flex justify-start items-center text-base text-black text-left w-full whitespace-nowrap"
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Call className="mr-2" />
              Contact Us
            </a>
            <div className="flex justify-start items-center  w-fit space-x-4">
              <a href="https://facebook.com/" target="_blank" rel="noreferrer">
                <Facebook className="h-[14px] w-[14px]" />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <Twitter className="h-[14px] w-[14px]" />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
                <Linkedin className="h-[14px] w-[14px]" />
              </a>
            </div>
          </div>

          <div className="flex justify-start items-center  w-fit space-x-8">
            <a
              className="text-base text-black text-left"
              href="https://getzusco.com/platform/privacy-policy"
              target="_blank"
              rel="noreferrer"
            >
              Privacy Policy
            </a>

            <a
              className="text-base text-black text-left"
              href="https://getzusco.com/platform/terms"
              target="_blank"
              rel="noreferrer"
            >
              Terms & Condition
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.any,
};

export default observer(DashboardLayout);
