"use client";
import { Logo } from "@shared/components/Logo";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import { RadioGroup, RadioGroupItem } from "@ui/components/radio-group";
import { cn } from "@ui/lib";
import Image from "next/image";
import { useState } from "react";
// import { Modal } from "react-responsive-modal";
import dynamic from "next/dynamic";
import useSubscriptionModalStore from "../../../../hooks/useSubscriptionModal";

const Modal = dynamic(() => import("react-responsive-modal"), {
  ssr: false,
});

const SubscriptionModal = () => {
  const { open, setOpen } = useSubscriptionModalStore();
  const [packLength, setPackLength] = useState("option-one");
  const [paymentOption, setPaymentOption] = useState("p-option-one");
  return (
    <div>
      <Modal
        role="dialog"
        center
        open={open}
        blockScroll={false}
        onClose={() => setOpen(false)}
        showCloseIcon={false}
        closeOnOverlayClick={false}
        onOverlayClick={() => setOpen(false)}
        classNames={{
          modal:
            "p-0 z-[100]  m-0  my-auto  p-0 sm:max-w-[1200px] mx-auto rounded-3xl",
        }}
      >
        <div className="relative">
          <div className="grid md:grid-cols-2 ">
            <div className="bg-primary-dark  order-2 rounded-s-3xl px-5 py-8 text-white md:order-1 flex items-center justify-center">
              <div>
              <div className="mb-3">
                <p className="text-center text-xl uppercase text-white">
                  Plans Comparator
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white">
                <table className="w-full  border-collapse rounded-md">
                  <tbody className="">
                    <tr className="h-12 rounded-md  ">
                      <td className="w-[272px]  border-b border-r border-white bg-[#4F5ADA] px-4  py-2 text-xl text-white">
                        Name
                      </td>
                      <td className="w-[128px]  border-b border-r border-white bg-[#4F5ADA] px-4 py-2 text-center">
                        <p className=" rounded-full bg-white px-3 py-1 font-semibold text-black">
                          Premium
                        </p>
                      </td>
                      <td className="w-[128px] border-b border-white bg-[#4F5ADA] px-4 py-2 text-center">
                        <p className=" bg-primary-gradient rounded-full  px-3 py-1">
                          Privet
                        </p>
                      </td>
                    </tr>
                    <tr className="h-12 cursor-pointer rounded-md hover:bg-[#4F5ADA]  ">
                      <td className="w-[272px]  border-b border-r border-white px-4  py-2  text-white">
                        <div className="flex items-center gap-2">
                          <p> Custom domains</p>
                          <Image
                            src="/images/icons/question-circle.svg"
                            alt="icon"
                            width={16}
                            height={16}
                          />
                        </div>
                      </td>
                      <td className="w-[128px]  border-b border-r border-white px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          <Image
                            src="/images/icons/minus-white.svg"
                            alt="icon"
                            width={20}
                            height={20}
                          />
                        </div>
                      </td>
                      <td className="w-[128px] border-b border-white  px-4 py-2 text-center">
                        10
                      </td>
                    </tr>
                    <tr className="h-12 cursor-pointer rounded-md hover:bg-[#4F5ADA] ">
                      <td className="w-[272px]  border-b border-r border-white px-4  py-2  text-white">
                        <div className="flex items-center gap-2">
                          <p> No ads</p>
                        </div>
                      </td>
                      <td className="w-[128px]  border-b border-r border-white px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          <Image
                            src="/images/icons/minus-white.svg"
                            alt="icon"
                            width={20}
                            height={20}
                          />
                        </div>
                      </td>
                      <td className="w-[128px] border-b border-white  px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          <Image
                            src="/images/icons/checked.svg"
                            alt="icon"
                            width={24}
                            height={24}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="h-12 cursor-pointer rounded-md hover:bg-[#4F5ADA] ">
                      <td className="w-[272px]  border-b border-r border-white px-4  py-2  text-white">
                        <div className="flex items-center gap-2">
                          <p> Emails at the same time</p>
                        </div>
                      </td>
                      <td className="w-[128px]  border-b border-r border-white px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          2
                        </div>
                      </td>
                      <td className="w-[128px] border-b border-white  px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          10
                        </div>
                      </td>
                    </tr>
                    <tr className="h-12 cursor-pointer rounded-md hover:bg-[#4F5ADA] ">
                      <td className="w-[272px]  border-b border-r border-white px-4  py-2  text-white">
                        <div className="flex items-center gap-2">
                          <p> Messages storage time (days)</p>
                        </div>
                      </td>
                      <td className="w-[128px]  border-b border-r border-white px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          1
                        </div>
                      </td>
                      <td className="w-[128px] border-b border-white  px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          30
                        </div>
                      </td>
                    </tr>
                    <tr className="h-12 cursor-pointer rounded-md hover:bg-[#4F5ADA] ">
                      <td className="w-[272px]  border-b border-r border-white   px-4  py-2 text-white">
                        <div className="flex items-center gap-2">
                          <p> History size</p>
                        </div>
                      </td>
                      <td className="w-[128px]  border-b border-r border-white  px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          50
                        </div>
                      </td>
                      <td className="w-[128px] border-b border-white   px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          500
                        </div>
                      </td>
                    </tr>
                    <tr className="h-12 cursor-pointer rounded-md hover:bg-[#4F5ADA] ">
                      <td className="w-[272px]  border-b border-r border-white px-4  py-2  text-white">
                        <div className="flex items-center gap-2">
                          <p>Premium domains</p>
                        </div>
                      </td>
                      <td className="w-[128px]  border-b border-r border-white px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          <Image
                            src="/images/icons/minus-white.svg"
                            alt="icon"
                            width={20}
                            height={20}
                          />
                        </div>
                      </td>
                      <td className="w-[128px] border-b border-white  px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          <Image
                            src="/images/icons/checked.svg"
                            alt="icon"
                            width={24}
                            height={24}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="h-12 cursor-pointer rounded-md hover:bg-[#4F5ADA] ">
                      <td className="w-[272px]  border-b border-r border-white px-4  py-2  text-white">
                        <div className="flex items-center gap-2">
                          <p>Cloud history sync</p>
                        </div>
                      </td>
                      <td className="w-[128px]  border-b border-r border-white px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          <Image
                            src="/images/icons/minus-white.svg"
                            alt="icon"
                            width={20}
                            height={20}
                          />
                        </div>
                      </td>
                      <td className="w-[128px] border-b border-white  px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          <Image
                            src="/images/icons/checked.svg"
                            alt="icon"
                            width={24}
                            height={24}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="h-12 cursor-pointer rounded-md hover:bg-[#4F5ADA] ">
                      <td className="w-[272px]  border-b border-r border-white px-4  py-2  text-white">
                        <div className="flex items-center gap-2">
                          <p>Unlimited forwarding</p>
                        </div>
                      </td>
                      <td className="w-[128px]  border-b border-r border-white px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          <Image
                            src="/images/icons/minus-white.svg"
                            alt="icon"
                            width={20}
                            height={20}
                          />
                        </div>
                      </td>
                      <td className="w-[128px] border-b border-white  px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          <Image
                            src="/images/icons/checked.svg"
                            alt="icon"
                            width={24}
                            height={24}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="h-12 cursor-pointer rounded-md hover:bg-[#4F5ADA] ">
                      <td className="w-[272px]  border-r border-white px-4  py-2  text-white">
                        <div className="flex items-center gap-2">
                          <p>Inbox in extensions</p>
                        </div>
                      </td>
                      <td className="w-[128px]   border-r border-white px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          <Image
                            src="/images/icons/minus-white.svg"
                            alt="icon"
                            width={20}
                            height={20}
                          />
                        </div>
                      </td>
                      <td className="w-[128px]   px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          <Image
                            src="/images/icons/checked.svg"
                            alt="icon"
                            width={24}
                            height={24}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-5">
                <p className="text-xl uppercase">WE ARE WORKING ON:</p>
                <div className="mt-4 flex gap-3">
                  <p className=" flex items-center justify-center gap-2 rounded-full bg-white px-4 py-1 font-semibold text-black">
                    <Image
                      src="/images/icons/clock.svg"
                      alt="icon"
                      width={16}
                      height={16}
                    />
                    <span className="text-sm">API</span>
                  </p>
                  <p className=" flex items-center justify-center gap-2 rounded-full bg-white px-4 py-1 font-semibold text-black">
                    <Image
                      src="/images/icons/clock.svg"
                      alt="icon"
                      width={16}
                      height={16}
                    />
                    <span className="text-sm">And More</span>
                  </p>
                </div>
              </div>
              </div>
            </div>
            <div className="order-1 px-5 py-8 md:order-2">
              <div className="flex items-center justify-between pb-3">
                <div>
                  <Logo />
                </div>
                <div className="flex">
                  <button className="bg-primary-gradient hover:bg-secondary-gradient w-24 rounded-s-md px-3 py-2 text-center text-white">
                    Premium
                  </button>
                  <button className="border-primary-gradient hover:border-secondary-gradient text-primary-gradient gradient-border w-24 rounded-e-md  border px-3 py-2 text-center">
                    Privet
                  </button>
                </div>
              </div>
              <hr />
              <div className="mt-4">
                <RadioGroup
                  defaultValue={packLength}
                  onValueChange={(value) => {
                    setPackLength(value);
                  }}
                >
                  <Label
                    htmlFor="l-option-one"
                    className={cn(
                      "flex h-14 cursor-pointer items-center justify-between rounded-md border border-[#1B1C1D1F] px-4",
                      packLength === "option-one" && "border-primary border",
                    )}
                  >
                    <div>
                      <RadioGroupItem value="option-one" id="l-option-one" />
                      <span className="ml-2">1 Month</span>
                    </div>
                    <div>
                      <p className="font-semibold">$2.99</p>
                    </div>
                  </Label>
                  <Label
                    htmlFor="option-two"
                    className={cn(
                      "flex h-14 cursor-pointer items-center justify-between rounded-md border border-[#1B1C1D1F] px-4",
                      packLength === "option-two" && "border-primary border",
                    )}
                  >
                    <div>
                      <RadioGroupItem value="option-two" id="option-two" />
                      <span className="ml-2">1 Year</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className=" bg-primary-gradient rounded-full px-3 py-2 text-white">
                        2 Monts Free
                      </p>
                      <p className="font-semibold">$29.99</p>
                    </div>
                  </Label>
                </RadioGroup>

                <p className="my-3 font-semibold">
                  Select your preferred method of payment:
                </p>
                <RadioGroup
                  defaultValue={paymentOption}
                  onValueChange={(value) => {
                    setPaymentOption(value);
                  }}
                >
                  <Label
                    htmlFor="p-option-one"
                    className={cn(
                      "flex h-24 cursor-pointer items-center justify-between rounded-md border border-[#1B1C1D1F] px-4",
                      paymentOption === "p-option-one" &&
                        "border-primary border",
                    )}
                  >
                    <div>
                      <div>
                        <RadioGroupItem
                          value="p-option-one"
                          id="p-option-one"
                        />
                        <span className="ml-2">Credit Card or PayPal</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <Image
                          src="/images/pricing-plan/Paypal1.svg"
                          alt="icon"
                          width={32}
                          height={24}
                        />
                        <Image
                          src="/images/pricing-plan/Visa.svg"
                          alt="icon"
                          width={32}
                          height={24}
                        />
                        <Image
                          src="/images/pricing-plan/Mastercard.svg"
                          alt="icon"
                          width={32}
                          height={24}
                        />
                        <Image
                          src="/images/pricing-plan/Amex.svg"
                          alt="icon"
                          width={32}
                          height={24}
                        />
                        <Image
                          src="/images/pricing-plan/Wise.svg"
                          alt="icon"
                          width={32}
                          height={24}
                        />

                        <button className="text-[12px] text-blue-500 underline">
                          And More
                        </button>
                      </div>
                    </div>
                  </Label>
                  <Label
                    htmlFor="p-option-two"
                    className={cn(
                      "flex h-24 cursor-pointer items-center justify-between rounded-md border border-[#1B1C1D1F] px-4",
                      paymentOption === "p-option-two" &&
                        "border-primary border",
                    )}
                  >
                    <div>
                      <div>
                        <RadioGroupItem
                          value="p-option-two"
                          id="p-option-two"
                        />
                        <span className="ml-2">Cryptocurrencies</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <Image
                          src="/images/pricing-plan/Bitcoin.svg"
                          alt="icon"
                          width={32}
                          height={24}
                        />
                        <Image
                          src="/images/pricing-plan/Binance.svg"
                          alt="icon"
                          width={32}
                          height={24}
                        />
                        <Image
                          src="/images/pricing-plan/Swift.svg"
                          alt="icon"
                          width={32}
                          height={24}
                        />

                        <button className="text-[12px] text-blue-500 underline">
                          And More
                        </button>
                      </div>
                    </div>
                  </Label>
                </RadioGroup>

                <div className="border-primary mt-3  rounded-md border-l-4 bg-[#323FD414] px-6 py-4">
                  <p className="font-semibold">
                    You can make a refund within 30 days after the subscription.
                    Cancel anytime.
                  </p>
                </div>
                <div className="mt-3 ">
                  <Input placeholder="Enter your real email" className="py-6" />
                </div>
                <div className="mt-3 ">
                  <p className="text-center">
                    By clicking &quot;Subscribe&quot; you agree to
                    <button className="ml-1 underline">Terms of Service</button>
                    .
                  </p>
                </div>
                <div className="mt-3 ">
                  <button className="bg-primary-gradient hover:bg-secondary-gradient w-full rounded-md py-3 text-white">
                    Subscribe
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <Image
                    src="/images/icons/lock-2-line.svg"
                    alt="icon"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />
                  <p>
                    Secure payments
                    <button className="ml-1 underline">Paddle</button>.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 right-10">
            <button
              className="bg-primary cursor-pointer rounded-full p-2"
              onClick={() => setOpen(false)}
            >
              <Image
                src="/images/icons/white-cross.svg"
                width={16}
                height={16}
                alt="icon"
              />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SubscriptionModal;
