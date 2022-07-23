export const handleFileType = (val, prop) => {
  let filesObj = {};
  if (typeof val === "string") {
    if (val?.includes(".pdf")) {
      filesObj = {
        [prop]: {
          type: "pdf",
          url: val,
        },
      };
    } else {
      filesObj = {
        [prop]: {
          type: "image",
          url: val,
        },
      };
    }
  } else if (val?.name) {
    if (val?.name?.includes(".pdf")) {
      filesObj = {
        [prop]: {
          type: "pdf",
          url: URL.createObjectURL(val),
        },
      };
    } else {
      filesObj = {
        [prop]: {
          type: "image",
          url: URL.createObjectURL(val),
        },
      };
    }
  }

  return filesObj;
};
