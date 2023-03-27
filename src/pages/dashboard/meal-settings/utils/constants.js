import Discounts from "../features/discounts";
import MealCategories from "../features/mealCategories";
import Meals from "../features/meals";
import MealTypes from "../features/mealTypes";

export const SETTINGS_TABS = [
  {
    title: "Meals",
    content: <Meals />,
    link: "/dashboard/meal-settings/meals",
  },
  {
    title: "Meal Types",
    content: <MealTypes />,
    link: "/dashboard/meal-settings/meals-types",
  },
  {
    title: "Meal Categories",
    content: <MealCategories />,
    link: "/dashboard/meal-settings/meals-categories",
  },
  {
    title: "Discount Codes",
    content: <Discounts />,
    link: "/dashboard/meal-settings/discount-codes",
  },
];

export const MODAL_TYPES = {
  MEAL_TYPE: "MEAL_TYPE",
  MEAL_CATEGORY: "MEAL_CATEGORY",
};
export const DISCOUNT_TYPES = {
  FIXED: "FIXED",
  PERCENTAGE: "PERCENTAGE",
};
export const DISCOUNT_TYPE_OPTIONS = [
  { value: DISCOUNT_TYPES.FIXED, label: "Fixed" },
  { value: DISCOUNT_TYPES.PERCENTAGE, label: "Percentage" },
];
