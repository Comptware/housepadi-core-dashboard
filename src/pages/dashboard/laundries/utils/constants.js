import { ORDER_STATUSES } from "utils/constants";
import Laundries from "../features/laundry";

const { INPROGRESS, PENDING, COMPLETED, CANCELLED } = ORDER_STATUSES;
export const ORDER_TABS = [
  {
    title: "Current Orders",
    content: <Laundries />,
    link: "/dashboard/laundries/current-orders",
    status: "all",
  },

  {
    title: "In Progress",
    content: <Laundries status={INPROGRESS} />,
    link: "/dashboard/laundries/in-progress",
    status: INPROGRESS,
  },
  {
    title: "Pending",
    content: <Laundries status={PENDING} />,
    link: "/dashboard/laundries/pending-orders",
    status: PENDING,
  },

  {
    title: "Completed",
    content: <Laundries status={COMPLETED} />,
    link: "/dashboard/laundries/completed-orders",
    status: COMPLETED,
  },

  {
    title: "Cancelled",
    content: <Laundries status={CANCELLED} />,
    link: "/dashboard/laundries/cancelled-orders",
    status: CANCELLED,
  },
];
