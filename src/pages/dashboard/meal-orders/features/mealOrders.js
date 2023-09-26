import React, { useEffect, useMemo, useState, useRef } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { MdRefresh } from "react-icons/md";
import { ReactComponent as RightArrow } from "assets/icons/arrow/chevron-right.svg";
import Select from "components/general/input/select";
import CircleLoader from "components/general/circleLoader/circleLoader";
import { filterRangeOptions } from "utils/date";
import OrderCard from "components/general/Cards";
import { ORDER_STATUSES, pageCount } from "utils/constants";
import DateModal from "components/general/Modal/dateModal";
import Pagination from "components/general/pagination";
import MealOrdersStore from "../store";
import UserModal from "components/general/Modal/userModal";

const { INPROGRESS, PENDING, COMPLETED, CANCELLED } = ORDER_STATUSES;
const MealOrders = ({ status = "all" }) => {
  const {
    getOrders,
    getOrdersLoading,
    orders,
    inProgressOrders,
    pendingOrders,
    completedOrders,
    cancelledOrders,
    ordersCount,
    completedOrdersCount,
    pendingOrdersCount,
    cancelledOrdersCount,
    inProgressOrdersCount,
  } = MealOrdersStore;
  const ref = useRef(null);
  const [dateFilter, setDateFilter] = useState([filterRangeOptions[0]]);
  const [dateFilters, setDateFilters] = useState(filterRangeOptions);
  const [showDateModal, setShowDateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);

  const handleGetOrders = ({ page, date }, isRefresh) => {
    const startDate = date?.[0]?.startDate || dateFilter?.[0]?.startDate;
    const endDate = date?.[0]?.endDate || dateFilter?.[0]?.endDate;
    isRefresh && setCurrentPage(1);
    dateFilter?.[0]?.startDate &&
      getOrders({
        pageNumber: page || currentPage,
        status,
        payload: {
          startDate,
          endDate,
        },
      });
  };

  useEffect(() => {
    setCurrentPage(1);
    setDateFilter([filterRangeOptions[0]]);
    handleGetOrders({ page: 1, date: [filterRangeOptions[0]] });
  }, [status]);

  const scroll = (direction) => {
    if (direction === "left") {
      ref.current.scrollLeft -= 410;
    } else {
      ref.current.scrollLeft += 410;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleGetOrders({ page });
  };
  const handleDateChange = (val) => {
    setDateFilter(val);
    handleGetOrders({ date: val, page: 1 });
  };

  const handleDateFilterchange = (val) => {
    if (
      moment(val[0]?.endDate).valueOf() !== moment(val[0]?.startDate).valueOf()
    ) {
      handleUpdateDateFilters(val);
    }
  };
  const handleUpdateDateFilters = (date) => {
    const dateVal = date[0] || dateFilter[0];
    const dateRange = `${moment(dateVal.startDate).format(
      "DD MMM YY"
    )} - ${moment(dateVal.endDate).format("DD  MMM YY")}`;
    const newDateFilter = {
      ...dateVal,
      value: dateRange,
      label: dateRange,
      type: "custom",
    };
    handleDateChange([newDateFilter]);
    setDateFilters([...filterRangeOptions, newDateFilter]);
    setShowDateModal(false);
  };

  const data = useMemo(() => {
    switch (status) {
      case INPROGRESS:
        return { orders: inProgressOrders, count: inProgressOrdersCount };
      case PENDING:
        return { orders: pendingOrders, count: pendingOrdersCount };
      case COMPLETED:
        return { orders: completedOrders, count: completedOrdersCount };
      case CANCELLED:
        return { orders: cancelledOrders, count: cancelledOrdersCount };
      default:
        return { orders, count: ordersCount };
    }
  }, [getOrdersLoading, status]);

  return (
    <div className="p-3 sm:p-6 min-h-[100vh] relative">
      <div className="flex justify-between items-center mb-5">
        <Select
          placeholder="Filter by date"
          value={dateFilter}
          onChange={(val) => {
            if (val?.value === "custom") {
              setShowDateModal(true);
            } else {
              handleDateChange([val]);
            }
          }}
          options={dateFilters}
        />
        <div className="flex flex-col items-end justify-start mb-[10px] gap-2 pr-[25px]">
          <div className="flex items-center justify-end gap-[5px]">
            <div
              onClick={() => scroll("left")}
              className="transform rotate-180 bg-[#DEDEDE] text-[15px] rounded-full py-[7px] px-[7px] cursor-pointer"
            >
              <RightArrow className="w-[20px] h-[20px]" />
            </div>
            <div
              onClick={() => scroll("right")}
              className="bg-[#DEDEDE] gap-[10px] text-[15px] items-center flex rounded-full py-[8px] px-[16px] cursor-pointer"
            >
              <div>Next</div>
              <div>
                <RightArrow className="w-[20px] h-[20px]" />
              </div>
            </div>
          </div>

          <button
            onClick={() => handleGetOrders({ page: 1 }, true)}
            className="flex justify-start items-center text-black underline text-sm pr-3 gap-x-1"
            type="button"
          >
            Refresh
            <MdRefresh
              className={`text-grey ${getOrdersLoading && " animate-spin "} `}
            />
          </button>
        </div>
      </div>
      {getOrdersLoading && (
        <div className="absolute w-fit flex justify-center items-center h-[100px] top-1 mx-auto left-0 right-0 z-20">
          <CircleLoader blue />
        </div>
      )}
      <div
        className="flex pb-5 overflow-x-scroll scrolling scroll-smooth"
        ref={ref}
      >
        {data?.orders?.map((order, i) => (
          <OrderCard
            key={i + 1}
            data={order}
            type="MEAL"
            cardStatus={status}
            pageNumber={1}
            onUserClick={(e) => {
              setCurrentUser(e);
            }}
            getPayload={{
              startDate: dateFilter?.[0]?.startDate,
              endDate: dateFilter?.[0]?.endDate,
            }}
          />
        ))}
      </div>

      <Pagination
        pageCount={Number(data?.count) / pageCount}
        onPageChange={(page) => handlePageChange(page)}
        currentPage={currentPage}
      />
      <DateModal
        toggleModal={() => setShowDateModal(false)}
        active={showDateModal}
        onChange={(item) => handleDateFilterchange([item.selection])}
        ranges={dateFilter}
      />
      <UserModal
        details={currentUser}
        active={!!currentUser}
        toggleModal={() => setCurrentUser(null)}
      />
    </div>
  );
};
MealOrders.propTypes = {
  status: PropTypes.string,
};
export default observer(MealOrders);
