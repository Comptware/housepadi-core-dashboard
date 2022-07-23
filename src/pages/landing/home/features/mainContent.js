import React from "react";
import { observer } from "mobx-react-lite";
import { images } from "../../../../constants";

const Content = observer(() => {
  return (
    <section className="flex flex-col gap-6 md:gap-2">
      <div className="Title justify-center flex flex-col gap-4 md:gap-1">
        <p className="text-blue-6 font-medium text-[15px] sm:text-[12px] text-center">
          OUR PROPERTIES
        </p>
        <h2 className="text-blue-6 font-bold text-[40px] md:text-[32px] text-center mb-2">
          Browse our top shortlet properties
        </h2>
        <p className="text-black text-[22px] md:text-[16px] text-center w-[40%] md:w-[65%] sm:w-[80%] mx-auto">
          Browse our locations. Leave it to Zusco to help support your
          short-stay needs.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="mx-auto flex justify-center gap-3 items-center">
          <p className="text-blue-9 font-medium text-2xl pb-1">
            Zusco Shortlets
          </p>
          <span className="w-6 items-center">
            <img className="w-6" src={images.zuscoIconBlue} alt="" />
          </span>
        </div>

        <div className="w-full justify-center text-center mb-8">
          <div className="grid grid-cols-[1fr,_1fr,_1fr] md:grid-cols-[300px,_300px,_300px] overflow-x-scroll justify-between w-full mb-4">
            <img className="" src={images.propertyImg} alt="" />
            <img className="" src={images.propertyImg} alt="" />
            <img className="" src={images.propertyImg} alt="" />
          </div>
          <button className="text-white bg-purple px-[50px] lg:px-[25px] py-[19px] lg:py-[10px] sm:py-[5px] font-medium text-xl lg:text-lg sm:text-base mx-auto rounded-[4px]">
            See more
          </button>
        </div>

        <div className="w-full justify-center text-center mb-8">
          <div className="grid grid-cols-[1fr,_1fr,_1fr] md:grid-cols-[300px,_300px,_300px] overflow-x-scroll justify-between w-full mb-4">
            <img className="" src={images.propertyImg} alt="" />
            <img className="" src={images.propertyImg} alt="" />
            <img className="" src={images.propertyImg} alt="" />
          </div>
          <button className="text-white bg-purple px-[50px] lg:px-[25px] py-[19px] lg:py-[10px] sm:py-[5px] font-medium text-xl lg:text-lg sm:text-base mx-auto rounded-[4px]">
            See more
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="mx-auto flex justify-center gap-3 items-center">
          <p className="text-blue-9 font-medium text-2xl pb-1">
            Popular Shortlets
          </p>
        </div>

        <div className="w-full justify-center text-center mb-8">
          <div className="grid grid-cols-[1fr,_1fr,_1fr] md:grid-cols-[300px,_300px,_300px] overflow-x-scroll justify-between w-full mb-4">
            <img className="" src={images.propertyImg} alt="" />
            <img className="" src={images.propertyImg} alt="" />
            <img className="" src={images.propertyImg} alt="" />
          </div>
          <button className="text-white bg-purple px-[50px] lg:px-[25px] py-[19px] lg:py-[10px] sm:py-[5px] font-medium text-xl lg:text-lg sm:text-base mx-auto rounded-[4px]">
            See more
          </button>
        </div>
      </div>
    </section>
  );
});

export default Content;
