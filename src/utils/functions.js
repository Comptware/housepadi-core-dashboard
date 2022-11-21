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

export const extractFileNameFromUrl = (image) => {
  let filename = "";
  if (image?.name) {
    filename = image?.name;
  } else if (image && typeof image === "string") {
    const startIndex = image?.lastIndexOf("/") + 1;
    const endIndex = image?.length;
    filename = image?.slice(startIndex, endIndex);
  } else {
    filename = "Image";
  }
  return filename;
};
export const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
});
