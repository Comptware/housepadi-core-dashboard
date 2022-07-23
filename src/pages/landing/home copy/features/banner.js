import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
const Banner = observer(() => {
  return (
    <div>
      <h1 className="text-black mb-10 texl-lg">Banner</h1>
      <Link to="/login" className="text-white p-3 bg-blue">
        Login
      </Link>
    </div>
  );
});

export default Banner;
