import React from "react";
import { observer } from "mobx-react-lite";

import { images } from "../../../../constants";
const Banner = observer(() => {
  return (
    <section className="flex justify-start align-center h-screen">
      <div className="flex justify-start align-center px-[80px] xl:px-[60px] mlgpx-[40px]">
        <img src={images} alt="" />
        <p className="font-medium text-[40px] text-black bold-font h-fit m-auto">
          Access amazing rentals with just few steps!
        </p>
      </div>
    </section>
  );
});

export default Banner;
