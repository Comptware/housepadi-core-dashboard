export const determineListingType = (type) => {
  if (type) {
    if (type.includes("unoccupied")) {
      return (
        <div className="py-2 px-0 w-full">
          <span className="p-1 bg-green-light text-green-deep border-1/2 border-green-deep rounded">
            Unoccupied
          </span>
        </div>
      );
    } else if (type.includes("draft")) {
      return (
        <div className="py-2 px-0 w-full">
          <span className="p-1 bg-red-light text-red-deep border-1/2 border-red-deep rounded">
            Draft
          </span>
        </div>
      );
    } else if (type.includes("occupied")) {
      return (
        <div className="py-2 px-0 w-full">
          <span className="p-1 bg-blue-light text-blue-deep border-1/2 border-blue-deep rounded">
            Occupied
          </span>
        </div>
      );
    }

    return "";
  }

  return "";
};
