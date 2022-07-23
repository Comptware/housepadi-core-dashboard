const cleanPayload = (payload) => {
  Object.keys(payload).forEach((key) => {
    if (payload[key] === false) {
      return;
    } else {
      if (!payload[key] || payload[key] === {}) {
        delete payload[key];
      }
    }
  });
  return payload;
};
export default cleanPayload;
