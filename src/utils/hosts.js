export const determineHostType = (type) => {
  if (type) {
    if (type.includes("completed")) {
      return (
        <div className="py-2 px-0 w-fit whitespace-nowrap">
          <span className="p-1 bg-green-light text-green-deep border-1/2 border-green-deep rounded">
            Accepted
          </span>
        </div>
      );
    } else if (type.includes("rejected")) {
      return (
        <div className="py-2 px-0 w-fit whitespace-nowrap">
          <span className="p-1 bg-red-light text-red-deep border-1/2 border-red-deep rounded">
            Rejected
          </span>
        </div>
      );
    } else if (type.includes("in-progress")) {
      return (
        <div className="py-2 px-0 w-fit whitespace-nowrap">
          <span className="p-1 bg-yellow-light text-yellow border-1/2 border-yellow rounded">
            in-progress
          </span>
        </div>
      );
    } else if (type.includes("pending")) {
      return (
        <div className="py-2 px-0 w-fit whitespace-nowrap">
          <span className="p-1 bg-blue-backdrop text-blue border-1/2 border-blue rounded">
            Pending
          </span>
        </div>
      );
    }

    return "";
  }

  return "";
};
