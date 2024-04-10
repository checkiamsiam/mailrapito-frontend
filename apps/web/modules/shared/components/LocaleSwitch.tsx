"use client";

import { appConfig } from "@config";
import { usePathname } from "@i18n";
import { Button } from "@ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@ui/components/dropdown-menu";
import { Icon } from "@ui/components/icon";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const { localeLabels, locales, localeFlags } = appConfig.i18n;

export function LocaleSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();

  const [value, setValue] = useState<string>(currentLocale);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          aria-label="Language"
          className="text-grayText items-center gap-3 border-2 py-6"
        >
          {/* <Icon.language className="h-4 w-4" /> */}
          <Image
            src={localeFlags[value] as string}
            alt="Flag Image"
            width={32}
            height={22}
          />
          <p className="text-lg font-medium">{localeLabels[value]}</p>
          <Icon.chevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => {
            setValue(value);
            router.replace(`/${value}/${pathname}?${searchParams.toString()}`);
          }}
        >
          {locales.map((locale) => {
            return (
              <DropdownMenuRadioItem
                key={locale}
                value={locale}
                className="cursor-pointer gap-4 rounded pr-8"
              >
                <Image
                  src={localeFlags[locale]}
                  alt="Flag Image"
                  width={32}
                  height={22}
                />
                <p>{locale in localeLabels ? localeLabels[locale] : locale}</p>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
