import React from "react";
import { observer } from "mobx-react-lite";
import { images } from "../../../../constants";
import { CgArrowLongRight } from "react-icons/cg";

const instructions = observer(() => {
  return (
    <section className="flex flex-col gap-14">
      <div className="w-[60%] md:w-[80%] flex flex-col gap-6 pl-[10%]">
        <h4 className="text-blue-6 font-medium text-[15px] md:text-[12px]">
          HOW IT WORKS
        </h4>
        <h2 className="text-blue-6 font-bold text-[40px] lg:text-[32px] md:text-[24px]">
          Get started on Zusco with these easy steps
        </h2>
        <p className="text-[22px] lg:text-[18px] md:text-[14px]">
          Browse our locations. Leave it to Zusco to help support your
          short-stay needs.
        </p>
      </div>

      <div className="grid grid-cols-[1fr,_1fr] md:grid-cols-[1fr] gap-6 justify-between ">
        <div>
          <img className="md:w-full" src={images.apartment} alt="" />
        </div>
        <div className="flex flex-col justify-between py-6 px-[32px] pl-[15%] md:pl-[10%]">
          <div className="">
            <img
              className="h-5/6 md:h-full xs:h-5/6"
              src={images.homeIcon}
              alt=""
            />
          </div>
          <h2 className="text-blue-6 font-bold text-[32px] lg:text-[26px] md:text-[32px] xs:text-[26px]">
            Rent a shortlet.
          </h2>
          <p className="text-[18px] lg:text-[14px] xs:text-[14px] md:text-[18px] text-black w-[70%] md:w-full">
            Choose from a wide range of short let properties to rent, in a
            variety of locations across the country. Your comfort matters.
          </p>
          <div className="flex gap-3 items-center">
            <p className="underline text-blue-6 text-[18px] lg:text-[14px]">
              Find out how{" "}
            </p>
            <span>
              <CgArrowLongRight className="text-blue-6" color="#00509D" />
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr,_1fr] md:grid-cols-[1fr] gap-6 justify-between  ">
        <div className="flex flex-col justify-between py-6 pl-[10%] ">
          <div>
            <img
              className="h-5/6 md:h-full xs:h-5/6"
              src={images.hostIcon}
              alt=""
            />
          </div>
          <h2 className="text-blue-6 font-bold text-[32px] lg:text-[26px] ">
            Become a host
          </h2>
          <p className="text-[18px] lg:text-[14px] text-black w-[80%]">
            Zusco helps you, as a homeowner, to rent or lease out your spare
            rooms, so that you can earn more with little to no hassle!
          </p>
          <div className="flex gap-3 items-center">
            <p className="underline text-blue-6 text-[18px] lg:text-[14px]">
              Find out how{" "}
            </p>
            <span>
              <CgArrowLongRight className="text-blue-6" color="#00509D" />
            </span>
          </div>
        </div>
        <div className="pl-[10%] md:pl-[1px]">
          <img
            className="float-right md:justify-center md:w-full "
            src={images.apartmentRight}
            alt=""
          />
        </div>
      </div>
    </section>
  );
});

export default instructions;
