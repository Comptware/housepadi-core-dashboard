import { apiInstance2 } from "utils/apiInstance";

const apis = {
  // notifications
  getNotifications: (pageNumber) =>
    apiInstance2(`notifications/all/${pageNumber}`),
  createNotification: (data) =>
    apiInstance2("notifications", {
      method: "POST",
      body: data,
    }),
  updateNotification: (data) =>
    apiInstance2(`notifications`, {
      method: "PATCH",
      body: data,
    }),
  deleteNotification: (id) =>
    apiInstance2(`notifications/${id}`, {
      method: "DELETE",
    }),
};

export default apis;
