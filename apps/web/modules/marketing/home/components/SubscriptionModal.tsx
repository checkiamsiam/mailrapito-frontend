"use client";
import { Logo } from "@shared/components/Logo";
import { Dialog, DialogContent } from "@ui/components/dialog";
import Image from "next/image";

const SubscriptionModal = () => {
  return (
    <div>
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent
          className="z-[100] m-0 max-h-[90vh] overflow-auto p-0 sm:max-w-[1200px]"
          closeButtonDisable
        >
          <div className="grid grid-cols-2">
            <div className="bg-primary-dark  p-9 text-white">
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
            <div className="p-9">
              <div className="flex justify-between items-center pb-4">
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
                  />
                </div>
              </div>
              <hr />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionModal;
