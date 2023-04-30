import Offers from "../features/offers";

export const SETTINGS_TABS = [
  {
    title: "Offers",
    content: <Offers />,
    link: "/dashboard/offers",
  },
];

export const MODAL_TYPES = {
  LAUNDRY_TYPE: "LAUNDRY_TYPE",
};
export const OFFER_TYPES = [
  { label: "Meal Offer", value: "MEAL" },
  { label: "Laundry Offer", value: "LAUNDRY" },
];
