import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "hooks/auth";
import { ReactComponent as Logout } from "assets/icons/logout.svg";
import ListingStore from "pages/dashboard/listings/store";
import CommonStore from "stores/common";
import SettingsStore from "pages/dashboard/settings/store";
import HomeStore from "pages/dashboard/home/store";
import notificationAlertSound from "assets/audios/quick-alert.wav";
import { getUserInfoFromStorage } from "utils/storage";
import db from "services/firebase.config";
import Header from "../header";
import { dashboardLinks } from "components/arrays/dashboard";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const { setListingDataSet } = ListingStore;
  const { getMe, me, sidenavOpen, setSidenavOpen } = CommonStore;
  const { getSettings, settings } = SettingsStore;
  const { notificationItems, getNotificationData, handleSetNotificationItems } =
    HomeStore;
  const userInfo = getUserInfoFromStorage();

  // useEffect(() => {
  //   setListingDataSet(false);
  // }, []);

  const notificationAlertAudio = new Audio(notificationAlertSound);
  const playAudio = (audioFile) => {
    audioFile?.play();
  };

  const listingLinks = [
    {
      title: "Logout",
      link: "/auth/login",
      click: () => {
        sessionStorage.clear();
      },
      // click: () => {
      //   logout();
      // },
      icon: <Logout className="w-3.5 mr-1" />,
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
        unreadConvos?.forEach((item) => {
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

  // useEffect(() => {
  //   getMe();
  //   getConversations();
  //   getSettings();
  // }, []);

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
            {dashboardLinks.map(({ title, icon, link }) => (
              <Link
                to={link}
                key={title}
                onClick={() => setSidenavOpen(false)}
                className="w-full"
              >
                <div
                  className={`flex justify-start items-center hover:!text-green-hover text-grey text-sm space-x-2 px-5 py-3 rounded-lg w-full ${
                    location.pathname.includes(link) &&
                    "!text-black bg-grey-dark"
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
        <main className="bg-grey-whitesmoke min-h-[100vh] w-full lg:pl-[270px] pt-[120px] mlg:pb-14">
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
