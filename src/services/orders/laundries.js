import { apiInstance2 } from "utils/apiInstance";

const apis = {
  getLaundryOrders: ({ pageNumber, status, payload }) =>
    apiInstance2(`userRequests/laundry/all/${pageNumber}/${status}`, {
      method: "POST",
      ...(payload && { body: payload }),
    }),
  updateLaundryOrder: (payload) =>
    apiInstance2(`userRequests/update-request-item-status`, {
      method: "PATCH",
      body: payload,
    }),
};

export default apis;
