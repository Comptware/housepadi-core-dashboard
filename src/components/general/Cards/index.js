import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { observer } from "mobx-react-lite";

import { ORDER_STATUSES, ORDER_STATUS_OPTIONS } from "utils/constants";
import Select from "components/general/input/select";
import { numberWithCommas } from "utils/formatter";
import MealOrdersStore from "pages/dashboard/meal-orders/store";
import DeleteModal from "../Modal/deleteModal";

const { INPROGRESS, PENDING, COMPLETED, CANCELLED } = ORDER_STATUSES;

const OrderCard = ({ data, type, cardStatus, pageNumber, getPayload }) => {
  console.log("data in card: ", data?.userRequest?.code, " : ", data?.status);
  const { userRequest, status, meals } = data;
  console.log("data in card destructure: ", userRequest?.code, " : ", status);
  const { updateOrder, updateOrdersLoading } = MealOrdersStore;

  const orderStatusMatch = ORDER_STATUS_OPTIONS.find(
    ({ value }) => value === status
  );

  const [orderStatus, setOrderStatus] = useState(orderStatusMatch);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleUpdateOrder = () => {
    const payload = {
      id: data?.id,
      status: deleteModal ? CANCELLED : orderStatus.value,
      requestType: type,
    };
    updateOrder({
      payload,
      status: cardStatus,
      pageNumber,
      getPayload,
      callbackFunc: () => setDeleteModal(false),
    });
  };

  useEffect(() => {
    if (orderStatus?.value === orderStatusMatch?.value) return;
    if (orderStatus?.value === ORDER_STATUSES.CANCELLED) {
      setDeleteModal(true);
    } else {
      handleUpdateOrder();
    }
  }, [orderStatus]);

  useEffect(() => {
    setOrderStatus(orderStatusMatch);
  }, [orderStatusMatch, data]);

  const orderIsCancelled = orderStatus?.value === CANCELLED;
  const orderIsCompleted = orderStatus?.value === COMPLETED;
  const orderCancellingDisabled = orderIsCancelled || orderIsCompleted;
  return (
    <>
      <div className="mr-[20px] border border-[#e0e0e0] rounded-[8px] min-w-[389px] max-w-[389px] px-[16px] py-[12px]">
        <div className="border-b pb-[16px] border-[#E0E0E0]">
          <div className="flex justify-between">
            <div>
              <div className="text-[#2d2d2d] uppercase">
                {userRequest?.code}
              </div>
              <div className="text-[12px] text-[#ACACAC]">
                {userRequest?.user?.name}
              </div>
            </div>
            <div>
              <Select
                placeholder="Set status"
                options={ORDER_STATUS_OPTIONS}
                onChange={(val) => setOrderStatus(val)}
                value={orderStatus}
                style={orderStatus}
                isDisabled={updateOrdersLoading}
                isLoading={updateOrdersLoading}
              />
            </div>
          </div>
          <div className="mt-[16px] flex flex-col gap-1 justify-start items-start bg-[#E5F5FB] p-[8px] rounded-[4px]">
            <div className="flex justify-start text-[12px] gap-0.5">
              <span className="text-[#acacac]">Address: </span>
              <div className="text-black font-medium ">
                {userRequest?.user?.addressText || "N/A"}
              </div>
            </div>

            <div className="text-[#acacac] text-base">
              Delivery Date:{" "}
              <span className="text-black font-medium">
                {moment(data?.deliveryDateTime).format("DD MMM YYYY HH:MM A")}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between pt-[16px]">
            <div className="text-[#909090] text-[14px]">Order Details</div>
            <div className="text-[12px]">
              {moment(data?.createdAt).fromNow()}
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-start mt-4 max-h-[180px] gap-2 overflow-y-auto">
            {type === "MEAL" &&
              meals?.map(({ quantity, meal }, i) => (
                <div
                  className="flex pb-[16px] justify-between w-full"
                  key={i + 1}
                >
                  <div className="flex gap-[28px] w-full">
                    <div className="text-[#C30D21] font-medium">
                      {quantity}x
                    </div>
                    <div className="text-[12px]">
                      <div className="text-black">{meal.name}</div>
                      <div className="text-[#757575] w-[80%]">Type:</div>
                      <div className="text-[#757575] w-[80%]">Category:</div>
                    </div>
                  </div>
                  <div className="text-xs">
                    NGN {numberWithCommas(meal.price)}
                  </div>
                </div>
              ))}

            {type === "LAUNDRY" && (
              <div className="flex flex-col pb-[16px] justify-start items-start w-full gap-2 ">
                <div className="text-[#757575] text-sm">
                  Number of Laundry Bags:{" "}
                  <span className="text-[#C30D21] font-medium text-xl">
                    {numberWithCommas(data?.noOfLaundryBags)}
                  </span>{" "}
                </div>

                <div className="text-[#757575] text-sm">
                  Laundry Type:{" "}
                  <span className="text-[#757575] text-xl lowercase ">
                    {data?.dryCleaningType}
                  </span>
                </div>

                <div className="text-[#757575] text-sm">
                  Laundry Schedule Type:{" "}
                  <span className="text-[#757575] text-xl lowercase ">
                    {data?.userRequest?.laundryRequestScheduleType}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex border-[#e0e0e0] border-t pt-[16px] items-center justify-between">
            <div>
              <div className="text-[13px] text-[#acacac]">Total</div>
              <div className="mt-[8px] text-[22px] font-bold">
                NGN {numberWithCommas(userRequest?.totalAmount)}
              </div>
            </div>

            {!orderCancellingDisabled && (
              <button
                type="button"
                className="border text-red border-red rounded-full py-1 flex flex-col justify-center items-center px-5"
                onClick={() => setDeleteModal(true)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
      <DeleteModal
        active={deleteModal}
        handleDelete={handleUpdateOrder}
        isDeleting={updateOrdersLoading}
        onClose={() => {
          setOrderStatus(orderStatusMatch);
          setDeleteModal(false);
        }}
        title={`You are about to cancel ${userRequest?.user?.name}'s order "${userRequest?.code}"`}
        text={`This order will be removed from pending orders, Are you sure?`}
        actionText="Cancel Order"
        closeText="Close"
      />
    </>
  );
};
OrderCard.propTypes = {
  data: PropTypes.object,
  type: PropTypes.oneOf(["MEAL", "LAUNDRY"]),
  cardStatus: PropTypes.oneOf([
    INPROGRESS,
    PENDING,
    COMPLETED,
    CANCELLED,
    "all",
  ]),
  pageNumber: PropTypes.number,
  getPayload: PropTypes.object,
};
export default observer(OrderCard);
