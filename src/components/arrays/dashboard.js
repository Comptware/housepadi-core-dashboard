import { FiUsers } from "react-icons/fi";
import { GiForkKnifeSpoon, GiNotebook } from "react-icons/gi";
import {
  MdOutlineLocalLaundryService,
  MdOutlineSettingsSystemDaydream,
  MdOutlineSpaceDashboard,
  MdOutlineLocalOffer,
  MdOutlineNotificationsNone,
} from "react-icons/md";

export const dashboardLinks = [
  {
    title: "Dashboard",
    link: "/dashboard/home",
    icon: <MdOutlineSpaceDashboard className="stroke-current text-xl" />,
  },
  {
    title: "Meal Orders",
    link: "/dashboard/meal-orders/current-orders",
    slug: "/dashboard/meal-orders",
    icon: <GiNotebook className="stroke-current text-xl" />,
  },
  {
    title: "Laundry Orders",
    link: "/dashboard/laundries/current-orders",
    slug: "/dashboard/laundries",
    icon: <MdOutlineLocalLaundryService className="fill-current text-xl" />,
  },
  {
    title: "Meal Settings",
    link: "/dashboard/meal-settings/meals",
    slug: "/dashboard/meal-settings/",
    icon: <GiForkKnifeSpoon className="stroke-current text-xl" />,
  },
  {
    title: "Laundry Settings",
    link: "/dashboard/laundry-settings/laundry-items",
    slug: "/dashboard/laundry-settings/",
    icon: (
      <MdOutlineSettingsSystemDaydream className="stroke-current text-xl" />
    ),
  },
  {
    title: "Offers",
    link: "/dashboard/offers",
    icon: <MdOutlineLocalOffer className="stroke-current text-xl" />,
  },
  {
    title: "Notifications",
    link: "/dashboard/notifications",
    icon: <MdOutlineNotificationsNone className="stroke-current text-xl" />,
  },
  {
    title: "Users",
    link: "/dashboard/users",
    icon: <FiUsers className="stroke-current text-xl" />,
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
