import React from "react";
import LandingLayout from "components/layout/landing";

import Banner from "./features/banner";
import Content from "./features/mainContent";
import Instructions from "./features/instructions";

const Home = () => {
  return (
    <LandingLayout>
      <Banner />
      <Content />
      <Instructions />
    </LandingLayout>
  );
};

export default Home;
