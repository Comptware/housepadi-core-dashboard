import React from "react";
import { observer } from "mobx-react-lite";
// import { Link } from "react-router-dom";
import { images } from "../../../../constants";
const Banner = observer(() => {
  return (
    <div className="bg-blue-gradient h-200 lg:h-[650px] md:h-[500px] sm:h-[450px] flex flex-col justify-between">
      <div className="h-[75%] w-full  pt-[54px]">
        <div className="h-full flex pl-[72px] md:pl-[50px] sm:pl-[20px] ">
          <div className=" pr-[102px] md:pr-[70px] sm:pr-[15px] w-[60%] sm:w-[50%] text-white  relative">
            <div className="items-center relative top-[40%] -translate-y-1/2 flex flex-col gap-8 sm:gap-4">
              <h2 className="font-bold text-[54px] lg:text-[40px] md:text-[30px] sm:text-[22px] xs:text-[18px] leading-[70px] lg:leading-[50px] md:leading-[35px] sm:leading-[28px] xs:leading-[22px]">
                Your online marketplace for short-let homes.
              </h2>
              <p className="text-[22px] lg:text-[18px] md:text-[14px] sm:text-[10px]">
                Forget multiyear leases, tacky decor and constant moving. Zusco
                offers an easy, flexible option with no long term commitment!
              </p>
            </div>
            <div className="w-[110%] sm:w-[180%] h-[152px] lg:h-[120px] sm:h-[60px] md:h-[90px] bg-white text-black text-3xl sm:text-lg text-center font-bold absolute -bottom-8 lg:-bottom-1 sm:-bottom-0 border border-black">
              Search Bar placeholder
            </div>
          </div>

          <div className="w-[40%] sm:w-[50%] pt-12 sm:pt-4 sm:h-full">
            <img
              className="sm:object-cover"
              src={images.mainImgBanner}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex gap-6 lg:pt-4 pl-[72px] md:pl-[50px] w-[50%] md:w-[30%] sm:hidden">
        <img className="w-max" src={images.appStore} alt="" />
        <img src={images.googleStore} alt="" />
      </div>

      {/* <Link to="/login" className="text-white p-3 bg-blue">
        Login
      </Link> */}
    </div>
  );
});

export default Banner;
