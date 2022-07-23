import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { images } from "constants";

import Toast from "components/general/toast/toast";
import Button from "components/general/button/button";

const Header = () => {
  const location = useLocation();
  const headerLinks = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Rent",
      link: "/rent",
    },
    {
      title: "Become a Host",
      link: "/become-a-host",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];
  return (
    <header className="website-header flex flex-row justify-between items-center w-full p-12 md:px-[12%] z-50 bg-blue-gradient">
      <div className="relative flex flex-row justify-between items-center mx-auto w-full">
        <Toast />
        <Link to="/">
          <img
            className="w-[174px] md:w-[140px] sm:w-[100px]"
            src={images.zuscoLogoWhite}
            alt="logo"
          />
        </Link>

        <div className=" flex justify-end items-center pl-6 w-fit space-x-12 transition-all duration-150 ease-in-out">
          {headerLinks.map(({ title, link }) => (
            <Link to={link} key={title}>
              <div
                className={`link-content flex justify-center items-center hover:text-purple text-white ${
                  location.pathname.includes(link) && "text-purple underline"
                }`}
              >
                <span className="text-current">{title}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-row justify-start items-center space-x-2">
          <Link to="/login">
            <Button text="Log In" isOutline textClass="text-white" />
          </Link>
          <Link to="/signup">
            <Button text="Sign Up" onClick={() => {}} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
