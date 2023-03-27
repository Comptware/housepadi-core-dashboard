import { ORDER_STATUSES } from "utils/constants";
import MealOrders from "../features/mealOrders";

const { INPROGRESS, PENDING, COMPLETED, CANCELLED } = ORDER_STATUSES;
export const ORDER_TABS = [
  {
    title: "Current Orders",
    content: <MealOrders />,
    link: "/dashboard/meal-orders/current-orders",
    status: "all",
  },

  {
    title: "In Progress",
    content: <MealOrders status={INPROGRESS} />,
    link: "/dashboard/meal-orders/in-progress",
    status: INPROGRESS,
  },
  {
    title: "Pending",
    content: <MealOrders status={PENDING} />,
    link: "/dashboard/meal-orders/pending-orders",
    status: PENDING,
  },

  {
    title: "Completed",
    content: <MealOrders status={COMPLETED} />,
    link: "/dashboard/meal-orders/completed-orders",
    status: COMPLETED,
  },

  {
    title: "Cancelled",
    content: <MealOrders status={CANCELLED} />,
    link: "/dashboard/meal-orders/cancelled-orders",
    status: CANCELLED,
  },
];
