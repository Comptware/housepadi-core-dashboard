import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import {
  SignifierOne,
  SignifierTwo,
  SignifierThree,
  SignifierFour,
} from "assets/icons";

import { ReactComponent as Logo } from "assets/icons/logo/logo_black.svg";
import { ReactComponent as Notification } from "assets/icons/notification.svg";
import ListingStore from "pages/dashboard/listings/store";

import Toast from "../../general/toast/toast";

const NewListingLayout = ({ children }) => {
  const location = useLocation();
  const listLinks = [
    "/new-listing/step-one",
    "/new-listing/step-two",
    "/new-listing/step-three",
    "/new-listing/step-four",
  ];

  let pathName = location?.pathname;

  for (let index = 0; index < listLinks.length; index++) {
    pathName = pathName?.replace(listLinks[index], "");
  }

  const path = pathName?.replace("/", "");
  const suffix = path ? "/" + path : "";

  const {
    formOneDisabled,
    formTwoDisabled,
    formThreeDisabled,
    formFourDisabled,
  } = ListingStore;

  const dashboardLinks = [
    {
      title: "Basic Info",
      link: `/new-listing/step-one${suffix}`,
      icon: <SignifierOne className="stroke-current" />,
      complete: !formOneDisabled(),
    },
    {
      title: "Amenities & Features",
      link: !formOneDisabled() ? `/new-listing/step-two${suffix}` : "#",
      icon: <SignifierTwo className="stroke-current" />,
      complete: !formTwoDisabled(),
    },
    {
      title: "Upload Media",
      link: !formTwoDisabled() ? `/new-listing/step-three${suffix}` : "#",
      icon: <SignifierThree className="stroke-current" />,
      complete: !formThreeDisabled(),
    },
    {
      title: "Payment",
      link: !formThreeDisabled() ? `/new-listing/step-four${suffix}` : "#",
      icon: <SignifierFour className="stroke-current" />,
      complete: !formFourDisabled(),
    },
  ];

  return (
    <div className="w-screen min-h-screen h-screen flex flex-grow flex-col relative">
      <header className="flex flex-row justify-between items-center w-full py-4 fixed left-0 right-0 top-0 border-b-1/2 border-grey-border z-[99] h-[70px] bg-white">
        <div className="relative flex flex-row justify-between items-center mx-auto w-full px-10 ">
          <div className="h-8 w-[110px] h-[32px] !my-0">
            <Logo className="w-full h-full z-90" />
          </div>
          <Toast />

          <Notification className="hover:fill-grey-lighter transition-all duration-300 ease-in-out cursor-pointer" />
        </div>
      </header>
      <section className="w-full h-full flex flex-row flex-grow max-w-9xl mx-auto relative mt-[70px]">
        <aside className="dashboard-sidenav w-60 pt-[20px] pb-28 h-full flex flex-col flex-grow absolute left-0 top-0 bottom-0 z-50 bg-white overflow-y-scroll border-r-1/2 border-grey-border">
          <div className="flex flex-col justify-between items-start w-full h-full pl-10 pr-5">
            <div className="flex flex-col justify-start items-start pb-10 w-full transition-all duration-150 ease-in-out">
              <span className="text-grey uppercase text-xs pt-6 pl-5">
                Steps (4)
              </span>
              {dashboardLinks.map(({ title, icon, link, complete }) => (
                <Link
                  to={link}
                  key={title}
                  className="cursor-pointer regular-font"
                  aria-disabled
                >
                  <div
                    className={`flex justify-center items-center hover:text-blue text-grey-black text-sm space-x-2 
                    ${
                      location.pathname.includes(link) && "!text-blue-alt"
                    }    ${complete && "text-green"}`}
                  >
                    <span className="w-[40px]">{icon}</span>

                    <span className="text-current whitespace-nowrap">
                      {title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <main className="dashboard-content bg-grey-whitesmoke w-full  ml-60 flex flex-col items-center flex-grow overflow-y-auto">
          {children}
        </main>
      </section>
    </div>
  );
};

NewListingLayout.propTypes = {
  children: PropTypes.any,
};

export default observer(NewListingLayout);
