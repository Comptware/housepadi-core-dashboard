import { apiInstance2 } from "utils/apiInstance";

const apis = {
  login: (data) =>
    apiInstance2("internal/login/zusco", {
      method: "POST",
      body: data,
      internal: true,
    }),
};

export default apis;
