"use client";
import { Link } from "@i18n";
import CustomDomainModal from "@marketing/home/modals/CustomDomainModal";
import ForwardingModal from "@marketing/home/modals/ForwardingModal";
import { useUser } from "@saas/auth/hooks/use-user";
import PrimaryButton from "@shared/components/Button/PrimaryButton";
import { LocaleSwitch } from "@shared/components/LocaleSwitch";
import { Logo } from "@shared/components/Logo";
import LogoutIcon from "@shared/icons/LogoutIcon";
import { apiClient } from "@shared/lib/api-client";
import { Button } from "@ui/components/button";
import { Icon } from "@ui/components/icon";
import { Sheet, SheetContent, SheetTrigger } from "@ui/components/sheet";
import { User2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceCallback, useIsClient } from "usehooks-ts";

const ProfileModal = dynamic(
  () => import("@marketing/home/modals/ProfileModal"),
  {
    ssr: false,
  },
);

// ----------- Un Used -----------
// import { ColorModeToggle } from "@shared/components/ColorModeToggle";

const uniqueId = Date.now();
const email = "ksher1995@gmail.com";

export function NavBar() {
  const t = useTranslations();
  const { user, loaded: userLoaded } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isClient = useIsClient();
  const [isTop, setIsTop] = useState(true);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openForwardModal, setOpenForwardModal] = useState(false);
  const [openCustomDomainModal, setOpenCustomDomainModal] = useState(false);

  const createOrderMutation = apiClient.payments.createOrder.useMutation();

  const debouncedScrollHandler = useDebounceCallback(
    () => {
      setIsTop(window.scrollY <= 10);
    },
    150,
    {
      maxWait: 150,
    },
  );

  const handleOrder = async () => {
    try {
      await createOrderMutation.mutateAsync({
        orderId: String(uniqueId),
        email: email,
        status: "CREATED",
        plan: "1 year subscription",
      });

      handleOrderForm();

      console.log("success");
    } catch {
      console.log("error");
    }
  };

  const handleOrderForm = () => {
    // Create a form element
    const form = document.createElement("form");
    form.action = "https://www.coinpayments.net/index.php";
    form.method = "post";

    // Function to add hidden input fields
    const addHiddenInput = (name, value) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    // Add hidden inputs
    addHiddenInput("cmd", "_pay_simple");
    addHiddenInput("reset", "0");
    addHiddenInput(
      "merchant",
      process.env.NEXT_PUBLIC_COINPAYMENT_MERCHANT_ID ?? "",
    );
    addHiddenInput("item_name", "1 year subscription");
    addHiddenInput("currency", "USD");
    addHiddenInput("amountf", "29.90");
    addHiddenInput(
      "ipn_url",
      process.env.NEXT_PUBLIC_COINPAYMENT_IPN_URL ?? "",
    );
    addHiddenInput("email", email);
    addHiddenInput("success_url", "http://localhost:3000");
    addHiddenInput("cancel_url", "http://localhost:3000");
    addHiddenInput(
      "custom",
      JSON.stringify({
        orderId: uniqueId,
        status: "CREATED",
        email: email,
        plan: "1 year subscription",
      }),
    );

    // Append form to body and submit it
    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    window.addEventListener("scroll", debouncedScrollHandler);
    debouncedScrollHandler();
    return () => {
      window.removeEventListener("scroll", debouncedScrollHandler);
    };
  }, [debouncedScrollHandler]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const menuItems: {
    label: string;
    href: string;
  }[] = [
    {
      label: t("common.menu.howItWork"),
      href: `/#work-process`,
    },
    {
      label: t("common.menu.features"),
      href: `/#features`,
    },
    {
      label: t("common.menu.pricing"),
      href: `/#pricing`,
    },
    {
      label: t("common.menu.blog"),
      href: `/#blog`,
    },
  ];

  return (
    <nav
      className={`bg-background/80 fixed left-0 top-0 z-50 w-full backdrop-blur-lg ${isTop ? "shadow-none" : "shadow-sm"} transition-[box-shadow] duration-200`}
      data-test="navigation"
    >
      {/* <Banner /> */}

      <div className="container">
        <div
          className={`flex items-center justify-between gap-6 ${isTop ? "py-[18px]" : "py-3"} transition-[padding] duration-200`}
        >
          <div className="flex items-center justify-start gap-1">
            <Sheet
              open={mobileMenuOpen}
              onOpenChange={(open) => setMobileMenuOpen(open)}
            >
              <SheetTrigger asChild>
                <Button
                  className="md:hidden "
                  size="icon"
                  variant="ghost"
                  aria-label="Menu"
                >
                  <Icon.menu color="black" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[250px] bg-white" side="right">
                <div className="flex flex-col items-start justify-center">
                  {menuItems.map((menuItem) => (
                    <Link
                      key={menuItem.href}
                      href={menuItem.href}
                      className="block px-3 py-2 text-lg duration-200"
                    >
                      {menuItem.label}
                    </Link>
                  ))}

                  {isClient && userLoaded && (
                    <>
                      <PrimaryButton className="mt-4 w-full rounded-lg text-base">
                        {user ? (
                          <Link href="/app">{t("common.menu.dashboard")}</Link>
                        ) : (
                          <Link href="/auth/login">
                            {t("common.menu.login")}
                          </Link>
                        )}
                      </PrimaryButton>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <Link
              href="/"
              className="block hover:no-underline active:no-underline"
            >
              <Logo />
            </Link>
          </div>

          <div className="hidden items-center justify-center gap-6 lg:flex">
            {menuItems.map((menuItem) => (
              <Link
                key={menuItem.href}
                href={menuItem.href}
                className="text-text-grayText hover:text-primary block px-3 py-2 text-[14px] font-medium"
              >
                {menuItem.label}
              </Link>
            ))}
            <div>
              <Button
                className="rounded-lg bg-red-500 px-8 py-6 text-base"
                variant="default"
                onClick={handleOrder}
              >
                Test Payment
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            {/* <ColorModeToggle /> */}
            <div>
              <LocaleSwitch />
            </div>

            {isClient && userLoaded && (
              <>
                {user ? (
                  <Link
                    href="/app"
                    className="bg-primary-dark flex  items-center justify-center gap-2 rounded-[10px] px-5  py-4 text-white transition-all duration-300 hover:bg-black hover:text-white md:rounded-[14px]"
                  >
                    <User2Icon />
                    <span className="font-semibold uppercase max-md:hidden">
                      {t("common.menu.dashboard")}
                    </span>
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    className="bg-primary-dark flex  items-center justify-center gap-2 rounded-[10px] px-5  py-4 text-white transition-all duration-300 hover:bg-black hover:text-white md:rounded-[14px] "
                  >
                    <User2Icon />
                    <span className="font-semibold uppercase max-md:hidden">
                      {t("common.menu.login")}
                    </span>
                  </Link>
                )}
              </>
            )}

            <>
              <button
                onClick={() => setOpenProfileModal(true)}
                className="flex items-center gap-2 rounded-[12px] bg-[#F4F5FB] px-2 py-[5px] max-md:hidden"
              >
                {/* <div className="relative h-12 w-12 "> */}
                <Image
                  src="/images/avatar/avatar3.png"
                  alt="close"
                  // layout="fill"
                  width={52}
                  height={52}
                />
                {/* </div> */}
                <div className="text-left">
                  <p className="text-primary-gradient text-[20px] font-bold">
                    Premium
                  </p>
                  <p className="text-[12px] text-[#7C7D81]">Remain 100days</p>
                </div>
                <div>
                  <div
                    className="ml-1 flex h-[52px] w-[52px] items-center justify-center rounded-[15px] bg-white"
                    style={{
                      boxShadow: "0px 4px 4px 0px #00000040",
                    }}
                  >
                    <LogoutIcon />
                  </div>
                </div>
              </button>
            </>
          </div>
        </div>
      </div>
      <ProfileModal
        open={openProfileModal}
        setOpen={setOpenProfileModal}
        handleOpenForwardModal={setOpenForwardModal}
        handleOpenCustomModal={setOpenCustomDomainModal}
      />
      <ForwardingModal open={openForwardModal} setOpen={setOpenForwardModal} />
      <CustomDomainModal
        open={openCustomDomainModal}
        setOpen={setOpenCustomDomainModal}
        handleProfileModal={setOpenProfileModal}
      />
    </nav>
  );
}
