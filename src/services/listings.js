import { apiInstance2 } from "utils/apiInstance";

const apis = {
  createListing: (data) =>
    apiInstance2("shortlet", {
      method: "POST",
      body: data,
    }),

  deleteListing: (shortlet_id) =>
    apiInstance2(`shortlet/${shortlet_id}`, {
      method: "DELETE",
    }),

  getListings: (page_number) => apiInstance2(`agent/shortlet/${page_number}`),

  updateListing: (data, shortlet_id) =>
    apiInstance2(`shortlet/${shortlet_id}`, {
      method: "PUT",
      body: data,
    }),

  getAAR: () => apiInstance2("shortlet/aar", { internal: true }),
};

export default apis;
