"use client";
import { Logo } from "@shared/components/Logo";
import { Dialog, DialogContent } from "@ui/components/dialog";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import { RadioGroup, RadioGroupItem } from "@ui/components/radio-group";
import { cn } from "@ui/lib";
import Image from "next/image";
import { useState } from "react";

const SubscriptionModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [packLength, setPackLength] = useState("option-one");
  const [paymentOption, setPaymentOption] = useState("p-option-one");
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="z-[100] m-0 max-h-[90vh] overflow-auto p-0 sm:max-w-[1200px]"
          closeButtonDisable
        >
          <div className="grid md:grid-cols-2">
            <div className="bg-primary-dark  order-2 p-9 text-white md:order-1">
              <div className="overflow-hidden rounded-2xl border border-white">
                <table className="w-full  border-collapse rounded-md">
                  <tbody className="">
                    <tr className="h-16 rounded-md  ">
                      <td className="w-[272px]  border-b border-r border-white bg-[#4F5ADA] px-4  py-2 text-xl text-white">
                        Name
                      </td>
                      <td className="w-[128px]  border-b border-r border-white bg-[#4F5ADA] px-4 py-2 text-center">
                        <p className=" rounded-full bg-white px-3 py-1 font-semibold text-black">
                          Free
                        </p>
                      </td>
                      <td className="w-[128px] border-b border-white bg-[#4F5ADA] px-4 py-2 text-center">
                        <p className=" bg-primary-gradient rounded-full  px-3 py-1">
                          Premium
                        </p>
                      </td>
                    </tr>
                    <tr className="h-16 rounded-md  ">
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
                    <tr className="h-16 rounded-md  ">
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
                    <tr className="h-16 rounded-md  ">
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
                    <tr className="h-16 rounded-md  ">
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
                    <tr className="h-16 rounded-md  ">
                      <td className="w-[272px]  border-b border-r border-white bg-[#4F5ADA]  px-4  py-2 text-white">
                        <div className="flex items-center gap-2">
                          <p> History size</p>
                        </div>
                      </td>
                      <td className="w-[128px]  border-b border-r border-white bg-[#4F5ADA] px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          50
                        </div>
                      </td>
                      <td className="w-[128px] border-b border-white  bg-[#4F5ADA] px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          500
                        </div>
                      </td>
                    </tr>
                    <tr className="h-16 rounded-md  ">
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
                    <tr className="h-16 rounded-md  ">
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
                    <tr className="h-16 rounded-md  ">
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
                    <tr className="h-16 rounded-md  ">
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
              <div className="mt-6">
                <p className="text-2xl">Will Be Avialable Soon</p>
                <div className="mt-4 flex gap-3">
                  <p className=" flex items-center justify-center gap-2 rounded-full bg-white p-3 font-semibold text-black">
                    <Image
                      src="/images/icons/clock.svg"
                      alt="icon"
                      width={24}
                      height={24}
                    />
                    <span>API</span>
                  </p>
                  <p className=" flex items-center justify-center gap-2 rounded-full bg-white p-3 font-semibold text-black">
                    <Image
                      src="/images/icons/clock.svg"
                      alt="icon"
                      width={24}
                      height={24}
                    />
                    <span>And More</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 p-9 md:order-2">
              <div className="flex items-center justify-between pb-4">
                <div>
                  <Logo />
                </div>
                <div>
                  <Image
                    src="/images/icons/close-icon.svg"
                    alt="icon"
                    width={16}
                    height={16}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
              </div>
              <hr />
              <div className="mt-6">
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

                <p className="my-4 font-semibold">
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

                        <a
                          href="#"
                          className="text-[12px] text-blue-500 underline"
                        >
                          And More
                        </a>
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

                        <a
                          href="#"
                          className="text-[12px] text-blue-500 underline"
                        >
                          And More
                        </a>
                      </div>
                    </div>
                  </Label>
                </RadioGroup>

                <div className="border-primary mt-5  rounded-md border-l-4 bg-[#323FD414] px-6 py-4">
                  <p className="font-semibold">
                    You can make a refund within 30 days after the subscription.
                    Cancel anytime.
                  </p>
                </div>
                <div className="mt-5 ">
                  <Input placeholder="Enter your real email" className="py-6" />
                </div>
                <div className="mt-5 ">
                  <p className="text-center">
                    By clicking "Subscribe" you agree to
                    <a href="#" className="ml-1 underline">
                      Terms of Service
                    </a>{" "}
                    .
                  </p>
                </div>
                <div className="mt-5 ">
                  <button className="bg-primary-gradient w-full rounded-md py-3 text-white">
                    Subscribe
                  </button>
                </div>
                <div className="mt-5 flex items-center justify-center gap-2">
                  <Image
                    src="/images/icons/lock-2-line.svg"
                    alt="icon"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />
                  <p>
                    Secure payments
                    <a href="#" className="ml-1 underline">
                      Paddle
                    </a>{" "}
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionModal;
