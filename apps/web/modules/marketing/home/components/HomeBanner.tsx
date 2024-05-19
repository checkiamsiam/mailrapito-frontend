/* eslint-disable prefer-const */
"use client";

import SecondaryButton from "@shared/components/Button/SecondaryButton";
import TsParticles from "@shared/components/TsParticle/TsParticle";
import DeleteIcon from "@shared/icons/DeleteIcon";
import LoadingIcon from "@shared/icons/LoadingIcon";
import RefreshIcon from "@shared/icons/RefreshIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/dialog";
import { Icon } from "@ui/components/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/tooltip";
import { getCookie } from "cookies-next";
import moment from "moment";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import { useEmailToken, useMessages } from "../../../../hooks/useEmails";
import { deleteEmail } from "../../../../services/services";
import {
  activeThisEmailInHistoryLS,
  getActiveEmail,
  getLSEmails,
  getLSEmailsHistory,
  persistLSEmails,
} from "../../../../utils/localStorage-config";
import BannerTable2 from "./BannerTable2";
import CreateEmailModal from "./CreateEmailModal";

// -------------- Fake Data ------------
// const fakeMessages: IMessage[] = [
//   {
//     _id: "1asdfasd",
//     is_seen: true,
//     is_favorite: false,
//     from: "John Doe",
//     from_email: "john@example.com",
//     subject:
//       "Meeting Reminder dasff adsf asdf asdf asdf asdf asdf asdfasd fasdf asdf df asdf df adf dsf d adf asdf asdf sadf asdfsad fasdf ",
//     content:
//       "Don't forget about the meeting tomorrow at 10 AM. asdf asdf asdf sadf ",
//     receivedAt: new Date(),
//     attachments: [],
//   },
//   {
//     _id: "2asdfasd",
//     is_seen: false,
//     is_favorite: true,
//     from: "Alice Smith",
//     from_email: "alice@example.com",
//     subject: "Project Update",
//     content: "Attached is the latest progress report.",
//     receivedAt: new Date(),
//     attachments: [{ filename: "progress_report.pdf", size: "1.5MB" }],
//   },
//   // Add more messages as needed
//   {
//     _id: "3klklkllkk",
//     is_seen: true,
//     is_favorite: true,
//     from: "Bob Johnson",
//     from_email: "bob@example.com",
//     subject: "Important Announcement",
//     content: "Please review the attached document.",
//     receivedAt: new Date(),
//     attachments: [{ filename: "announcement.docx", size: "800KB" }],
//   },
//   {
//     _id: "4aghgsdf",
//     is_seen: false,
//     is_favorite: false,
//     from: "Sarah Lee",
//     from_email: "sarah@example.com",
//     subject: "Weekly Newsletter",
//     content: "Check out the latest news and updates.",
//     receivedAt: new Date(),
//     attachments: [],
//   },
//   {
//     _id: "5hgdgsdd",
//     is_seen: true,
//     is_favorite: false,
//     from: "Michael Brown",
//     from_email: "michael@example.com",
//     subject: "Upcoming Event",
//     content: "Join us for the event this weekend.",
//     receivedAt: new Date(),
//     attachments: [{ filename: "event_details.pdf", size: "2MB" }],
//   },
//   {
//     _id: "6asdeerer",
//     is_seen: true,
//     is_favorite: true,
//     from: "Emily Wang",
//     from_email: "emily@example.com",
//     subject: "Vacation Request",
//     content: "Please approve my vacation request for next month.",
//     receivedAt: new Date(),
//     attachments: [],
//   },
//   {
//     _id: "7eterere",
//     is_seen: false,
//     is_favorite: false,
//     from: "David Kim",
//     from_email: "david@example.com",
//     subject: "Meeting Agenda",
//     content: "Here's the agenda for tomorrow's meeting.",
//     receivedAt: new Date(),
//     attachments: [],
//   },
//   {
//     _id: "8nfghdger",
//     is_seen: true,
//     is_favorite: false,
//     from: "Jennifer Lopez",
//     from_email: "jennifer@example.com",
//     subject: "Task Assignment",
//     content: "Assigning tasks for the upcoming project.",
//     receivedAt: new Date(),
//     attachments: [{ filename: "task_list.xlsx", size: "500KB" }],
//   },
//   {
//     _id: "9adaeregsaer",
//     is_seen: false,
//     is_favorite: true,
//     from: "Kevin Garcia",
//     from_email: "kevin@example.com",
//     subject: "Feedback Request",
//     content: "Please provide feedback on the latest proposal.",
//     receivedAt: new Date(),
//     attachments: [],
//   },
//   {
//     _id: "10aeterasdfadsfwera",
//     is_seen: true,
//     is_favorite: true,
//     from: "Emma Thompson",
//     from_email: "emma@example.com",
//     subject: "Holiday Greetings",
//     content: "Wishing you a happy holiday season!",
//     receivedAt: new Date(),
//     attachments: [],
//   },
// ];

