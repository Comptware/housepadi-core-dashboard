import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { useAuth } from "hooks/auth";
import {
  Dashboard,
  Settings,
  Listings,
  Messages,
  BookAStay,
} from "assets/icons";
import { ReactComponent as Logout } from "assets/icons/logout.svg";
import { ReactComponent as Call } from "assets/icons/call.svg";
import { ReactComponent as Facebook } from "assets/icons/facebook.svg";
import { ReactComponent as Twitter } from "assets/icons/twitter.svg";
import { ReactComponent as Linkedin } from "assets/icons/linkedin.svg";
import { ReactComponent as Logo } from "assets/icons/logo/logo_black.svg";
import { ReactComponent as Notification } from "assets/icons/notification.svg";
import ListingStore from "pages/dashboard/listings/store";

import Toast from "../../general/toast/toast";
import Hamburger from "../hamburger";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const { setListingDataSet } = ListingStore;
  const [sidenavOpen, setSidenavOpen] = useState(false);
  useEffect(() => {
    setListingDataSet(false);
  }, []);
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
      title: "Messages",
      link: "/dashboard/messages",
      icon: <Messages className="fill-current" />,
    },
  ];

  const listingLinks = [
    {
      title: "Book a Stay",
      link: "/dashboard/book-a-stay",
      icon: <BookAStay className="fill-current" />,
    },
    {
      title: "Settings",
      link: "/dashboard/settings",
      icon: <Settings className="fill-current" />,
    },
    {
      title: "Logout",
      link: "/otp/send",
      click: () => {
        logout();
      },
      icon: <Logout className="fill-current" />,
    },
  ];

  return (
    <div className="w-screen min-h-screen h-screen flex flex-grow flex-col relative">
      <header className="flex flex-row justify-between items-center w-full py-4 fixed left-0 right-0 top-0 border-b-1/2 border-grey-border z-[99] h-[70px] bg-white">
        <div className="relative flex flex-row justify-between items-center mx-auto w-full px-10 ">
          <div className="h-8 w-[110px] !my-0">
            <Logo className="w-full h-full z-90" />
          </div>
          <Toast />

          <div className="flex flex-row justify-start items-center space-x-[20px]">
            <Notification className="hover:fill-grey-lighter transition-all duration-300 ease-in-out cursor-pointer" />

            <Hamburger
              click={() => {
                setSidenavOpen(!sidenavOpen);
              }}
              className={sidenavOpen ? "ham_crossed" : ""}
            />
          </div>
        </div>
      </header>
      <section className="w-full h-full flex flex-row flex-grow max-w-9xl mx-auto relative mt-[70px] overflow-hidden">
        <aside
          className={`dashboard-sidenav w-52 pt-[20px] pb-28 h-full flex flex-col flex-grow absolute left-0 top-0 bottom-0 z-50 bg-white
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
                <Link to={link} key={title}>
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
                <Link to={link} key={title} onClick={() => click && click()}>
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

        <main className="dashboard-content bg-grey-whitesmoke w-full lg:ml-52 pb-14 flex flex-col flex-grow overflow-y-auto">
          {children}
        </main>
      </section>
      <footer className="hidden sm:flex flex-row justify-between items-center w-full py-2 fixed left-0 right-0 bottom-0 border-t-1/2 border-grey-border z-[99] h-[50px] bg-white">
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
            <a className="text-base text-black text-left" href="#">
              Privacy Policy
            </a>

            <a className="text-base text-black text-left" href="#">
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

export default DashboardLayout;
