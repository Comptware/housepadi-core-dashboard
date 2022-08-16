const cleanPayload = (payload) => {
  Object.keys(payload).forEach((key) => {
    if (
      (!payload[key] || payload[key] === {}) &&
      payload[key] !== false &&
      payload[key] !== 0
    ) {
      delete payload[key];
    }
  });
  return payload;
};
export default cleanPayload;
