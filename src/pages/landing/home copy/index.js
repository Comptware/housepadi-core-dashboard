import React from "react";
import { Outlet } from "react-router";
import Banner from "./features/banner";
const Home = () => {
  return (
    <div>
      <Banner />
    </div>
  );
};

export default Home;
