const { default: axios } = require("axios");

const PAYSTACK_SECRET_KEY = process.env.REACT_APP_PAYSTACK_SECRET_KEY;
export const getPaystackData = async (url) => {
  return axios
    .get("https://api.paystack.co" + url, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    })
    .then((response) => {
      return response;
    });
};
