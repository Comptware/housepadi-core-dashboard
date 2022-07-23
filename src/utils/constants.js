import { ReactComponent as Cleaning } from "assets/icons/cleaning.svg";
import { ReactComponent as Hint } from "assets/icons/hint.svg";
import { ReactComponent as Card } from "assets/icons/card.svg";
import Tippy from "@tippyjs/react";

export const HOUSE_TYPES = [
  { value: "duplex", label: "Duplex" },
  { value: "flat", label: "Flat" },
  { value: "bungalow", label: "Bungalow" },
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

export const DEFAULT_AVATAR =
  "https://res.cloudinary.com/olamilekan1/image/upload/v1658528808/avatar-default.png";
