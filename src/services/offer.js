import { apiInstance2 } from "utils/apiInstance";

const apis = {
  // offers
  getOffers: (pageNumber) => apiInstance2(`offers/all/${pageNumber}`),
  createOffer: (data) =>
    apiInstance2("offers", {
      method: "POST",
      body: data,
    }),
  updateOffer: (data) =>
    apiInstance2(`offers`, {
      method: "PATCH",
      body: data,
    }),
  deleteOffer: (id) =>
    apiInstance2(`offers/${id}`, {
      method: "DELETE",
    }),
};

export default apis;
