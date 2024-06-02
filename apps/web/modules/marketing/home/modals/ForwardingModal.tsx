"use client";
import CloseIcon from "@shared/icons/CloseIcon";
import DeleteIcon from "@shared/icons/DeleteIcon";
import SendIcon from "@shared/icons/SendIcon";
import TimerIcon from "@shared/icons/TimerIcon";
import { Input } from "@ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/select";
import { cn } from "@ui/lib";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useState } from "react";

const Modal = dynamic(() => import("react-responsive-modal"), {
  ssr: false,
});
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
});

const ForwardingModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [duration, setDuration] = useState(45);
  return (
    <div>
      <Modal
        role="dialog"
        center
        open={open}
        blockScroll={false}
        onClose={() => setOpen(false)}
        closeIcon={
          <div>
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#DEE2E6]">
              <CloseIcon />
            </div>
          </div>
        }
        closeOnOverlayClick={false}
        onOverlayClick={() => setOpen(false)}
        classNames={{
          modal:
            "z-[100]  m-0  my-auto  p-10 xl:min-w-[1107px] md:min-w-[90vw] mx-auto rounded-3xl",
        }}
      >
        <div>
          <h5 className="mb-2 text-[28px] font-semibold">Forwarding</h5>
          <p className="text-[#868E96] max-sm:hidden">
            Forwarding service redirects incoming emails to your email address,
            making it easier to stay organized and not miss important messages.
          </p>
          <p className="text-[#868E96] sm:hidden">
            Input your real email and choose duration
          </p>
          <div className="mt-6 overflow-hidden rounded-md border max-lg:hidden ">
            <div className="grid grid-cols-12 ">
              {/* header part */}
              <div className="col-span-4">
                <p className="bg-[#F8F9FA] px-7 py-2 text-[20px] text-[#7C7D81]">
                  From
                </p>
              </div>
              <div className="col-span-4">
                <p className="bg-[#F8F9FA] px-7 py-2  text-[20px] text-[#7C7D81]">
                  Redirected to
                </p>
              </div>
              <div className="col-span-3">
                <p className="bg-[#F8F9FA] px-7 py-2 text-[20px] text-[#7C7D81] ">
                  Expire in
                </p>
              </div>
              <div className="col-span-1 bg-[#F8F9FA]" />
              {/* items loop  */}
              {[1].map((item) => (
                <>
                  <div className="col-span-4 border-b ">
                    <p className=" px-7 py-4 text-[20px] ">
                      randomjack123@domain1.com
                    </p>
                  </div>
                  <div className="col-span-4 border-b">
                    <p className=" px-7 py-4 text-[20px] ">
                      randomjack123@gmail.com
                    </p>
                  </div>
                  <div className="col-span-3 border-b">
                    <p className=" px-7 py-4 text-[20px] font-semibold">
                      3 month
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-center border-b">
                    <button className="flex items-center justify-center">
                      <DeleteIcon width={20} height={20} color="#7C7D81" />
                    </button>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="bg-primary-light-gradient mt-6 rounded-md p-3 lg:hidden">
            <p className="rounded-md bg-white px-[10px] py-[10px] text-center text-[18px]">
              randomjack123@domain1.com
            </p>
            <div className="my-3 flex items-center justify-center">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.5 17.883V16L23.5 19L18.5 22V19.91C16.9714 19.6911 15.5249 19.0826 14.2995 18.143C13.0741 17.2034 12.1111 15.9644 11.503 14.545L11.5 14.54L11.497 14.546C10.8031 16.1647 9.64947 17.5443 8.17909 18.5138C6.70872 19.4833 4.98621 20 3.225 20H2.5V18H3.225C4.59498 18 5.93484 17.5979 7.07852 16.8437C8.2222 16.0895 9.11942 15.0162 9.659 13.757L10.412 12L9.659 10.243C9.11942 8.98375 8.2222 7.91052 7.07852 7.1563C5.93484 6.40208 4.59498 6.00004 3.225 6H2.5V4H3.225C4.98632 4.00008 6.70891 4.51698 8.1793 5.48663C9.64968 6.45628 10.8032 7.83607 11.497 9.455L11.5 9.46L11.503 9.454C12.1112 8.0348 13.0743 6.79594 14.2997 5.85654C15.5251 4.91714 16.9715 4.3088 18.5 4.09V2L23.5 5L18.5 8V6.117C17.3669 6.32694 16.3031 6.81339 15.4032 7.53315C14.5032 8.25292 13.7949 9.18374 13.341 10.243L12.588 12L13.341 13.757C13.7949 14.8163 14.5032 15.7471 15.4032 16.4668C16.3031 17.1866 17.3669 17.6731 18.5 17.883Z"
                  fill="url(#paint0_linear_172_1070)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_172_1070"
                    x1="4.18"
                    y1="2.9"
                    x2="20.1664"
                    y2="24.5556"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#323FD4" />
                    <stop offset="1" stop-color="#F55B7A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="rounded-md bg-white px-[10px] py-[10px] text-center text-[18px]">
              randomjack123@domain1.com
            </p>
            <div className="pt-5 px-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <p className="text-[18px]">
                    Left <span className="font-bold">3 mounth</span>
                  </p>
                  <TimerIcon/>
                </div>
                <div className="flex  items-center">
                  <button className="bg-primary h-[37px] w-[37px] rounded-full flex items-center justify-center">
                    <DeleteIcon width={20} height={20} color="white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between max-lg:flex-col">
            <div className="w-full lg:w-[46%]">
              <div className="mb-2 flex justify-between">
                <p className="text-[#7C7D81]">Email From</p>
                <div className="flex gap-2">
                  <button className="bg-primary rounded-sm px-2 py-1 text-[12px] text-white">
                    Random
                  </button>
                  <button className="rounded-sm bg-[#F1F3F5] px-2 py-1 text-[12px] text-[#868E96]">
                    Current
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-12 rounded-lg bg-[#F8F9FA] p-4 ">
                <Input
                  type="text"
                  placeholder="Email"
                  className="focus-visible::border-transparent col-span-6 border-none text-[16px] outline-none focus:outline-none focus-visible:ring-0"
                />
                <div className="col-span-1 flex items-center justify-center">
                  <svg
                    width="1"
                    height="36"
                    viewBox="0 0 1 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="1" height="36" fill="#CED4DA" />
                  </svg>
                </div>

                <div className="col-span-5">
                  <Select defaultValue="pirolsnet.com">
                    <SelectTrigger
                      className="focus-visible::border-transparent w-[180px] border-none text-[16px] outline-none focus:outline-none focus-visible:ring-0"
                      icon={<ChevronDown className="h-4 w-4 opacity-50" />}
                    >
                      <SelectValue placeholder="Select Domain" />
                    </SelectTrigger>
                    <SelectContent className="relative z-[9999]">
                      <SelectItem value="pirolsnet.com">
                        pirolsnet.com
                      </SelectItem>
                      <SelectItem value="ddock.com">ddock.com</SelectItem>
                      <SelectItem value="palsma.com">palsma.com</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-center lg:w-[8%] ">
              <SendIcon className="mt-10" />
            </div>
            <div className="w-full lg:w-[46%]">
              <div className="mb-2 flex justify-between">
                <p className="text-[#7C7D81]">To Email (your real email)</p>
              </div>
              <div className="grid grid-cols-12 rounded-lg bg-[#F8F9FA] p-4 ">
                <Input
                  type="text"
                  placeholder="Email"
                  className="focus-visible::border-transparent col-span-6 border-none text-[16px] outline-none focus:outline-none focus-visible:ring-0"
                />
                <div className="col-span-1 flex items-center justify-center">
                  <svg
                    width="1"
                    height="36"
                    viewBox="0 0 1 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="1" height="36" fill="#CED4DA" />
                  </svg>
                </div>

                <div className="col-span-5">
                  <Select defaultValue="pirolsnet.com">
                    <SelectTrigger
                      className="focus-visible::border-transparent w-[180px] border-none text-[16px] outline-none focus:outline-none focus-visible:ring-0"
                      icon={<ChevronDown className="h-4 w-4 opacity-50" />}
                    >
                      <SelectValue placeholder="Select Domain" />
                    </SelectTrigger>
                    <SelectContent className="relative z-[9999]">
                      <SelectItem value="pirolsnet.com">
                        pirolsnet.com
                      </SelectItem>
                      <SelectItem value="ddock.com">ddock.com</SelectItem>
                      <SelectItem value="palsma.com">palsma.com</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-2 flex justify-between">
              <p className="text-[#7C7D81]">Duration (in minutes)</p>
              <div className="flex gap-2">
                <div className="rounded-sm bg-[#F1F3F5] px-2 py-1 text-[12px] text-[#868E96]">
                  Max. 90 Days
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 place-content-center rounded-lg bg-[#F8F9FA] px-4 py-2">
              <div className="flex items-center justify-center lg:col-span-6 xl:col-span-7 col-span-12 lg:order-1 order-2 max-md:pt-3 max-md:pb-2">
                <Input
                  type="number"
                  placeholder="Enter Duration"
                  className="focus-visible::border-transparent w-full border-none text-[16px] outline-none focus:outline-none focus-visible:ring-0 "
                  disabled={duration !== 0}
                />
              </div>

              <div className="lg:col-span-6 xl:col-span-5 col-span-12 lg:order-2 order-1">
                <div className="flex gap-[2px]  overflow-hidden rounded-md">
                  <button
                    onClick={() => setDuration(9)}
                    className={cn(
                      `md:w-[112px] w-full bg-white p-4 text-center text-[#495057]`,
                      duration === 9 && "border-primary border-b-[3px]",
                    )}
                  >
                    9 days
                  </button>
                  <button
                    onClick={() => setDuration(45)}
                    className={cn(
                      `md:w-[112px] w-full bg-white p-4 text-center text-[#495057]`,
                      duration === 45 && "border-primary border-b-[3px]",
                    )}
                  >
                    45 days
                  </button>
                  <button
                    onClick={() => setDuration(90)}
                    className={cn(
                      `md:w-[112px] w-full bg-white p-4 text-center text-[#495057]`,
                      duration === 90 && "border-primary border-b-[3px]",
                    )}
                  >
                    90 days
                  </button>
                  <button
                    onClick={() => setDuration(0)}
                    className={cn(
                      `md:w-[112px] w-full bg-white p-4 text-center text-[#495057]`,
                      duration === 0 && "border-primary border-b-[3px]",
                    )}
                  >
                    Custom
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-[#868E96]">
            Create your time-limited email forwarding and all messages that
            would be sent to the selected email will be also sent to your real
            email.
          </p>
          <div className="mt-6 md:flex justify-between">
            <div className="relative ">
              <ReCAPTCHA
                sitekey="6LdUz-4pAAAAADLtRLmlVIRjxUml7TQye2laJaJb"
                className="md:absolute left-0 top-0"
              />
            </div>

            <div className="flex gap-3 max-md:mt-5">
              <button className="bg-primary rounded-md px-[32px] py-[18px] text-white">
                FORWARD
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md border  border-[#495057] px-[32px] py-[18px] text-[#495057]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ForwardingModal;
