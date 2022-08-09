import { apiInstance2 } from "utils/apiInstance";

const apis = {
  creatBooking: (data) =>
    apiInstance2("shortlet", {
      method: "POST",
      body: data,
    }),

  deletBooking: (shortlet_id) =>
    apiInstance2(`shortlet/${shortlet_id}`, {
      method: "DELETE",
    }),

  getBookings: (page_number) => apiInstance2(`agent/shortlet/bookings/${page_number}`),

  updatBooking: (data, shortlet_id) =>
    apiInstance2(`shortlet/${shortlet_id}`, {
      method: "PUT",
      body: data,
    }),

  getAAR: () => apiInstance2("shortlet/aar", { internal: true }),
};

export default apis;
