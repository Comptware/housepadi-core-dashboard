import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { AiOutlineRight } from "react-icons/ai";
import AppSwitch from "components/general/switch";
import { Link } from "react-router-dom";

const SettingsHome = () => {
  const [form, setForm] = useState({
    pushNotification: false,
    chatBannerNotification: false,
    chatNotification: false,
  });

  const handleChange = (prop, val) => {
    setForm({ ...form, [prop]: val });
  };
  return (
    <section className="py-6 pl-6 pr-12">
      <div className="flex justify-between">
        <p className="text-[#211D31] text-[19px] regular-font">Settings</p>
        {/* <p className="text-[#8B8E93] flex items-center gap-1">
          <span>
            <Delete />
          </span>{" "}
          Delete Account
        </p> */}
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
            <p className="text-[19px] whitespace-nowrap">Push Notification</p>
            <AppSwitch
              checked={form.pushNotification}
              onChange={() =>
                handleChange("pushNotification", !form.pushNotification)
              }
            />
          </div>
          <div className="flex justify-between px-6 py-4 md:py-6 bg-white border-[0.5px] border-[#E7EAEE] items-center">
            <p className="text-[19px] whitespace-nowrap">
              Chat Banner Notification
            </p>
            <AppSwitch
              checked={form.chatBannerNotification}
              onChange={() =>
                handleChange(
                  "chatBannerNotification",
                  !form.chatBannerNotification
                )
              }
            />
          </div>
          <div className="flex justify-between px-6 py-4 md:py-6 bg-white border-[0.5px] border-[#E7EAEE] items-center">
            <p className="text-[19px] whitespace-nowrap">Chat Notification</p>
            <AppSwitch
              checked={form.chatNotification}
              onChange={() =>
                handleChange("chatNotification", !form.chatNotification)
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
            href="#"
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
