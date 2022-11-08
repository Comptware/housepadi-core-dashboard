import { apiInstance2 } from "utils/apiInstance";

const apis = {
  getHosts: (page_number) => apiInstance2(`admin/agents/${page_number}`),
  getHostListings: (data, page_number) =>
    apiInstance2(`admin/agent/shortlets/${page_number}`, {
      method: "POST",
      body: data,
    }),
  getHostsById: (agent_id) => apiInstance2(`admin/agent/one/${agent_id}`),

  getHostBookings: (data, page_number) =>
    apiInstance2(`admin/agent/bookings/${page_number}`, {
      method: "POST",
      body: data,
    }),

  blockHost: (data) =>
    apiInstance2("admin/block/agent", {
      method: "POST",
      body: data,
    }),
  blockListing: (data) =>
    apiInstance2("admin/block/shortlet", {
      method: "POST",
      body: data,
    }),
  acceptOrRejectHost: (data) =>
    apiInstance2("admin/agent/status", {
      method: "POST",
      body: data,
    }),

  acceptOrRejectListing: (data) =>
    apiInstance2("admin/shortlet/status", {
      method: "POST",
      body: data,
    }),
};

export default apis;
