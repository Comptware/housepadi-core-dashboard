import React from "react";
import { observer } from "mobx-react-lite";

import { images } from "constants";
const Footer = observer(() => {
  return (
    <footer>
      <div className="main_gradient px-[100px] md:px-[50px] sm:px-[25px] py-[76px] md:py-[35px] sm:py-[25px]  flex flex-col gap-16 md:gap-8">
        <div className="flex flex-col gap-[24px] md:gap-[16px] justify-center text-center mx-auto">
          <h2 className="font-bold text-[40px] md:text-[28px] text-white">
            Get started for free in a few minutes!
          </h2>
          <p className="text-[22px] md:text-[16px] text-white">
            Ready to explore? Get started in with a new account.
          </p>
          <div className="mx-auto mt-4">
            <button className="bg-purple text-white font-bold text-[22px] md:text-base px-[46px] md:px-[30px] py-[13px] md:py-[6px]">
              Create a new account
            </button>
          </div>
        </div>

        <div className="grid gap-1 grid-cols-[1.5fr,_1fr,_1fr,_1fr,_1fr]  justify-between">
          <div className="flex flex-col justify-between">
            <img
              className="w-[174px] md:w-[140px] sm:w-[100px]"
              src={images.zuscoLogoWhite}
              alt="logo"
            />
            <p className="text-white font-medium text-[14px] md:text-[10px] pr-12 md:pr-4">
              Zusco is an online platform that gives Nigerians an opportunity to
              rent shortlet homes with ease.
            </p>
            <div className="flex gap-4 sm:gap-2 w-1/2 sm:w-1/4">
              <img className="md:w-full" src={images.fbWhite} alt="" />
              <img className="md:w-full" src={images.twitterWhite} alt="" />
              <img className="md:w-full" src={images.whatsappWhite} alt="" />
            </div>
          </div>

          <div className="text-white flex flex-col gap-6 md:gap-4 text-[18px] md:text-[12px] sm:text-[10px] font-medium">
            About
            <ul className="flex flex-col gap-4 md:gap-2 text-[18px] md:text-[12px] sm:text-[10px] font-normal">
              <li>About Zusco</li>
              <li>Our Blog</li>
            </ul>
          </div>

          <div className="text-white flex flex-col gap-6 md:gap-4 text-[18px] md:text-[12px] sm:text-[10px] font-medium">
            Shortlets
            <ul className="flex flex-col gap-4 md:gap-2 text-[18px] md:text-[12px] sm:text-[10px] font-normal">
              <li>Rent a home</li>
              <li>Become a host</li>
              <li>Rules</li>
              <li>Rental Conditions</li>
            </ul>
          </div>

          <div className="text-white flex flex-col gap-6 md:gap-4 text-[18px] md:text-[12px] sm:text-[10px] font-medium">
            Resources
            <ul className="flex flex-col gap-4 md:gap-2 text-[18px] md:text-[12px] sm:text-[10px] font-normal">
              <li>Join Zusco</li>
              <li>Community</li>
            </ul>
          </div>

          <div className="text-white flex flex-col gap-6 md:gap-4 text-[18px] md:text-[12px] sm:text-[10px] font-medium">
            Support
            <ul className="flex flex-col gap-4 md:gap-2 text-[18px] md:text-[12px] sm:text-[10px] font-normal">
              <li>Contact us</li>
              <li>FAQ</li>
              <li>How it works</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr,_1fr] pl-8 ">
        <div className="flex sm:flex-col gap-6 sm:gap-2 w-full mx-auto justify-center">
          <img
            className="w-[200px] md:w-[140px] sm:w-[100px]"
            src={images.googleStore}
            alt=""
          />
          <img
            className="w-[200px] md:w-[140px] sm:w-[100px]"
            src={images.appStore}
            alt=""
          />
        </div>
        <div>
          <img src={images.footerImg} alt="" />
        </div>
      </div>
      <div className="border-t border-grey-light mx-14 sm:mx-4 flex justify-between pt-4 pb-8">
        <p className="text-[14px] poppins">© 2022 Zusco, All Rights Reserved</p>
        <div className="flex gap-[80px] md:gap-[40px] sm:gap-[20px]">
          <p className="font-medium text-[14px]">Privacy Policy</p>
          <p className="font-medium text-[14px]">Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
