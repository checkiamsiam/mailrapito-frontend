"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryButton from "@shared/components/Button/PrimaryButton";
import InputField from "@shared/components/Form/InputField";
import LoadingIcon from "@shared/icons/LoadingIcon";
import { apiClient } from "@shared/lib/api-client";
import { ForgotPasswordSchema } from "@shared/lib/formSchema";
import { Alert, AlertDescription, AlertTitle } from "@ui/components/alert";
import { Form } from "@ui/components/form";
import { Icon } from "@ui/components/icon";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const ForgotPasswordForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const [serverError, setServerError] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const methods = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const {
    formState: { isSubmitted, isSubmitting },
  } = methods;

  const forgotPasswordMutation = apiClient.auth.forgotPassword.useMutation();

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    const { email } = data;
    try {
      await forgotPasswordMutation.mutateAsync({
        email,
        callbackUrl: new URL("/auth/verify", window.location.origin).toString(),
      });

      const redirectSearchParams = new URLSearchParams();
      redirectSearchParams.set("type", "PASSWORD_RESET");
      if (email) {
        redirectSearchParams.set("identifier", email);
      }
      redirectSearchParams.set("redirectTo", "/app/settings/account/general");
      router.replace(`/auth/otp?${redirectSearchParams.toString()}`);
    } catch (e) {
      setServerError({
        title: t("auth.forgotPassword.hints.linkNotSent.title"),
        message: t("auth.forgotPassword.hints.linkNotSent.message"),
      });
    }
  };

  return (
    <div className="w-full md:w-5/12">
      <h2 className={`text-title text-2xl font-bold md:text-4xl`}>
        {t("auth.forgotPassword.title")}
      </h2>

      <Form {...methods}>
        <form
          className="mt-12 w-full"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-col gap-6">
            <InputField label="Email address" name="email" />

            {isSubmitted && serverError && (
              <Alert variant="error">
                <Icon.warning className="h-4 w-4" />
                <AlertTitle>{serverError.title}</AlertTitle>
                <AlertDescription>{serverError.message}</AlertDescription>
              </Alert>
            )}

            <PrimaryButton
              type="submit"
              className="w-full py-6"
              loading={isSubmitting}
            >
              {isSubmitting ? <LoadingIcon color="#fff" /> : "Submit"}
            </PrimaryButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
