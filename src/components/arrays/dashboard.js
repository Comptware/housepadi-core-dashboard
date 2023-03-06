import { BookAStay, Dashboard, Meals, Settings } from "assets/icons";

import { ReactComponent as CashStack } from "assets/icons/cards/cash-stack.svg";
import { ReactComponent as Dollar } from "assets/icons/cards/dollar-span.svg";
import { ReactComponent as Food } from "assets/icons/cards/food.svg";

export const dashboardLinks = [
  {
    title: "Dashboard",
    link: "/dashboard/home",
    icon: <Dashboard className="stroke-current" />,
  },
  {
    title: "Meal Orders",
    link: "/dashboard/meals",
    icon: <Meals className="stroke-current" />,
  },
  {
    title: "Dry Cleaning Orders",
    link: "/dashboard/dry-cleaning",
    icon: <BookAStay className="fill-current" />,
  },
  {
    title: "Settings",
    link: "/dashboard/settings",
    icon: <Settings className="stroke-current" />,
  },
];

export const heading = [
  "Order Detail",
  "Category Name",
  "Order ID",
  "Price Value",
];

export const body = [
  {
    row1: "2 Meals, 1 side",
    date: "25th of July at 3.00pm",
    row2: "MEAL",
    row3: "FCSDB32",
    sub: "Valerie Uba",
    row4: "$4,356",
    end: "Revenue",
  },
];

export const orders = [
  {
    title: "Total Orders",
    val: "205",
    icon: <Food />,
  },
  {
    title: "Average Order Value",
    val: "2,400",
    icon: <Dollar />,
  },
  {
    title: "Highest Order Amount",
    val: "2,400",
    icon: <CashStack />,
  },
  {
    title: "Lowest Order Amount",
    val: "2,400",
    icon: <CashStack />,
  },
  {
    title: "Average Daily Orders",
    val: "115",
    icon: <Food />,
  },
];
