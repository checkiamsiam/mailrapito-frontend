import BellIcon from "@shared/icons/BellIcon";
import DeleteIcon2 from "@shared/icons/DeleteIcon2";
import ForwardIcon from "@shared/icons/ForwardIcon";
import PlusIcon from "@shared/icons/PlusIcon";
import RandomIcon from "@shared/icons/RandomIcon";
import RefreshIcon2 from "@shared/icons/RefreshIcon2";
import SMSIcon from "@shared/icons/SMSIcon";
import React from "react";

const BannerCardTop = () => {
  const actions = [
    {
      text: "Refresh",
      icon: RefreshIcon2,
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
        <div className="mb-5 mt-4 flex items-center gap-2"></div>

        {/* Action Buttons */}
        <div className="mb-6 flex items-center justify-between gap-2">
          {actions.map((action) => (
            <ActionButton
              key={action.text}
              text={action.text}
              icon={action.icon}
            />
          ))}
        </div>

        {/* action bottom  */}
        <div className="flex justify-center">
          <div className="bg-primary/10 text-primary inline-flex items-center gap-3 rounded-[6px] py-2 px-3 font-medium text-sm">
            <SMSIcon />
            <span>You have 0 new messages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ text, icon }) => {
  return (
    <button className="hover:bg-primary flex w-full items-center gap-3 rounded-[14px] border border-[#23265042] bg-transparent px-[20px] py-[18px] font-semibold text-black transition-all duration-300 ease-in-out hover:border-[#23265042] hover:text-white">
      {React.createElement(icon, {
        width: 24,
        height: 24,
        className: "fill-current",
      })}
      <span className="">{text}</span>
    </button>
  );
};

export default BannerCardTop;
