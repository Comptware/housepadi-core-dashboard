import Notifications from "../features/notifications";

export const SETTINGS_TABS = [
  {
    title: "Notifications",
    content: <Notifications />,
    link: "/dashboard/notifications",
  },
];

export const MODAL_TYPES = {
  LAUNDRY_TYPE: "LAUNDRY_TYPE",
};
export const OFFER_TYPES = [
  { label: "Meal Notification", value: "MEAL" },
  { label: "Laundry Notification", value: "LAUNDRY" },
];
