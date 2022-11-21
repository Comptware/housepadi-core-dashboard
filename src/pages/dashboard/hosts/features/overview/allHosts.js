import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { determineHostType } from "utils/hosts";
import { pageCount } from "utils/constants";
import Table from "components/general/table";
import CircleLoader from "components/general/circleLoader/circleLoader";
import HostStore from "../../store/index";
import Pagination from "components/general/pagination";

const listingsHead = ["HOST", "STATUS", "PHONE", "EMAIL"];
const AllHosts = observer(({ data }) => {
  const navigate = useNavigate();
  const { loading, hostCount, getHosts } = HostStore;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    currentPage > 1 && getHosts(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-3 sm:p-6 max-h-fit ">
      <Table head={listingsHead}>
        {data?.map(
          (
            {
              id,
              first_name,
              last_name,
              phone_number,
              email,
              agent_verified_status,
            },
            i
          ) => {
            const tdClass = "max-h-fit border-b-1/2 border-grey-border";
            return (
              <tr
                className="py-4 bg-white w-full transition-all hover:bg-grey-light duration-300 ease-in-out cursor-pointer"
                key={i + id}
                onClick={() => navigate(id)}
              >
                <td className={tdClass}>
                  <span className="text-sm text-grey-textalt capitalize">
                    {first_name} {last_name}
                  </span>
                </td>
                <td className={tdClass}>
                  {determineHostType(agent_verified_status)}
                </td>

                <td className={tdClass}>
                  <span className="text-sm text-black">{phone_number}</span>
                </td>
                <td className={tdClass}>
                  <span className="text-sm text-black">{email}</span>
                </td>
              </tr>
            );
          }
        )}
        {loading && (
          <div className="absolute w-full flex justify-center items-center h-[100px]">
            <CircleLoader blue />
          </div>
        )}
      </Table>
      <Pagination
        pageCount={Number(hostCount) / pageCount}
        onPageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />
      <div className="w-full min-h-[400px]" />
    </div>
  );
});
AllHosts.propTypes = {
  data: PropTypes.array,
};
export default AllHosts;
