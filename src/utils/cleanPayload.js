const cleanPayload = (payload) => {
  Object.keys(payload).forEach((key) => {
    if ((!payload[key] || payload[key] === {}) && payload[key] !== false) {
      delete payload[key];
    }
  });
  return payload;
};
export default cleanPayload;
