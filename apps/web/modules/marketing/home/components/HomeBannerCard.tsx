import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import useEmailHistoryStore from "../../../../hooks/stores/useEmailHistory";
import useSubscriptionModalStore from "../../../../hooks/stores/useSubscriptionModal";
import { useEmailToken, useMessages } from "../../../../hooks/useEmails";
import { deleteEmail } from "../../../../services/services";
import {
  getActiveEmail,
  getLSEmails,
} from "../../../../utils/localStorage-config";
import BannerCardTop from "./BannerCardTop";
import BannerTable2 from "./BannerTable2";

interface Email {
  email: string;
  date: number;
  active: boolean;
  token: string;
  inHistory?: boolean;
  expireIn: string;
}

interface EmailGroup {
  date: string;
  emails: Email[];
}

const HomeBannerCard = () => {
  // ----------- State Management ----------
  const [email, setEmail] = useState(getActiveEmail()?.token ?? "");
  const queryClient = useQueryClient();
  const [copy, setCopy] = useState(false);
  const router = useRouter();
  const {
    setSelectedEmail,
    setGeneratedEmails,
  } = useEmailHistoryStore((state) => state);
  const [isHover, setHover] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState(new Set());
  const [searchText, setSearchText] = useState<string>("");
  const [emailsHistory, setEmailsHistory] = useState<EmailGroup[]>([]);
  const [showUseEmailBtn, setShowUseEmailBtn] = useState("");
  const [open, setOpen] = React.useState(false);
  const [numbersOfEmailsInHistory, setNumbersOfEmailsInHistory] = useState(0);
  const [copyEmail, setCopyEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(true);

  // ------------ Functions ------------

  // ----------- Data Fetching ----------
  const {
    data: emailToken,
    isFetching: emailTokenFetching,
    refetch: refetchEmailToken,
  } = useEmailToken({
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

  const handleLocalStorageEmail = () => {
    const emails = getLSEmails();
    const isActive = emails?.find((email) => email.active);
    const newObj = {
      email: "All Emails",
      token: "0",
      date: Date.now(),
      active: false,
      expireIn: "",
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
    if (email) {
      void refetchMessages();
    }
  }, [email]);

  useEffect(() => {
    const activeEmail = getActiveEmail();
    if (activeEmail) {
      setEmail(activeEmail.token);
    }
  }, [emailToken]);

  useEffect(() => {
    if (messageLoading || emailTokenFetching) {
      setEmailLoading(true);
    } else {
      setTimeout(() => {
        const activeEmail = getActiveEmail();
        if (activeEmail) {
          setEmail(activeEmail.token);
        }
        setEmailLoading(false);
      }, 100);
    }
  }, [messageLoading, emailTokenFetching]);

  useEffect(() => {
    handleLocalStorageEmail();
  }, [messageLoading]);

  // -------------- Socket IO ------------
  useEffect(() => {
    handleLocalStorageEmail();
    const socket = io("https://web.mailrapido.com/", {
      forceNew: true,
      secure: true,
    });

    function getEmail() {
      const a = getActiveEmail();
      return a?.token;
    }

    function joinSocketRoom(room) {
      const message = { room: encodeURIComponent(room) };
      socket.emit("joinRoom", message);
    }

    function leaveSocketRoom(room) {
      const message = { room: room };
      socket.emit("leaveRoom", message);
    }

    const room = getEmail();

    if (room) {
      joinSocketRoom(room);
    }
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
    <section className="px-2">
      <div
        className="relative z-10 mx-auto max-w-[700px] rounded-[20px] bg-white md:rounded-[34px] lg:max-w-[783px] xl:max-w-[874px]"
        data-aos="fade-up"
        style={{
          boxShadow: "0px 35px 70px -20px #613D4B1A",
        }}
      >
        <div>
          {/* <div className="absolute left-0 top-8 z-0 hidden md:block">
            <Image
              src={"/images/banner/banner-top-shape.svg"}
              className="mail-shape"
              alt="Mail Shape"
              width={296}
              height={271}
              priority
            />
          </div> */}
          {/* Email Top */}
          <BannerCardTop
            handleCopy={handleCopy}
            emailLoading={emailLoading}
            messages={messages?.data?.messages ?? []}
            messageLoading={messageLoading}
            deleteAPI={deleteAPI}
            deleteLoading={deleteLoading}
            refetchMessages={refetchMessages}
          />
          {/* <div className="relative flex flex-col items-center pb-6 pt-10">
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
                      {emailLoading ? (
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
                                void getEmailsHistory();
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
                                              <span
                                                className={`pl-3 ${
                                                  new Date(
                                                    new Date().getTime(),
                                                  ).toISOString() >=
                                                  email.expireIn
                                                    ? "text-gray-400"
                                                    : "text-white"
                                                } `}
                                              >
                                                {email.email}
                                              </span>
                                            </label>
                                          </div>
                                          {new Date(
                                            new Date().getTime(),
                                          ).toISOString() >=
                                          email.expireIn ? (
                                            <div className="rounded-[5px] bg-gray-700 px-2 py-1">
                                              Cannot be chosen
                                            </div>
                                          ) : (
                                            showUseEmailBtn ===
                                              email.email && (
                                              <div className="z-20 rounded-[5px] bg-[#F35B7B]">
                                                <button
                                                  className="px-[5px] py-[2px] text-xs text-white hover:opacity-70"
                                                  onClick={() =>
                                                    activeHistoryEmail(email)
                                                  }
                                                >
                                                  Use this email
                                                </button>
                                              </div>
                                            )
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

                    <button
                      onClick={() => subScriptionModal.setOpen(true)}
                      className="rounded-[3px] bg-white px-1.5 py-[2px] text-xs text-black"
                    >
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
          </div> */}

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
  );
};

export default HomeBannerCard;
