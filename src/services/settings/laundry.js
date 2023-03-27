import { apiInstance2 } from "utils/apiInstance";

const apis = {
  // laundryItems
  getLaundries: (pageNumber) => apiInstance2(`laundryItems/all/${pageNumber}`),
  createLaundry: (data) =>
    apiInstance2("laundryItems", {
      method: "POST",
      body: data,
    }),
  updateLaundry: (data) =>
    apiInstance2(`laundryItems`, {
      method: "PATCH",
      body: data,
    }),
  deleteLaundry: (id) =>
    apiInstance2(`laundryItems/${id}`, {
      method: "DELETE",
    }),
  //   laundry-types
  getLaundryTypes: (pageNumber) =>
    apiInstance2(`laundry-types/all/${pageNumber}`),
  createLaundryType: (data) =>
    apiInstance2("laundry-types", {
      method: "POST",
      body: data,
    }),
  updateLaundryType: (data) =>
    apiInstance2(`laundry-types/`, {
      method: "PATCH",
      body: data,
    }),
  deleteLaundryType: (id) =>
    apiInstance2(`laundry-types/${id}`, {
      method: "DELETE",
    }),
};

export default apis;
