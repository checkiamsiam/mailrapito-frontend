import CheckBoxButton from "@shared/components/Button/CheckBoxButton";
import PrimaryButton from "@shared/components/Button/PrimaryButton";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@ui/components/dropdown-menu";
import React from "react";

const emails = [
  { email: "ihigaed356@mailrapido.com", value: 1000 },
  { email: "ihigaed356@mailrapido.com", value: 55 },
  { email: "ihigaed356@mailrapido.com", value: 60 },
  { email: "ihigaed356@mailrapido.com", value: 40 },
  { email: "ihigaed356@mailrapido.com", value: 45 },
];

const BannerCardTop = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

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
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <div className="relative h-[68px] w-full rounded-[14px] bg-[#F8F9FA] px-[14px] py-3">
              <DropdownMenuTrigger className="absolute left-0 top-0 z-0 h-full w-full">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                ></button>
              </DropdownMenuTrigger>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-dark grid h-7 w-7 place-items-center rounded-full font-medium text-white">
                    5
                  </div>
                  <p className="text-lg text-black">
                    ihigaed356@mailrapido.com
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button className="grid place-items-center">
                    <ArrowDownIcon
                      className={`transition-all duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Ignore this button to open or close the dropdown */}
                  <button className="relative grid place-items-center rounded-[10px] bg-white p-[10px]">
                    <CopyIcon />
                  </button>
                </div>
              </div>
            </div>

            <DropdownMenuContent
              className="mt-1 w-[594px] rounded-[14px] border border-none border-[#F8F9FA] bg-white p-0"
              style={{
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
            >
              <div className="flex items-center justify-between border-b border-b-[#E9ECEF] bg-[#F8F9FA] px-4 py-3 ">
                <CheckBoxButton
                  checked
                  label={
                    <strong className="text-lg">All Emails At Once</strong>
                  }
                />
                <div className="border-primary/10 text-primary-dark grid place-items-center rounded-full border px-3 py-[5px] font-medium">
                  1200
                </div>
              </div>

              {emails?.map((item, i) => (
                <div
                  className="hover:bg-primary/10 flex items-center justify-between bg-transparent px-4 py-4 transition-all duration-200"
                  key={i}
                >
                  <CheckBoxButton
                    checked={false}
                    label={<span className="text-lg">{item?.email}</span>}
                  />
                  <div className="border-primary/10 text-primary-dark grid place-items-center rounded-full border px-3 py-[5px] font-medium">
                    {item?.value}
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-center gap-[28px] bg-[#F8F9FA] p-4">
                <p className="text-[#868E96]">
                  Email Count: 5/<span className="text-black">5</span>
                </p>
                <PrimaryButton size="sm">Get More</PrimaryButton>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
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
