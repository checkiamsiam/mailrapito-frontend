"use client";

import CheckBoxButton from "@shared/components/Button/CheckBoxButton";
import PrimaryButton from "@shared/components/Button/PrimaryButton";
import ArrowDownIcon from "@shared/icons/ArrowDownIcon";
import BellIcon from "@shared/icons/BellIcon";
import CopyIcon from "@shared/icons/CopyIcon";
import DeleteIcon2 from "@shared/icons/DeleteIcon2";
import ForwardIcon from "@shared/icons/ForwardIcon";
import HistoryIcon from "@shared/icons/HistoryIcon";
import LoadingIcon from "@shared/icons/LoadingIcon";
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
import clsx from "clsx";
import React, { useEffect } from "react";

const emails = [
  { email: "ihigaed356@mailrapido.com", value: 1000 },
  { email: "ihigaed356@mailrapido.com", value: 55 },
  { email: "ihigaed356@mailrapido.com", value: 60 },
  { email: "ihigaed356@mailrapido.com", value: 40 },
  { email: "ihigaed356@mailrapido.com", value: 45 },
];

type IProps = {
  handleCopy: () => void;
  generatedEmails: any;
  emailLoading: boolean;
  selectedEmail: any;
  getEmailsHistory: () => void;
  displayedEmails: any[];
  messages: any;
  messageLoading: boolean;
  deleteAPI: () => void;
  deleteLoading: boolean;
  refetchMessages: () => void;
};

const BannerCardTop = ({
  handleCopy,
  generatedEmails,
  emailLoading,
  selectedEmail,
  getEmailsHistory,
  displayedEmails,
  messages,
  messageLoading,
  deleteAPI,
  deleteLoading,
  refetchMessages,
}: IProps) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const selectMenuRef = React.useRef<any>(null);
  const [dropDownWidth, setDropDownWidth] = React.useState(594);
  

  const actions = [
    {
      text: "Refresh",
      icon: messageLoading ? LoadingIcon : RefreshIcon2,
      highlighted: true,
      action: refetchMessages,
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
      icon: messageLoading || deleteLoading ? LoadingIcon : DeleteIcon2,
      action: deleteAPI,
    },
  ];

  // Adjust the Dropdown Width on Resize
  useEffect(() => {
    const resizeSelectMenuList = () => {
      if (selectMenuRef?.current) {
        const selectMenuWidth = selectMenuRef.current.offsetWidth;
        setDropDownWidth(selectMenuWidth);
      }
    };
    window.addEventListener("resize", resizeSelectMenuList);
    return () => {
      window.removeEventListener("resize", resizeSelectMenuList);
    };
  }, [setDropdownOpen]);
  return (
    <div className="p-2 lg:p-5">
      {/* Notification Icon */}
      <div className="mt-2 flex justify-between md:mt-0 md:justify-end">
        <ActionIconButton
          icon={HistoryIcon}
          highlighted
          className="block h-auto !p-2 md:hidden"
        />
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
            <div
              className="relative h-[50px] w-full rounded-[14px] border border-[#E9ECEF] bg-[#F8F9FA] px-2 py-3 md:h-[68px] md:px-[14px]"
              ref={selectMenuRef}
            >
              <DropdownMenuTrigger className="absolute left-0 top-0 z-0 h-full w-full">
                <button
                  onClick={() => {
                    // void getEmailsHistory();
                    setDropdownOpen((prev) => !prev);
                  }}
                ></button>
              </DropdownMenuTrigger>

              <div className="flex h-full items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="bg-primary-dark grid h-5 w-5 place-items-center rounded-full text-xs font-medium text-white md:h-7 md:w-7 md:text-base">
                    {generatedEmails &&
                      generatedEmails.length > 0 &&
                      generatedEmails.length - 1}
                  </div>
                  {emailLoading ? (
                    <div className="flex h-[40px] items-center justify-center space-x-2 bg-transparent">
                      <span className="sr-only">Loading...</span>
                      <div className="bg-primary-dark h-3 w-3 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
                      <div className="bg-primary-dark h-3 w-3 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
                      <div className="bg-primary-dark h-3 w-3 animate-bounce rounded-full"></div>
                    </div>
                  ) : (
                    <p className="text-xs text-black md:text-lg">
                      {selectedEmail}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button className="grid place-items-center">
                    <ArrowDownIcon
                      className={`transition-all duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Ignore this button to open or close the dropdown */}
                  <button
                    className="relative grid place-items-center rounded-[10px] bg-white p-0 md:p-[10px]"
                    onClick={handleCopy}
                  >
                    <CopyIcon />
                  </button>
                  <ActionIconButton
                    icon={QRCodeIcon}
                    className="relative block h-auto !p-0 md:hidden"
                  />
                </div>
              </div>
            </div>

            <DropdownMenuContent
              className="mt-1 rounded-[14px] border border-none border-[#F8F9FA] bg-white p-0"
              style={{
                boxShadow: "0px 4px 4px 0px #00000040",
                width: dropDownWidth + "px",
              }}
            >
              <div className="flex items-center justify-between border-b border-b-[#E9ECEF] bg-[#F8F9FA] px-4 py-3 ">
                <CheckBoxButton
                  checked
                  label={
                    <strong className="text-xs md:text-lg">All Emails At Once</strong>
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
                    label={<span className="text-xs md:text-lg">{item?.email}</span>}
                  />
                  <div className="text-xs md:text-base border-primary/10 text-primary-dark grid place-items-center rounded-full border px-3 py-[5px] font-medium">
                    {item?.value}
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-center gap-[28px] bg-[#F8F9FA] p-4">
                <p className="text-xs md:text-base text-[#868E96]">
                  Email Count: 5/<span className="text-black">5</span>
                </p>
                <PrimaryButton size="sm">Get More</PrimaryButton>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <ActionIconButton icon={QRCodeIcon} className="hidden md:block" />
          <ActionIconButton
            icon={HistoryIcon}
            highlighted
            className="hidden md:block"
          />
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex items-center justify-between gap-2">
          {actions.map((action) => (
            <ActionButton
              key={action.text}
              text={action.text}
              icon={action.icon}
              highlighted={action.highlighted}
              action={action.action}
            />
          ))}
        </div>

        {/* action bottom  */}
        <div className="flex justify-center">
          <div className="bg-primary/10 text-primary inline-flex items-center gap-3 rounded-[6px] px-3 py-2 text-sm font-medium">
            <SMSIcon />
            <span>You have {messages?.length} new messages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ text, icon, highlighted = false, action }) => {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-[14px] border border-[#23265042] px-2 py-2 font-semibold transition-all duration-300 ease-in-out hover:text-white max-md:justify-center md:px-[20px] md:py-[18px] ${highlighted ? "bg-primary-dark text-white hover:bg-black" : "hover:bg-primary-dark bg-white text-black"}`}
      onClick={action}
    >
      {React.createElement(icon, {
        width: 24,
        height: 24,
        className: "fill-current",
      })}
      <span className="hidden md:block">{text}</span>
    </button>
  );
};

const ActionIconButton = ({ icon, highlighted = false, className = "" }) => {
  return (
    <button
      className={clsx(
        `h-[68px] rounded-[14px] p-5 transition-all duration-300 hover:text-white ${highlighted ? "bg-primary-dark text-white hover:bg-black" : "hover:bg-primary-dark bg-[#F8F9FA] text-black"}`,
        className,
      )}
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
