export const determinePaymentStatus = (paid) => {
  if (paid) {
    return (
      <div className="py-2 px-0 w-full text-sm">
        <span className="p-1 bg-green-light text-green-deep border-1/2 border-green-deep rounded">
          paid
        </span>
      </div>
    );
  } else {
    return (
      <div className="py-2 px-0 w-full text-sm">
        <span className="p-1 bg-red-light text-red-deep border-1/2 border-red-deep rounded">
          unpaid
        </span>
      </div>
    );
  }
};
