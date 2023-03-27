import { apiInstance2 } from "utils/apiInstance";

const apis = {
  getStats: (payload) =>
    apiInstance2(`userRequests/admin/request-stats`, {
      method: "POST",
      ...(payload && { body: payload }),
    }),
};

export default apis;
