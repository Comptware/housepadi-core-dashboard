import { apiInstance2 } from "utils/apiInstance";

const apis = {
  login: (data) =>
    apiInstance2("auth/admin/login-user", {
      method: "POST",
      body: data,
    }),
};

export default apis;
