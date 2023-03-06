import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";
import {
  collection,
  onSnapshot,
  query,
  where,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { getUserInfoFromStorage } from "utils/storage";
import HomeStore from "pages/dashboard/home/store";
import { Button } from "components/general/button";
import { DEFAULT_AVATAR } from "utils/constants";
import { ReactComponent as Message } from "assets/icons/btn-message.svg";
import { ReactComponent as Report } from "assets/icons/report.svg";
import MessagesStore from "pages/dashboard/messages/store";
import db from "services/firebase.config";
import cleanPayload, { checkPayloadEmptyField } from "utils/cleanPayload";

const UserProfile = () => {
  const navigate = useNavigate();
  const { currentBooking } = HomeStore;
  const {
    setConversations: setStoreConversations,
    setCurrentChat,
    setCurrentChatRef,
  } = MessagesStore;
  const userInfo = getUserInfoFromStorage();

  const [loading, setLoading] = useState(true);
  const [prevConversations, setPrevConversations] = useState(null);
  const [sending, setSending] = useState(false);

  // useEffect(() => {
  //   currentBooking?.user?.id && getConversations();
  // }, [currentBooking?.user?.id]);

  const getConversations = async () => {
    setLoading(true);
    let convos = [];
    const convoRef = collection(db, "conversations");
    const q = query(convoRef, where("userId", "==", currentBooking?.user?.id));

    onSnapshot(q, (querySnapshot) => {
      convos = [];
      querySnapshot.forEach((item) => {
        convos.push(item.data());
      });
      convos = convos.sort(
        (a, b) =>
          new Date(b?.lastMessageAt?.toDate()) -
          new Date(a?.lastMessageAt?.toDate())
      );
      handleCheckExistingConvos(convos);
      setStoreConversations(convos);
      setLoading(false);
    });
  };

  const handleCheckExistingConvos = (convos) => {
    const prevConvo = convos?.find((item) => item?.agentId === userInfo.id);
    setPrevConversations(prevConvo);
    setCurrentChat(prevConvo);
  };

  const startConversation = async () => {
    setSending(true);

    try {
      const chatsRef = collection(db, "conversations");
      let payload = {
        agentId: userInfo?.id,
        agentName: userInfo?.first_name + " " + userInfo?.last_name,
        agentPhoneNumber: userInfo?.phone_number,
        agentImage: userInfo?.profile_image_url,
        userId: currentBooking?.user?.id,
        userName:
          currentBooking?.user?.first_name +
          " " +
          currentBooking?.user?.last_name,
        userPhoneNumber: currentBooking?.user?.phone_number,
        userImage: currentBooking?.user?.profile_image_url,
        lastMessageAt: Timestamp.now(),
        unreadUserChats: 0,
        unreadAgentChats: 0,
      };
      const emptyFieldFound = checkPayloadEmptyField(payload);
      if (!emptyFieldFound) {
        payload = cleanPayload(payload);
        const docRef = await addDoc(chatsRef, payload);
        setCurrentChatRef(docRef.path);
        setCurrentChat(payload);
        navigate("/dashboard/messages");
      }
    } catch (error) {
      console.log("SENDING MESSAGE ERROR", error);
    } finally {
      setSending(false);
    }
  };

  const goToConversations = () => {
    navigate("/dashboard/messages");
  };

  return (
    <div className="flex flex-col justify-start items-start w-full h-full border-r-1/2 border-grey-border py-8 px-7 space-y-2">
      <div className="flex flex-col justify-start items-start space-y-1 w-full relative pb-6">
        <div className="flex justify-start items-center w-fit space-x-6 pt-3">
          <div className="w-fit h-fit p-[4px] rounded-full border-b border-l border-green">
            <div
              className="w-[56px] h-[56px] rounded-full"
              style={{
                backgroundImage: `url(${
                  currentBooking?.user?.profile_image_url || DEFAULT_AVATAR
                })`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
              }}
            />
          </div>
          <div className="flex flex-col justify-center items-start space-y-2">
            <span className="text-base text-black regular-font">
              {" "}
              {currentBooking?.user?.first_name
                ? currentBooking?.user?.first_name +
                  " " +
                  currentBooking?.user?.last_name
                : "N/A"}{" "}
            </span>

            <span className="text-[13px] text-grey-text">
              Member since{" "}
              {moment(currentBooking?.user?.created_at).format("MMM Do, YYYY")}
            </span>
          </div>
        </div>
      </div>

      <Button
        text="Message"
        small
        icon={<Message />}
        fullWidth
        isLoading={loading || sending}
        onClick={() => {
          prevConversations ? goToConversations() : startConversation();
        }}
      />
      <Button
        isOutline
        text="Report User"
        textColor="text-red-alt"
        borderColor="border-red-alt"
        icon={<Report />}
        small
        fullWidth
      />
    </div>
  );
};

export default observer(UserProfile);