interface Email {
  email: string;
  date: number;
  active: boolean;
  token: string;
  inHistory?: boolean;
}

interface EmailGroup {
  date: string;
  emails: Email[];
}

export default function HomeBanner() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [copy, setCopy] = useState(false);
  const router = useRouter();
  const email = getCookie("email") ?? "";
  const [generatedEmails, setGeneratedEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [isHover, setHover] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState(new Set());
  const [searchText, setSearchText] = useState<string>("");
  const [emailsHistory, setEmailsHistory] = useState<EmailGroup[]>([]);
  const [showUseEmailBtn, setShowUseEmailBtn] = useState("");
  const [open, setOpen] = React.useState(false);
  const [numbersOfEmailsInHistory, setNumbersOfEmailsInHistory] = useState(0);
  const [copyEmail, setCopyEmail] = useState("");

  const handleDateCheckboxChange = (date) => {
    const newSelectedEmails = new Set(selectedEmails);
    if (newSelectedEmails.has(date)) {
      newSelectedEmails.delete(date);
      const selectedDay = emailsHistory.find((d) => d.date === date);
      if (selectedDay) {
        selectedDay.emails.forEach((email) =>
          newSelectedEmails.delete(email.email),
        );
      }
    } else {
      newSelectedEmails.add(date);
      const selectedDay = emailsHistory.find((d) => d.date === date);
      if (selectedDay) {
        selectedDay.emails.forEach((email) =>
          newSelectedEmails.add(email.email),
        );
      }
    }
    setSelectedEmails(newSelectedEmails);
  };

  const handleEmailCheckboxChange = (email, date) => {
    const newSelectedEmails = new Set(selectedEmails);
    if (newSelectedEmails.has(email)) {
      newSelectedEmails.delete(email);
      newSelectedEmails.delete(date);
    } else {
      newSelectedEmails.add(email);
    }
    setSelectedEmails(newSelectedEmails);
  };
  const isSelectedDate = (date) => selectedEmails.has(date);
  const isSelectedEmail = (email) => selectedEmails.has(email);

  const filterEmails = (searchText: string) => {
    if (!searchText) {
      return emailsHistory;
    }
    return emailsHistory.filter(
      (day) =>
        day.date.toLowerCase().includes(searchText.toLowerCase()) ||
        day.emails.some((email) =>
          email.email.toLowerCase().includes(searchText.toLowerCase()),
        ),
    );
  };

  const displayedEmails = filterEmails(searchText);

  const handleSearchChange = (event: string) => {
    setSearchText(event);
  };

  // ----------- Data Fetching ----------
  const { data: emailToken, refetch: refetchEmailToken } = useEmailToken({
    enabled: email ? false : true,
  });

  const {
    data: messages,
    isFetching: messageLoading,
    refetch: refetchMessages,
  } = useMessages({ email });

  const { mutate: deleteAPI, isPending: deleteLoading } = useMutation({
    mutationKey: ["deleteEmail"],
    mutationFn: deleteEmail,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["messages"] });
      setTimeout(() => {
        handleLocalStorageEmail();
      }, 1000);
    },
  });

  const handleCopy = () => {
    setCopy(true);
    console.log(email);
    void navigator.clipboard.writeText(messages?.data?.mailbox as string);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };

  const getEmailsHistory = () => {
    const data: Email[] = getLSEmailsHistory();
    const currentEmails = getLSEmails();
    const emails: EmailGroup[] = [];

    const allEmails = [...data, ...currentEmails];

    const allFilteredEmails = Array.from(
      new Set(allEmails.map((a) => a.email)),
    ).map((email) => {
      return allEmails.find((a) => a.email === email);
    });

    if (allFilteredEmails.length > 0) {
      allFilteredEmails.forEach((item: Email) => {
        const date: Date = new Date(item.date);
        const formattedDate = `${date.toLocaleDateString("en-US", { weekday: "long", month: "numeric", day: "numeric", year: "numeric" })}`;
        const existingDate: EmailGroup | undefined = emails.find(
          (e) => e.date === formattedDate,
        );
        if (existingDate) {
          existingDate.emails.unshift(item);
        } else {
          emails.push({ date: formattedDate, emails: [item] });
        }
      });
    }
    const numberOfEmails = calculateNumberOfEmails(emails);
    setNumbersOfEmailsInHistory(numberOfEmails);
    setEmailsHistory(emails);
  };

  const calculateNumberOfEmails = (data) => {
    let totalEmails = 0;
    data.forEach((item) => {
      totalEmails += item.emails.length;
    });

    return totalEmails;
  };

  const deleteSelectedEmails = () => {
    const emails: Email[] = getLSEmailsHistory();
    let toDeleteEmails: Email[] = [];
    for (const email of selectedEmails as any) {
      const filteredEmails = emails.filter((e) => {
        return e.email === email;
      });
      toDeleteEmails.push(...filteredEmails);
    }

    const a = emails.filter((email) => !toDeleteEmails.includes(email));

    if (a.length > 0) {
      localStorage.setItem("emailsHistory", JSON.stringify(a));
      getEmailsHistory();
      setSelectedEmails(new Set());
    }
  };

  const getCount = useMemo(() => {
    let count = 0;
    for (const item of selectedEmails as any) {
      if (/@/.test(item as string)) {
        count++;
      }
    }
    return count;
  }, [selectedEmails]);

  const activeThisEmail = async (e) => {
    let emails = getLSEmails();
    if (e.email === "All Emails") {
      emails.forEach((obj) => {
        obj.active = false;
      });
      setSelectedEmail("All Emails");
    } else {
      emails.forEach((obj) => {
        if (obj.email === e.email) {
          persistLSEmails(e.email as string, e.token as string);
          activeThisEmailInHistoryLS(e.email as string);
          obj.active = true;
        } else {
          obj.active = false;
        }
      });
    }
    localStorage.setItem("emails", JSON.stringify(emails));
    handleLocalStorageEmail();
    await refetchMessages();
  };

  const activeHistoryEmail = async (email) => {
    await activeThisEmail(email);
    setOpen(false);
  };

  const handleLocalStorageEmail = () => {
    const emails = getLSEmails();
    const isActive = emails?.find((email) => email.active);
    let newObj = {
      email: "All Emails",
      token: "0",
      date: Date.now(),
      active: false,
    };
    if (isActive) {
      newObj.active = false;
      setSelectedEmail(isActive.email);
    } else {
      newObj.active = true;
      setSelectedEmail(newObj.email);
    }
    const allEmails = [newObj, ...emails];
    setGeneratedEmails(allEmails);
  };

  useEffect(() => {
    handleLocalStorageEmail();
  }, [messageLoading]);

  // -------------- Socket IO ------------
  useEffect(() => {
    handleLocalStorageEmail();
    let socket;
    socket = io("https://web.mailrapido.com/", {
      forceNew: true,
      secure: true,
    });

    function getCookie() {
      const a = getActiveEmail();
      return a?.token;
    }

    function joinSocketRoom(room) {
      const message = { room: room };
      socket.emit("joinRoom", message);
    }

    function leaveSocketRoom(room) {
      const message = { room: room };
      socket.emit("leaveRoom", message);
    }

    const room = getCookie();

    joinSocketRoom(room);
    // removed data from parameter of below function
    socket.on("check", async function () {
      // console.log(JSON.parse(data));
      // var data = JSON.parse(data);
      // const messagesData = [...messages.messages];
      // messagesData?.unshift(data);
      // setMessages((prev) => ({ ...prev, messages: messagesData }));
      // // here append your own message structure on the page user previous d variable info

      await refetchMessages();
    });
    return () => {
      socket.off("check");
    };
  }, [messages, refetchMessages]);

  return (
    <div>
      <div className="before:bg-primary-gradient relative h-full pb-[365px] before:absolute before:h-full before:w-full">
        <TsParticles />

        <div
          className="container relative py-[42px] text-center text-white md:py-[82px]"
          data-aos="fade-up"
        >
          <h2 className="text-xl font-bold capitalize md:text-5xl">
            {t("banner.title")}
          </h2>
          <p className="text-md mx-auto mt-6 max-w-2xl font-medium md:text-xl">
            {t("banner.subtitle")}
          </p>
        </div>
      </div>

      <section className="px-2">
        <div
          className="relative z-10 mx-auto mt-[-346px] max-w-[874px] rounded-lg bg-white shadow-xl"
          data-aos="fade-up"
        >
          <div>
            <div className="absolute left-0 top-8 z-0 hidden md:block">
              <Image
                src={"/images/banner/banner-top-shape.svg"}
                className="mail-shape"
                alt="Mail Shape"
                width={296}
                height={271}
                priority
              />
            </div>
            {/* Email Top */}
            <div className="relative flex flex-col items-center pb-6 pt-10">
              {/* new email container */}
              <div className="relative mb-2 flex flex-col">
                <div className="flex">
                  <div className="w-full">
                    <div className="rounded-tl-sm bg-[#4652D8] py-1 text-center text-xs font-light text-white">
                      Your temporary email
                    </div>
                    <div
                      className="relative flex flex-col justify-center"
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                    >
                      <div className="absolute left-2 rounded-[5px] bg-[hsla(0,0%,100%,.2)] px-[5px] text-sm text-white">
                        {generatedEmails &&
                          generatedEmails.length > 0 &&
                          generatedEmails.length - 1}
                      </div>
                      <div
                        className={`w-[300px] ${isHover ? "rounded-none" : "rounded-bl-sm"}  bg-[#323FD4]`}
                      >
                        {messageLoading ? (
                          <div className="flex h-[40px] items-center justify-center space-x-2 bg-transparent">
                            <span className="sr-only">Loading...</span>
                            <div className="h-3 w-3 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></div>
                            <div className="h-3 w-3 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></div>
                            <div className="h-3 w-3 animate-bounce rounded-full bg-white"></div>
                          </div>
                        ) : (
                          <input
                            value={selectedEmail}
                            type="email"
                            disabled
                            className="text-md w-full appearance-none border-0 bg-transparent text-center text-white"
                          />
                        )}
                      </div>
                      <div className="absolute right-0 rounded-[5px] px-1 text-sm text-white">
                        <Icon.chevronDown className="h-5 w-5" color="white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger className="h-full">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="h-full">
                              <Button
                                variant="secondary"
                                className="ml-[1px] h-full rounded-none bg-[#323FD4] px-4"
                                onClick={() => {
                                  getEmailsHistory();
                                  setOpen(!open);
                                }}
                              >
                                <Icon.clock className="h-6 w-6" color="white" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Open Emails history</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DialogTrigger>
                      <DialogContent className="max-w-[600px] border-0 bg-[#1220CE] text-white">
                        <DialogTitle>
                          <div>Emails history</div>
                        </DialogTitle>
                        <DialogDescription>Search in history</DialogDescription>
                        <div className="flex items-end">
                          <div className="relative flex w-full">
                            <input
                              className="w-full text-ellipsis bg-[#0E1894] pr-[40px]"
                              id="email"
                              placeholder="Type email address to search..."
                              value={searchText}
                              onChange={(e) =>
                                handleSearchChange(e.target.value)
                              }
                            />
                            {searchText && (
                              <button
                                onClick={() => setSearchText("")}
                                className="absolute left-auto right-1 h-[calc(100%-2px)] w-[25px]"
                              >
                                <Icon.close className="h-5 w-5 text-white" />
                              </button>
                            )}
                          </div>
                          {selectedEmails.size > 0 && (
                            <div className="h-full w-80 px-2">
                              <button
                                className="h-full w-full rounded-[5px] bg-[#A83939] px-[5px] py-[2px] text-white"
                                title="Delete"
                                onClick={deleteSelectedEmails}
                              >
                                Delete ({getCount}) emails?
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="email-list">
                          <ul className="scroll scroll-y-auto min-h-auto flex max-h-[400px] list-none flex-col gap-4 overflow-y-auto">
                            {displayedEmails && displayedEmails.length > 0
                              ? displayedEmails.map((day) => (
                                  <li
                                    key={day.date}
                                    className="flex items-center"
                                  >
                                    <div className="flex w-full flex-col">
                                      <div className="flex items-center bg-[#323DE4] px-3 py-2 text-xs uppercase">
                                        <input
                                          type="checkbox"
                                          id={day.date}
                                          checked={isSelectedDate(day.date)}
                                          onChange={() =>
                                            handleDateCheckboxChange(day.date)
                                          }
                                          className="mr-3 h-3 w-3 rounded focus:ring-1 focus:ring-blue-500"
                                        />
                                        <h3>{day.date}</h3>
                                      </div>
                                      <ul className=" list-none">
                                        {day.emails.map((email) => (
                                          <li
                                            key={email.email}
                                            onMouseEnter={() => {
                                              if (
                                                email?.inHistory &&
                                                !email.active
                                              ) {
                                                setShowUseEmailBtn(email.email);
                                              }
                                            }}
                                            onMouseLeave={() =>
                                              setShowUseEmailBtn("")
                                            }
                                            className="flex w-full items-center justify-between space-x-3 border-b-[1px] border-[#323DE4] bg-[#0E1894] px-3 py-3 text-xs text-white hover:opacity-80"
                                          >
                                            <div className="">
                                              <input
                                                type="checkbox"
                                                id={email.email}
                                                checked={isSelectedEmail(
                                                  email.email,
                                                )}
                                                onChange={() =>
                                                  handleEmailCheckboxChange(
                                                    email.email,
                                                    day.date,
                                                  )
                                                }
                                                className="mr-3 h-3 w-3 rounded focus:ring-1 focus:ring-blue-500"
                                              />
                                              <label
                                                htmlFor={email.email}
                                                className="text-sm text-white"
                                              >
                                                <span className="text-slate-400">
                                                  {moment(email.date).format(
                                                    "hh:mm A",
                                                  )}
                                                </span>
                                                <span className="pl-3">
                                                  {email.email}
                                                </span>
                                              </label>
                                            </div>
                                            {showUseEmailBtn ===
                                              email.email && (
                                              <div className="z-20 rounded-[5px] bg-[#F35B7B]">
                                                <button
                                                  className=" px-[5px] py-[2px] text-xs text-white hover:opacity-70"
                                                  onClick={() =>
                                                    activeHistoryEmail(email)
                                                  }
                                                >
                                                  Use this email
                                                </button>
                                              </div>
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </li>
                                ))
                              : searchText && (
                                  <div className="flex w-full items-center">
                                    <div className="flex w-full items-center justify-center bg-[#323DE4] px-3 py-5 text-slate-400">
                                      No emails found with the search term
                                      &quot;{searchText}&quot;
                                    </div>
                                  </div>
                                )}
                          </ul>
                          <div className="mt-4">
                            <div className="text-center text-xs text-white">
                              History size: {numbersOfEmailsInHistory} / 50
                            </div>
                            <div className="text-center text-xs">
                              <Button
                                variant="link"
                                className="rounded-md px-1 font-bold text-white"
                              >
                                Get Premium
                              </Button>
                              to increase history size and get more features
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="secondary"
                      className={`ml-[1px] h-full rounded-none ${isHover ? "rounded-none rounded-tr-sm" : "rounded-e-sm"} bg-[#323FD4] px-4`}
                    >
                      <Icon.qrCode className="h-6 w-6" color="white" />
                    </Button>
                  </div>
                </div>
                {isHover && (
                  <div
                    className="absolute top-[100%] z-10 w-full"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    <div className="">
                      {generatedEmails &&
                        generatedEmails.length > 0 &&
                        generatedEmails.map((email) => {
                          return (
                            <button
                              key={email.email}
                              className={`flex w-[100%] items-center justify-between border-t-[1px] border-white ${selectedEmail === email.email ? "bg-[#4652D8]" : "bg-[#323FD4]"} px-2 py-3 text-sm text-white hover:bg-[#4652D8] hover:text-white`}
                              onClick={async () => {
                                await activeThisEmail(email);
                              }}
                              onMouseEnter={() => setCopyEmail(email.email)}
                              onMouseLeave={() => setCopyEmail("")}
                            >
                              <div className="">
                                <input
                                  type="radio"
                                  id={email.email}
                                  name="email"
                                  value="30"
                                  checked={selectedEmail === email.email}
                                  disabled
                                  className="rounded-full border-0 bg-[rgb(0,0,0,.5)] checked:rounded-full checked:bg-[rgb(0,0,0,.5)] checked:shadow-inner checked:ring-black checked:ring-offset-black checked:hover:bg-[rgb(0,0,0,.5)]"
                                />
                                <label
                                  className="text-md pl-2"
                                  htmlFor={email.email}
                                >
                                  {email.email}
                                </label>
                              </div>
                              <div className="flex items-center justify-center">
                                {copyEmail === email.email &&
                                  copyEmail !== "All Emails" && (
                                    <div className="px-3 hover:block">
                                      <TooltipProvider>
                                        <Tooltip data-side="right">
                                          <TooltipTrigger>
                                            <button
                                              title={email.email}
                                              onClick={() =>
                                                navigator.clipboard.writeText(
                                                  email.email,
                                                )
                                              }
                                            >
                                              <Icon.copy size={14} />
                                            </button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            Copy Email
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                  )}
                                <div className="rounded-[5px] bg-[hsla(0,0%,100%,.2)] px-[5px] py-[2px] text-xs text-white">
                                  {0}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                    </div>
                    <div className="flex items-center justify-center rounded-b-sm border-t-[1px] border-white bg-[#323FD4] py-3 text-sm text-white">
                      <div>
                        Email count:{" "}
                        {generatedEmails &&
                          generatedEmails.length > 0 &&
                          generatedEmails.length - 1}{" "}
                        / 5
                      </div>
                      <div className="px-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <button className="flex h-4 w-4 items-center justify-center rounded-full bg-[rgb(0,0,0,.5)] text-xs">
                                ?
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Maximum email count upto 5 emails new email will
                              replace old one
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <button className="rounded-[3px] bg-white px-1.5 py-[2px] text-xs text-black">
                        Upgrade
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <SecondaryButton
                  className="px-2 md:px-6"
                  onClick={() => deleteAPI()}
                  disabled={selectedEmail === "All Emails"}
                >
                  {messageLoading || deleteLoading ? (
                    <LoadingIcon />
                  ) : (
                    <DeleteIcon size={16} />
                  )}
                  {"Delete"}
                </SecondaryButton>

                <SecondaryButton
                  className="px-2 md:px-6"
                  onClick={() => refetchMessages()}
                >
                  {messageLoading ? <LoadingIcon /> : <RefreshIcon size={16} />}
                  {"Refresh"}
                </SecondaryButton>
                <CreateEmailModal refetchMessages={refetchMessages} />

                {/* <SecondaryButton className="px-2 md:px-6">
                  <PenIcon size={16} />
                  {"Create"}
                </SecondaryButton> */}
              </div>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="relative">
                  <Image
                    src={"/images/banner/mail-icon.svg"}
                    alt="Mail Icon"
                    width={41}
                    height={40}
                  />
                  <div className="bg-secondary absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full text-[10px]">
                    <span className="text-white">
                      {messages?.data?.messages?.length}
                    </span>
                  </div>
                </div>
                <p className="text-primary text-lg font-medium">
                  {"You have"} {messages?.data?.messages?.length}{" "}
                  {"new messages"}
                </p>
              </div>
            </div>

            {/* Message List Table */}

            <BannerTable2
              // messages={fakeMessages}
              messages={messages?.data?.messages ?? []}
              refetchMessages={refetchMessages}
            />
            {/* <BannerTable /> */}
          </div>
        </div>
      </section>
    </div>
  );
}
