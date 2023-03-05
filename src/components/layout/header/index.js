import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "assets/icons/logo.svg";
import { ReactComponent as SearchIcon } from "assets/icons/search-icon.svg";
import CommonStore from "stores/common";
import Hamburger from "../hamburger";
import { Avatar } from "assets/images/exports";

const Header = () => {
  const { sidenavOpen, setSidenavOpen } = CommonStore;
  return (
    <header className="flex flex-col justify-center items-center w-full py-4 fixed border-b-1/2 border-[#c8c8c8] text-black z-[99] h-[92px] bg-white">
      <div className="flex justify-between w-full items-center 4xs:px-10 mlg:px-0">
        <div className="relative flex justify-between items-center mx-auto w-full mlg:pr-[40px] mlg:pl-[54px]">
          <Link to="/">
            <Logo className="h-[35px]" />
          </Link>

          <div className="mlg:flex 4xs:hidden mlg:flex-row gap-[16px] items-center">
            <div className="flex gap-[24px] items-center">
              <div className="flex gap-[10px] items-center w-[306px] py-[8px] rounded-full border border-[#acacac] px-[26px]">
                <SearchIcon />
                <input
                  placeholder="Search by Order Code"
                  className="placeholder:text-[14px] text-black outline-none placeholder:text-[#c8c8c8]"
                />
              </div>
              <div className="flex">
                <div>
                  <div className="font-medium text-[#2d2d2d]">Iruene Seyi</div>
                  <div className="text-[11px] text-[#acacac]">
                    Kitchen Staff
                  </div>
                </div>
              </div>
              <div className="rounded-full border-[2px] border-[#C30D21]">
                <img src={Avatar} className="w-[44px] h-44px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="4xs:flex lg:hidden">
          <Hamburger
            click={() => {
              setSidenavOpen(!sidenavOpen);
            }}
            className={sidenavOpen ? "ham_crossed" : ""}
          />
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
