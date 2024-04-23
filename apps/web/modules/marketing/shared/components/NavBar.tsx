"use client";

import { Link } from "@i18n";
import { useUser } from "@saas/auth/hooks/use-user";
import PrimaryButton from "@shared/components/Button/PrimaryButton";
import { LocaleSwitch } from "@shared/components/LocaleSwitch";
import { Logo } from "@shared/components/Logo";
import { Button } from "@ui/components/button";
import { Icon } from "@ui/components/icon";
import { Sheet, SheetContent, SheetTrigger } from "@ui/components/sheet";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceCallback, useIsClient } from "usehooks-ts";

// ----------- Un Used -----------
// import { ColorModeToggle } from "@shared/components/ColorModeToggle";

export function NavBar() {
  const t = useTranslations();
  const { user, loaded: userLoaded } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isClient = useIsClient();
  const [isTop, setIsTop] = useState(true);

  const debouncedScrollHandler = useDebounceCallback(
    () => {
      setIsTop(window.scrollY <= 10);
    },
    150,
    {
      maxWait: 150,
    },
  );

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
      label: t("common.menu.pricing"),
      href: `/#pricing`,
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
          className={`flex items-center justify-between gap-6 ${isTop ? "py-6" : "py-4"} transition-[padding] duration-200`}
        >
          <div className="flex justify-start">
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
                className="text-text-grayText hover:text-primary block px-3 py-2 text-lg font-medium"
              >
                {menuItem.label}
              </Link>
            ))}
            <div></div>
            <div>
              <form
                action="https://www.coinpayments.net/index.php"
                method="post"
              >
                <input type="hidden" name="cmd" value="_pay_simple" />
                <input type="hidden" name="reset" value="0" />
                <input
                  type="hidden"
                  name="merchant"
                  value="5429f80c5b82ba211691c5ed2183cb4b"
                />
                <input
                  type="hidden"
                  name="item_name"
                  value="1 year subscription"
                />
                <input type="hidden" name="currency" value="USD" />
                <input type="hidden" name="amountf" value="40" />
                <input type="hidden" name="email" value="ksher1995@gmail.com" />
                <input
                  type="hidden"
                  name="success_url"
                  value="https://www.mailrapido.net/success"
                />
                <input
                  type="hidden"
                  name="cancel_url"
                  value="http://localhost:3000"
                />
                <input
                  type="hidden"
                  name="custom"
                  value={JSON.stringify({ order_id: "1asdasdasdasdasd3" })}
                />
                <Button
                  className="rounded-lg bg-red-500 px-8 py-6 text-base"
                  variant="default"
                >
                  Test Payment
                </Button>
              </form>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            {/* <ColorModeToggle /> */}
            <div className="hidden md:block">
              <LocaleSwitch />
            </div>

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
                  <Icon.menu />
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

            {isClient && userLoaded && (
              <>
                <PrimaryButton className="hidden rounded-lg px-8 py-6 text-base md:flex">
                  {user ? (
                    <Link href="/app">{t("common.menu.dashboard")}</Link>
                  ) : (
                    <Link href="/auth/login">{t("common.menu.login")}</Link>
                  )}
                </PrimaryButton>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
