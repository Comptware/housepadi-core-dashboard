import React from "react";
import { observer } from "mobx-react-lite";

import Overview from "./overview";

const ListingsHome = observer(() => {
  return (
    <div className="flex flex-col justify-start items-start h-full w-full">
      <Overview />
    </div>
  );
});

export default ListingsHome;
