import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { pageCount } from "utils/constants";
import Table from "components/general/table";
import CircleLoader from "components/general/circleLoader/circleLoader";
import UserStore from "../../store/index";
import Pagination from "components/general/pagination";

const listingsHead = ["USER", "PHONE", "EMAIL"];
const AllUsers = observer(({ data }) => {
  const navigate = useNavigate();
  const { loading, userCount, getUsers } = UserStore;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    currentPage > 1 && getUsers(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-3 sm:p-6 max-h-fit ">
      <Table head={listingsHead}>
        {data?.map(({ id, first_name, last_name, phone_number, email }, i) => {
          const tdClass = "max-h-fit border-b-1/2 border-grey-border";
          return (
            <tr
              className="py-4 bg-white w-full transition-all hover:bg-grey-light duration-300 ease-in-out cursor-pointer"
              key={i + id}
              onClick={() => navigate(id)}
            >
              <td className={tdClass}>
                <span className="text-sm text-grey-textalt capitalize">
                  {first_name ? `${first_name} ${last_name}` : "N/A"}
                </span>
              </td>

              <td className={tdClass}>
                <span className="text-sm text-black">{phone_number}</span>
              </td>
              <td className={tdClass}>
                <span className="text-sm text-black">{email || "N/A"}</span>
              </td>
            </tr>
          );
        })}
        {loading && (
          <div className="absolute w-full flex justify-center items-center h-[100px]">
            <CircleLoader blue />
          </div>
        )}
      </Table>
      <Pagination
        pageCount={Number(userCount) / pageCount}
        onPageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />
      <div className="w-full min-h-[400px]" />
    </div>
  );
});
AllUsers.propTypes = {
  data: PropTypes.array,
};
export default AllUsers;
