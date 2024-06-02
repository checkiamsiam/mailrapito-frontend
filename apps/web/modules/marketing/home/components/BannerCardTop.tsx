import ArrowDownIcon from "@shared/icons/ArrowDownIcon";
import BellIcon from "@shared/icons/BellIcon";
import CopyIcon from "@shared/icons/CopyIcon";
import DeleteIcon2 from "@shared/icons/DeleteIcon2";
import ForwardIcon from "@shared/icons/ForwardIcon";
import HistoryIcon from "@shared/icons/HistoryIcon";
import PlusIcon from "@shared/icons/PlusIcon";
import QRCodeIcon from "@shared/icons/QRCodeIcon";
import RandomIcon from "@shared/icons/RandomIcon";
import RefreshIcon2 from "@shared/icons/RefreshIcon2";
import SMSIcon from "@shared/icons/SMSIcon";
import React from "react";

const BannerCardTop = () => {
  const actions = [
    {
      text: "Refresh",
      icon: RefreshIcon2,
      highlighted: true,
    },
    {
      text: "Random",
      icon: RandomIcon,
    },
    {
      text: "Custom",
      icon: PlusIcon,
    },
    {
      text: "Forward",
      icon: ForwardIcon,
    },
    {
      text: "Delete",
      icon: DeleteIcon2,
    },
  ];
  return (
    <div className="p-2 lg:p-5">
      {/* Notification Icon */}
      <div className="flex justify-end">
        <div className="relative rounded-lg bg-[#F8F9FA] p-2">
          <BellIcon />
          <div className="bg-primary absolute right-[1px] top-[1px] grid h-5 w-5 place-items-center rounded-full border-2 border-white text-xs text-white">
            5
          </div>
        </div>
      </div>

      <p className="text-center text-[14px] font-medium text-[#ADB5BD]">
        Your Temporary Email Address
      </p>
      <div className="px-2 lg:px-12">
        {/* Email Select Menu */}
        <div className="mb-5 mt-4 flex items-center gap-2">
          {/* Select Email Menu */}
          <div className="flex h-[68px] w-full items-center justify-between rounded-[14px] bg-[#F8F9FA] px-[14px] py-3">
            <div className="flex items-center gap-3">
              <div className="bg-primary-dark grid h-7 w-7 place-items-center rounded-full font-medium text-white">
                5
              </div>
              <p className="text-lg text-black">ihigaed356@mailrapido.com</p>
            </div>

            <div className="flex items-center gap-3">
              <ArrowDownIcon />
              <button className="grid place-items-center rounded-[10px] bg-white p-[10px]">
                <CopyIcon />
              </button>
            </div>
          </div>
          <ActionIconButton icon={QRCodeIcon} />
          <ActionIconButton icon={HistoryIcon} highlighted />
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex items-center justify-between gap-2">
          {actions.map((action) => (
            <ActionButton
              key={action.text}
              text={action.text}
              icon={action.icon}
              highlighted={action.highlighted}
            />
          ))}
        </div>

        {/* action bottom  */}
        <div className="flex justify-center">
          <div className="bg-primary/10 text-primary inline-flex items-center gap-3 rounded-[6px] px-3 py-2 text-sm font-medium">
            <SMSIcon />
            <span>You have 0 new messages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ text, icon, highlighted = false }) => {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-[14px] border border-[#23265042] px-[20px] py-[18px] font-semibold transition-all duration-300 ease-in-out hover:text-white ${highlighted ? "bg-primary-dark text-white hover:bg-black" : "hover:bg-primary-dark bg-white text-black"}`}
    >
      {React.createElement(icon, {
        width: 24,
        height: 24,
        className: "fill-current",
      })}
      <span className="">{text}</span>
    </button>
  );
};

const ActionIconButton = ({ icon, highlighted = false }) => {
  return (
    <button
      className={`h-[68px] rounded-[14px] p-5 transition-all duration-300 hover:text-white ${highlighted ? "bg-primary-dark text-white hover:bg-black" : "hover:bg-primary-dark bg-[#F8F9FA] text-black"}`}
    >
      {React.createElement(icon, {
        width: 24,
        height: 24,
        className: "fill-current",
      })}
    </button>
  );
};

export default BannerCardTop;
