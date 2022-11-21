import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";

import { ReactComponent as Delete } from "assets/icons/delete.svg";
import AppSwitch from "components/general/switch";
import SettingsStore from "../store";

const SettingsHome = () => {
  const [form, setForm] = useState({
    push_notification: false,
    chat_banner_notification: false,
    chat_notification: false,
  });
  const [loadingStates, setLoadingStates] = useState([]);
  const { getSettings, settings, updateLoading, updateSettings } =
    SettingsStore;

  useEffect(() => {
    getSettings();
  }, []);

  useEffect(() => {
    handleFormUpdate();
  }, [settings]);

  const handleFormUpdate = () => {
    setForm({
      push_notification: settings?.push_notification,
      chat_banner_notification: settings?.chat_banner_notification,
      chat_notification: settings?.chat_notification,
    });
  };

  const updateSetting = async (prop, val) => {
    setLoadingStates((prev) => [...prev, prop]);
    await updateSettings({ [prop]: val });
    setLoadingStates((prev) => prev.filter((state) => state != prop));
  };
  return (
    <section className="py-6 pl-6 pr-6 sm:pr-12">
      <div className="flex justify-between">
        <p className="text-[#211D31] text-[19px] regular-font">Settings</p>
        <p className="text-[#8B8E93] flex items-center gap-1">
          <span>
            <Delete />
          </span>{" "}
          Delete Account
        </p>
      </div>

      <br />

      <main className="flex flex-col gap-6 text-black regular-font">
        <Link className="flex flex-col gap-3" to="/dashboard/me">
          <h3 className="text-[#ADB1B8] text-[14px]">ACCOUNT</h3>
          <div className="flex justify-between px-6 py-4 md:py-6 bg-white border-[0.5px] border-[#E7EAEE] items-center">
            <p className="text-[19px]">Edit Profile</p>
            <span>
              <AiOutlineRight size={16} />
            </span>
          </div>
        </Link>

        <div className="flex flex-col gap-3">
          <h3 className="text-[#ADB1B8] text-[14px]">NOTIFICATION</h3>

          <div className="flex justify-between px-6 py-4 md:py-6 bg-white border-[0.5px] border-[#E7EAEE] items-center">
            <p className="text-[19px] whitespace-nowrap">Chat Notification</p>
            <AppSwitch
              checked={form.chat_notification}
              onChange={() =>
                updateSetting("chat_notification", !form.chat_notification)
              }
              loading={
                updateLoading && loadingStates.includes("chat_notification")
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[#ADB1B8] text-[14px]">TERMS AND SUPPORT</h3>
          <a
            href="https://getzusco.com/platform/terms"
            target="_blank"
            rel="noreferrer"
            className="flex justify-between px-6 py-4 md:py-6 bg-white border-[0.5px] border-[#E7EAEE] items-center"
          >
            <p className="text-[19px]">Terms and Conditions</p>
            <span>
              <AiOutlineRight size={16} />
            </span>
          </a>

          <a
            href="https://getzusco.com/platform/privacy-policy"
            target="_blank"
            rel="noreferrer"
            className="flex justify-between px-6 py-4 md:py-6 bg-white border-[0.5px] border-[#E7EAEE] items-center"
          >
            <p className="text-[19px]">Privacy Policy</p>
            <span>
              <AiOutlineRight size={16} />
            </span>
          </a>

          <a
            href="mailto:info@getzusco.com"
            target="_blank"
            rel="noreferrer"
            className="flex justify-between px-6 py-4 md:py-6 bg-white border-[0.5px] border-[#E7EAEE] items-center"
          >
            <p className="text-[19px]">Support & F.A.Q</p>
            <span>
              <AiOutlineRight size={16} />
            </span>
          </a>
        </div>
      </main>
    </section>
  );
};

export default observer(SettingsHome);
