import { apiInstance2 } from "utils/apiInstance";

const apis = {
  getUsers: (page_number) => apiInstance2(`users/all/${page_number}`),

  getUsersById: (user_id) => apiInstance2(`users/one/${user_id}`),

  getUserBookings: (data, page_number) =>
    apiInstance2(`admin/agent/bookings/${page_number}`, {
      method: "POST",
      body: data,
    }),
  updateUser: (data) =>
    apiInstance2(`users`, {
      method: "PATCH",
      body: data,
    }),
  deleteUser: (id) =>
    apiInstance2(`users/${id}`, {
      method: "DELETE",
    }),
  blockUser: (data) =>
    apiInstance2("admin/block/agent", {
      method: "POST",
      body: data,
    }),
};

export default apis;
