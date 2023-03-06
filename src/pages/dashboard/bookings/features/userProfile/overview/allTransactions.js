import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { ReactComponent as Location } from "assets/icons/location.svg";
import { determineListingType } from "utils/listings";
import { pageCount } from "utils/constants";
import { Button } from "components/general/button";
import Table from "components/general/table";
import CircleLoader from "components/general/circleLoader/circleLoader";
import ListingStore from "pages/dashboard/listings/store";
import Pagination from "components/general/pagination";

const listingsHead = ["LISTING", "DATE", "NIGHTS", "PAYMENT"];
const AllTransactions = observer(({ data }) => {
  const navigate = useNavigate();
  const { loading, listingsCount, getListings } = ListingStore;

  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   currentPage > 1 && getListings(currentPage);
  // }, [currentPage]);

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-3 sm:p-6 max-h-fit ">
      <Table head={listingsHead}>
        {loading && (
          <div className="absolute w-full flex justify-center items-center h-[100px]">
            <CircleLoader blue />
          </div>
        )}

        {data.map(
          (
            {
              id,
              images,
              name,
              number_of_bedrooms,
              number_of_bathrooms,
              address,
              status,
            },
            i
          ) => {
            const tdClass = "max-h-fit border-b-1/2 border-grey-border";
            return (
              <tr className="py-4 bg-white w-full" key={i + id}>
                <td className={tdClass}>
                  <div className="flex flex-col justify-start items-start space-y-2">
                    <div
                      className="w-[149px] h-[91px] rounded-lg bg-no-repeat bg-center bg-cover"
                      style={{
                        backgroundImage: `url(${images && images[0]})`,
                      }}
                    />
                    <span className="text-xl text-grey-textalt">{name}</span>
                  </div>
                </td>
                <td className={tdClass}>{determineListingType(status)}</td>
                <td className={tdClass}>
                  <Button
                    small
                    text={status === "draft" ? "Complete" : "Edit"}
                    isOutline
                    borderColor="border-black"
                    textClass="text-black regular-font"
                    className="w-[112px]"
                    onClick={() => navigate(`/new-listing/step-one/${id}`)}
                  />
                </td>
                <td className={tdClass}>
                  <span className="text-sm text-black">
                    {number_of_bedrooms}
                  </span>
                </td>
                <td className={tdClass}>
                  <span className="text-sm text-black">
                    {number_of_bathrooms}
                  </span>
                </td>
                <td className={tdClass}>
                  <div className="flex justify-start items-center space-x-2">
                    <span className="w-[15px] h-[15px]">
                      <Location className="w-[15px] h-[15px]" />
                    </span>

                    <span className="text-xs text-black">{address}</span>
                  </div>
                </td>
              </tr>
            );
          }
        )}
      </Table>
      <Pagination
        pageCount={Number(listingsCount) / pageCount}
        onPageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />
      <div className="w-full min-h-[400px]" />
    </div>
  );
});
AllTransactions.propTypes = {
  data: PropTypes.array,
};
export default AllTransactions;
