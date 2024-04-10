"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryButton from "@shared/components/Button/PrimaryButton";
import CheckBoxField from "@shared/components/Form/CheckBoxField";
import InputField from "@shared/components/Form/InputField";
import LoadingIcon from "@shared/icons/LoadingIcon";
import { apiClient } from "@shared/lib/api-client";
import { LoginSchema } from "@shared/lib/formSchema";
import { Alert, AlertDescription, AlertTitle } from "@ui/components/alert";
import { Form } from "@ui/components/form";
import { Icon } from "@ui/components/icon";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import SocialLogin from "./SocialLogin";

const LoginForm = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<null | {
    title: string;
    message: string;
  }>(null);

  const methods = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  const {
    formState: { isSubmitted },
  } = methods;

  const redirectTo = searchParams.get("redirectTo") ?? "/app";

  const loginWithPasswordMutation =
    apiClient.auth.loginWithPassword.useMutation();

  const handleRedirect = () => {
    window.location.href = new URL(
      redirectTo,
      window.location.origin,
    ).toString();
  };

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    // mutate(data);
    try {
      await loginWithPasswordMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });
      handleRedirect();
    } catch (err) {
      setServerError({
        title: t("auth.login.hints.invalidCredentials.title"),
        message: t("auth.login.hints.invalidCredentials.message"),
      });
    }
  };

  return (
    <div className="w-full md:w-5/12">
      <h2 className={`text-title text-2xl font-bold md:text-4xl`}>
        {t("auth.login.title")}
      </h2>

      <Form {...methods}>
        <form
          className="mt-12 w-full"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-col gap-6">
            {isSubmitted && serverError && (
              <Alert variant="error">
                <Icon.warning className="h-4 w-4" />
                <AlertTitle>{serverError.title}</AlertTitle>
                <AlertDescription>{serverError.message}</AlertDescription>
              </Alert>
            )}

            <InputField label="Email address" name="email" />
            <InputField label="Password" name="password" type="password" />

            <div className="flex items-center justify-between">
              <CheckBoxField label="Remember me" name="remember" />

              <Link
                href="/auth/forgot-password"
                className="text-primary-dark text-sm font-medium"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full border-t border-gray-300"></div>
              <p className="text-grayText mx-4 whitespace-nowrap text-center text-sm">
                Or continue with
              </p>
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <SocialLogin />

            <PrimaryButton
              type="submit"
              className="w-full py-6"
              loading={methods.formState.isSubmitting}
            >
              {methods.formState.isSubmitting ? (
                <LoadingIcon size={20} color="#fff" />
              ) : (
                "Sign In"
              )}
            </PrimaryButton>

            <p className="text-grayText text-sm">
              Not a member?{" "}
              <Link href="/auth/signup" className="text-primary font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
