/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import { successToast } from "components/general/toast/toast";
import apis from "services/orders/meals";
import LaundriesStore from "pages/dashboard/laundries/store";
import { ORDER_STATUSES } from "utils/constants";
const { INPROGRESS, PENDING, COMPLETED, CANCELLED } = ORDER_STATUSES;
class MealOrdersStore {
  // ====================================================
  // State
  // ====================================================

  activeOrder = null;
  orders = [];
  inProgressOrders = [];
  pendingOrders = [];
  completedOrders = [];
  cancelledOrders = [];
  ordersCount = 0;
  inProgressOrdersCount = 0;
  pendingOrdersCount = 0;
  completedOrdersCount = 0;
  cancelledOrdersCount = 0;
  getOrdersLoading = false;
  updateOrdersLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  // ====================================================
  // Actions
  // ====================================================

  getOrders = async ({ pageNumber, status, payload }) => {
    this.getOrdersLoading = true;
    try {
      const res = await apis.getMealOrders({
        pageNumber: pageNumber || "1",
        status,
        payload,
      });
      switch (status) {
        case INPROGRESS:
          this.inProgressOrders = res?.results || [];
          this.inProgressOrdersCount = res?.total || 0;
          break;
        case PENDING:
          this.pendingOrders = res?.results || [];
          this.pendingOrdersCount = res?.total || 0;
          break;
        case COMPLETED:
          this.completedOrders = res?.results || [];
          this.completedOrdersCount = res?.total || 0;
          break;
        case CANCELLED:
          this.cancelledOrders = res?.results || [];
          this.cancelledOrdersCount = res?.total || 0;
          break;
        default:
          this.orders = res?.results || [];
          this.ordersCount = res?.total || 0;
          break;
      }
    } finally {
      this.getOrdersLoading = false;
    }
  };

  updateOrder = async ({
    status = "all",
    payload,
    pageNumber = 1,
    getPayload,
    callbackFunc,
  }) => {
    this.updateOrdersLoading = true;
    try {
      await apis.updateMealOrder(payload);
      successToast(
        `Operation successful!`,
        payload?.status === CANCELLED
          ? "Order cancelled successfully."
          : "Order status updated successfully."
      );
      callbackFunc && callbackFunc();
      if (payload?.requestType === "MEAL") {
        this.getOrders({ pageNumber, payload: getPayload, status });
      } else {
        LaundriesStore.getOrders({ pageNumber, payload: getPayload, status });
      }
    } finally {
      this.updateOrdersLoading = false;
    }
  };
}

export default new MealOrdersStore();
