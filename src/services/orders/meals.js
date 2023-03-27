import { apiInstance2 } from "utils/apiInstance";

const apis = {
  getMealOrders: ({ pageNumber, status, payload }) =>
    apiInstance2(`userRequests/meal/all/${pageNumber}/${status}`, {
      method: "POST",
      ...(payload && { body: payload }),
    }),
  updateMealOrder: (payload) =>
    apiInstance2(`userRequests/update-request-item-status`, {
      method: "PATCH",
      body: payload,
    }),
};

export default apis;
