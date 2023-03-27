import { ReactComponent as Cleaning } from "assets/icons/cleaning.svg";
import { ReactComponent as Hint } from "assets/icons/hint.svg";
import { ReactComponent as Card } from "assets/icons/card.svg";
import Tippy from "@tippyjs/react";

export const ORDER_STATUSES = {
  PENDING: "PENDING",
  INPROGRESS: "INPROGRESS",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
};

export const ORDER_STATUS_OPTIONS = [
  {
    value: ORDER_STATUSES.PENDING,
    label: "Pending",
    color: "",
    background: "",
  },
  {
    value: ORDER_STATUSES.INPROGRESS,
    label: "In Progress",
    color: "#B5B03A",
    background: "#F7F6DA",
  },
  {
    value: ORDER_STATUSES.CANCELLED,
    label: "Cancelled",
    color: "#C30D21",
    background: "#FBCFD4",
  },
  {
    value: ORDER_STATUSES.COMPLETED,
    label: "Completed",
    color: "#4CB53A",
    background: "#DEF7DA",
  },
];

export const MEALS_SORT_OPTIONS = [
  { value: "mealType", label: "Sort meals by type" },
  { value: "mealCategory", label: "Sort meals by category" },
];
export const LAUNDRIES_SORT_OPTIONS = [
  { value: "laundryType", label: "Sort laundries by type" },
];

export const HOUSE_TYPES = [
  { value: "duplex", label: "Duplex" },
  { value: "flat", label: "Flat" },
  { value: "bungalow", label: "Bungalow" },
  { value: "terraced_house", label: "Terraced House" },
  { value: "detached_house", label: "Detached House" },
  { value: "semi_detached_house", label: "Semi-detached House" },
];

export const SPACES = [
  { name: "Sitting Space", value: "sitting_space_images" },
  { name: "Kitchen", value: "kitchen_images" },
  { name: "Bedrooms", value: "bedroom_images" },
  { name: "Dining Area", value: "dining_area_images" },
  { name: "Bathroom", value: "bathroom_images" },
];

export const PAYMENT_ADDONS = [
  { name: "Cleaning", value: "addon_cleaning_fee", icon: <Cleaning /> },
  {
    name: "Caution fee",
    value: "addon_caution_fee",
    icon: (
      <Tippy content={"Covers the caution fee"}>
        <Hint />
      </Tippy>
    ),
  },
];

export const GUEST_PAYMENTS = [
  {
    name: "Online Payments",
    value: "card",
    label: "Card Transaction, Paystack",
    icon: <Card />,
  },
  {
    name: "Bank Transfers",
    value: "bank_transfer",
    label: "Recieve money through account number",
    icon: <Card />,
  },
];

export const DASBOARD_DATA_TYPES = {
  TOTAL_ORDERS: "Total Orders",
  AVERAGE_ORDER_VALUE: "Average Order Value",
  AVERAGE_DAILY_ORDERS: "Average Daily Orders",
  HIGHEST_ORDER_AMOUNT: "Highest Order Amount",
  LOWEST_ORDER_AMOUNT: "Lowest Order Amount",
};
export const DASHBOARD_FILTER = [
  { value: "category", label: "Sort values by category" },
];
export const DATE_FILTER = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "last_quarter", label: "Last quarter" },
  { value: "last_year", label: "Last year" },
  { value: "custom", label: "Custom Date" },
];

export const DEFAULT_AVATAR =
  "https://res.cloudinary.com/olamilekan1/image/upload/v1658528808/avatar-default.png";

export const pageCount = 10;
