import Laundries from "../features/laundries";
import LaundryTypes from "../features/laundryTypes";

export const SETTINGS_TABS = [
  {
    title: "Laundry Items",
    content: <Laundries />,
    link: "/dashboard/laundry-settings/laundry-items",
  },
  {
    title: "Laundry Types",
    content: <LaundryTypes />,
    link: "/dashboard/laundry-settings/laundry-types",
  },
];

export const MODAL_TYPES = {
  LAUNDRY_TYPE: "LAUNDRY_TYPE",
};
