import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { ReactComponent as Location } from "assets/icons/location.svg";
import { determineListingType } from "utils/listings";
import { pageCount } from "utils/constants";
import { Button } from "components/general/button";
import Table from "components/general/table";
import CheckBox from "components/general/input/checkBox";
import CircleLoader from "components/general/circleLoader/circleLoader";
import ListingStore from "../../store/index";
import Pagination from "components/general/pagination";

const listingsHead = [
  "",
  "LISTING",
  "STATUS",
  "ACTIONS",
  "BED",
  "BATHROOM",
  "LOCATION",
];
const AllListings = observer(({ data }) => {
  const navigate = useNavigate();
  const { loading, listingsCount, getListings, listings } = ListingStore;
  const listTopRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   handleGlobalCheckboxChange();
  // }, [checked]);

  // useEffect(() => {
  //   getListings(currentPage);
  // }, [currentPage]);

  const handleCheckboxChange = (item) => {
    let newArr = [...selectedRows, item];
    newArr = [...new Set(newArr)];
    const match = selectedRows?.find((el) => el === item);
    if (match) {
      newArr = newArr.filter((itm) => itm !== item);
    }
    setSelectedRows(newArr);
  };

  const handleGlobalCheckboxChange = () => {
    const newArr = checked ? data?.map(({ id }) => id) : [];
    setSelectedRows(newArr);
  };

  useEffect(() => {
    return scrollToListTop();
  }, [listings]);

  const scrollToListTop = () => listTopRef?.current?.scrollIntoView();
  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-3 sm:p-6 max-h-fit ">
      <div ref={listTopRef} />
      <Table
        head={listingsHead}
        checked={checked}
        onClick={() => setChecked((prev) => !prev)}
      >
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
            const isSelected = selectedRows.find((row) => row === id);
            const tdClass = "max-h-fit border-b-1/2 border-grey-border";
            return (
              <tr
                className="py-4 bg-white w-full hover:bg-grey-light duration-300 ease-in-out cursor-pointer"
                key={i + id}
              >
                <td className={tdClass}>
                  <CheckBox
                    checked={!!isSelected}
                    onClick={() => handleCheckboxChange(id)}
                  />
                </td>
                <td
                  className={tdClass}
                  onClick={() => navigate(`/new-listing/step-one/${id}`)}
                >
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
                <td
                  className={tdClass}
                  onClick={() => navigate(`/new-listing/step-one/${id}`)}
                >
                  {determineListingType(status)}
                </td>
                <td
                  className={tdClass}
                  onClick={() => navigate(`/new-listing/step-one/${id}`)}
                >
                  <Button
                    small
                    text={"Edit"}
                    isOutline
                    borderColor="border-black"
                    textClass="text-black regular-font"
                    className="w-[112px]"
                    onClick={() => console.log("hef")}
                  />
                </td>
                <td
                  className={tdClass}
                  onClick={() => navigate(`/new-listing/step-one/${id}`)}
                >
                  <span className="text-sm text-black">
                    {number_of_bedrooms}
                  </span>
                </td>
                <td
                  className={tdClass}
                  onClick={() => navigate(`/new-listing/step-one/${id}`)}
                >
                  <span className="text-sm text-black">
                    {number_of_bathrooms}
                  </span>
                </td>
                <td
                  className={tdClass}
                  onClick={() => navigate(`/new-listing/step-one/${id}`)}
                >
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
        {loading && (
          <div className="absolute w-full flex justify-center items-center h-[100px]">
            <CircleLoader blue />
          </div>
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
AllListings.propTypes = {
  data: PropTypes.array,
};
export default AllListings;
