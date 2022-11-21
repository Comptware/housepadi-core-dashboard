import { apiInstance2 } from "utils/apiInstance";

const apis = {
  getUsers: (page_number) => apiInstance2(`admin/users/${page_number}`),

  getUsersById: (user_id) => apiInstance2(`admin/agent/one/${user_id}`),

  getUserBookings: (data, page_number) =>
    apiInstance2(`admin/agent/bookings/${page_number}`, {
      method: "POST",
      body: data,
    }),

  blockUser: (data) =>
    apiInstance2("admin/block/agent", {
      method: "POST",
      body: data,
    }),
};

export default apis;
