"use client";
import CloseIcon from "@shared/icons/CloseIcon";
import DeleteIcon from "@shared/icons/DeleteIcon";
import SendIcon from "@shared/icons/SendIcon";
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
import ReCAPTCHA from "react-google-recaptcha";

const Modal = dynamic(() => import("react-responsive-modal"), {
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
          <div className="mt-6 overflow-hidden rounded-md border  ">
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
          <div className="mt-6 flex justify-between">
            <div className="w-[46%]">
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
            <div className="flex w-[8%] items-center justify-center ">
              <SendIcon className="mt-10" />
            </div>
            <div className="w-[46%]">
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
              <div className="flex items-center justify-center lg:col-span-6 xl:col-span-7">
                <Input
                  type="number"
                  placeholder="Enter Duration"
                  className="focus-visible::border-transparent w-full border-none text-[16px] outline-none focus:outline-none focus-visible:ring-0"
                  disabled={duration !== 0}
                />
              </div>

              <div className="lg:col-span-6 xl:col-span-5">
                <div className="flex gap-[2px]  overflow-hidden rounded-md">
                  <button
                    onClick={() => setDuration(9)}
                    className={cn(
                      `w-[112px] bg-white p-4 text-center text-[#495057]`,
                      duration === 9 && "border-primary border-b-[3px]",
                    )}
                  >
                    9 days
                  </button>
                  <button
                    onClick={() => setDuration(45)}
                    className={cn(
                      `w-[112px] bg-white p-4 text-center text-[#495057]`,
                      duration === 45 && "border-primary border-b-[3px]",
                    )}
                  >
                    45 days
                  </button>
                  <button
                    onClick={() => setDuration(90)}
                    className={cn(
                      `w-[112px] bg-white p-4 text-center text-[#495057]`,
                      duration === 90 && "border-primary border-b-[3px]",
                    )}
                  >
                    90 days
                  </button>
                  <button
                    onClick={() => setDuration(0)}
                    className={cn(
                      `w-[112px] bg-white p-4 text-center text-[#495057]`,
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
            would be sent to the selected email will be also sent to your real
            email.
          </p>
          <div className="mt-6 flex justify-between">
            <div className="relative">
              <ReCAPTCHA
                sitekey="6LdUz-4pAAAAADLtRLmlVIRjxUml7TQye2laJaJb"
               className="absolute top-0 left-0"
              />
            </div>

            <div className="flex gap-3">
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
