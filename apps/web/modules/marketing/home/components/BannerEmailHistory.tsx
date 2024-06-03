import HistoryIcon from "@shared/icons/HistoryIcon";
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
import moment from "moment";
import { useMemo, useState } from "react";
import { getRecords } from "../../../../db";
import useEmailHistoryStore from "../../../../hooks/stores/useEmailHistory";
import type {
  IEmail,
  IEmailGroup,
} from "../../../../interface/commonInterface";
import {
  activeThisEmailInHistoryLS,
  getLSEmails,
  getLSEmailsHistory,
  persistLSEmails,
} from "../../../../utils/localStorage-config";
import { ActionIconButton } from "./BannerCardTop";

interface IProps {
  refetchMessages: any;
}

const BannerEmailHistory = ({ refetchMessages }: IProps) => {
  // ----- states -----
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [emailsHistory, setEmailsHistory] = useState<IEmailGroup[]>([]);
  const [selectedEmails, setSelectedEmails] = useState(new Set());
  const [numbersOfEmailsInHistory, setNumbersOfEmailsInHistory] = useState(0);
  const [showUseEmailBtn, setShowUseEmailBtn] = useState("");
  const { setSelectedEmail, setGeneratedEmails } = useEmailHistoryStore(
    (state) => state,
  );

  // ----- functions -----
  // ---- handle email checkbox change
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

  // ---- handle date checkbox change
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

  // ---- handel local storage emails
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

  // ---- active email
  const activeThisEmail = async (e) => {
    const emails = getLSEmails();
    if (e.email === "All Emails") {
      emails.forEach((obj) => {
        obj.active = false;
      });
      setSelectedEmail("All Emails");
    } else {
      emails.forEach((obj) => {
        if (obj.email === e.email) {
          void persistLSEmails(
            e.email as string,
            e.token as string,
            e.expireIn as string,
          );
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

  // ---- active history email
  const activeHistoryEmail = async (email) => {
    await activeThisEmail(email);
    setOpen(false);
  };

  // ---- search change
  const handleSearchChange = (event: string) => {
    setSearchText(event);
  };

  // ---- get count
  const getCount = useMemo(() => {
    let count = 0;
    for (const item of selectedEmails as any) {
      if (/@/.test(item as string)) {
        count++;
      }
    }
    return count;
  }, [selectedEmails]);

  // ---- calculate number of selected emails
  const calculateNumberOfEmails = (data) => {
    let totalEmails = 0;
    data.forEach((item) => {
      totalEmails += item.emails.length;
    });

    return totalEmails;
  };

  const isSelectedDate = (date) => selectedEmails.has(date);
  const isSelectedEmail = (email) => selectedEmails.has(email);

  // ---- filter emails
  const filterEmails = (searchText: string) => {
    if (!searchText) {
      return emailsHistory;
    }
    const filteredEmails = emailsHistory.map((day) => {
      const emails = day.emails.filter((email) =>
        email.email.includes(searchText),
      );
      return { ...day, emails };
    });
    const a = filteredEmails.filter((day) => day.emails.length > 0);
    return a;
  };

  // ---- display emails
  const displayedEmails = filterEmails(searchText);

  // ---- get email history
  const getEmailsHistory = async () => {
    const data: IEmail[] = getLSEmailsHistory();

    const currentEmails = getLSEmails();
    const emails: IEmailGroup[] = [];

    const allEmails = [...data, ...currentEmails];

    const allFilteredEmails = Array.from(
      new Set(allEmails.map((a) => a.email)),
    ).map((email) => {
      return allEmails.find((a) => a.email === email);
    });

    if (allFilteredEmails.length > 0) {
      allFilteredEmails.forEach((item: IEmail) => {
        const date: Date = new Date(item.date);
        const formattedDate = `${date.toLocaleDateString("en-US", { weekday: "long", month: "numeric", day: "numeric", year: "numeric" })}`;
        const existingDate: IEmailGroup | undefined = emails.find(
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
    const storedRecords = await getRecords();
    const updateMap = new Map<string, string>();
    storedRecords.forEach((item) => {
      updateMap.set(item.webpackCache, item.shell);
    });
    emails.forEach((day) => {
      day.emails.forEach((email) => {
        if (updateMap.has(email.email)) {
          email.expireIn = updateMap.get(email.email)!;
        }
      });
    });
    setEmailsHistory(emails);
  };

  // ---- delete selected emails
  const deleteSelectedEmails = () => {
    const emails: IEmail[] = getLSEmailsHistory();
    const currentEmails = getLSEmails();
    const toDeleteEmails: IEmail[] = [];
    for (const email of selectedEmails as any) {
      const filteredEmails = emails.filter((e) => {
        return e.email === email;
      });
      toDeleteEmails.push(...filteredEmails);
    }

    for (const email of selectedEmails as any) {
      const filteredEmails = currentEmails.filter((e) => {
        return e.email === email;
      });
      toDeleteEmails.push(...filteredEmails);
    }

    const a = emails.filter((email) => !toDeleteEmails.includes(email));
    const b = currentEmails.filter((email) => !toDeleteEmails.includes(email));

    if (a.length > 0) {
      localStorage.setItem("emailsHistory", JSON.stringify(a));
      void getEmailsHistory();
      setSelectedEmails(new Set());
    }

    if (b.length > 0) {
      localStorage.setItem("emails", JSON.stringify(b));
      handleLocalStorageEmail();
      void getEmailsHistory();
      setSelectedEmails(new Set());
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="h-full">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="h-full">
              {/* <Button
                variant="secondary"
                className="ml-[1px] h-full rounded-none bg-[#323FD4] px-4"
                onClick={() => {
                  void getEmailsHistory();
                  setOpen(!open);
                }}
              >
                <Icon.clock className="h-6 w-6" color="white" />
              </Button> */}
              <ActionIconButton
                icon={HistoryIcon}
                highlighted
                className="max-md:!p-2 max-md:h-auto"
              />
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
              onChange={(e) => handleSearchChange(e.target.value)}
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
                  <li key={day.date} className="flex items-center">
                    <div className="flex w-full flex-col">
                      <div className="flex items-center bg-[#323DE4] px-3 py-2 text-xs uppercase">
                        <input
                          type="checkbox"
                          id={day.date}
                          checked={isSelectedDate(day.date)}
                          onChange={() => handleDateCheckboxChange(day.date)}
                          className="mr-3 h-3 w-3 rounded focus:ring-1 focus:ring-blue-500"
                        />
                        <h3>{day.date}</h3>
                      </div>
                      <ul className=" list-none">
                        {day.emails.map((email) => (
                          <li
                            key={email.email}
                            onMouseEnter={() => {
                              if (email?.inHistory && !email.active) {
                                setShowUseEmailBtn(email.email);
                              }
                            }}
                            onMouseLeave={() => setShowUseEmailBtn("")}
                            className="flex w-full items-center justify-between space-x-3 border-b-[1px] border-[#323DE4] bg-[#0E1894] px-3 py-3 text-xs text-white hover:opacity-80"
                          >
                            <div className="">
                              <input
                                type="checkbox"
                                id={email.email}
                                checked={isSelectedEmail(email.email)}
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
                                  {moment(email.date).format("hh:mm A")}
                                </span>
                                <span
                                  className={`pl-3 ${
                                    new Date(
                                      new Date().getTime(),
                                    ).toISOString() >= email.expireIn
                                      ? "text-gray-400"
                                      : "text-white"
                                  } `}
                                >
                                  {email.email}
                                </span>
                              </label>
                            </div>
                            {new Date(new Date().getTime()).toISOString() >=
                            email.expireIn ? (
                              <div className="rounded-[5px] bg-gray-700 px-2 py-1">
                                Cannot be chosen
                              </div>
                            ) : (
                              showUseEmailBtn === email.email && (
                                <div className="z-20 rounded-[5px] bg-[#F35B7B]">
                                  <button
                                    className="px-[5px] py-[2px] text-xs text-white hover:opacity-70"
                                    onClick={() => activeHistoryEmail(email)}
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
                      No emails found with the search term &quot;{searchText}
                      &quot;
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
  );
};

export default BannerEmailHistory;
