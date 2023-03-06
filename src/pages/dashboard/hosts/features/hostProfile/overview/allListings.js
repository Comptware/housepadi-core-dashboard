import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as Location } from "assets/icons/location.svg";
import { determineListingType } from "utils/listings";
import { pageCount } from "utils/constants";
import { Button } from "components/general/button";
import Table from "components/general/table";
import CircleLoader from "components/general/circleLoader/circleLoader";
import Pagination from "components/general/pagination";
import { findPath } from "utils/findPath";
import { determineHostType } from "utils/hosts";
import HostStore from "../../../store";
import moment from "moment";
import HostListingModal from "../hostListingModal";

const listingsHead = ["LISTING", "STATUS", "DATE CREATED", "ACTION", "ADDRESS"];
const AllListings = () => {
  const location = useLocation();
  const { path } = findPath(location, "/dashboard/agents");
  const {
    hostListingsLoading,
    hostListingsCount,
    getHostListings,
    hostListings,
  } = HostStore;

  const [currentPage, setCurrentPage] = useState(1);
  const [activeData, setActiveData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // useEffect(() => {
  //   getHostListings({ agent_id: path }, currentPage);
  // }, [currentPage]);

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-3 sm:p-6 max-h-fit ">
      <Table
        head={
          hostListings?.length < 1 && !hostListingsLoading ? null : listingsHead
        }
        title="Listings"
      >
        {hostListingsLoading && (
          <div className="absolute w-full flex justify-center items-center h-[100px]">
            <CircleLoader blue />
          </div>
        )}

        {hostListings?.map(
          (
            {
              id,
              images,
              name,
              address,
              status,
              shortlet_verified_status,
              created_at,
              blocked,
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
                <td className={tdClass}>
                  {determineHostType(shortlet_verified_status)}
                </td>

                <td className={tdClass}>
                  <span className="text-xs text-black">
                    {moment(created_at).format("DD/MM/YYYY")}
                  </span>
                </td>
                <td className={tdClass}>
                  <Button
                    small
                    text="Manage"
                    isOutline
                    borderColor="border-black"
                    textClass="text-black regular-font"
                    className="w-[112px]"
                    onClick={() => {
                      setActiveData({
                        id,
                        name,
                        blocked,
                        shortlet_verified_status,
                      });
                      setShowModal(true);
                    }}
                  />
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
        pageCount={Number(hostListingsCount) / pageCount}
        onPageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />
      <div className="w-full min-h-[400px]" />

      {showModal && (
        <HostListingModal
          handleOk={() => setShowModal(false)}
          data={activeData}
          page_number={currentPage}
        />
      )}
    </div>
  );
};

export default observer(AllListings);
