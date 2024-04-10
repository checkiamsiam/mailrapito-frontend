"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryButton from "@shared/components/Button/PrimaryButton";
import CheckBoxField from "@shared/components/Form/CheckBoxField";
import InputField from "@shared/components/Form/InputField";
import LoadingIcon from "@shared/icons/LoadingIcon";
import { apiClient } from "@shared/lib/api-client";
import { SignUpSchema } from "@shared/lib/formSchema";
import { Alert, AlertDescription, AlertTitle } from "@ui/components/alert";
import { Form } from "@ui/components/form";
import { Icon } from "@ui/components/icon";
import { useToast } from "@ui/hooks/use-toast";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import SocialLogin from "./SocialLogin";

const SignUpForm = () => {
  const t = useTranslations();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/app";
  const [serverError, setServerError] = useState<null | {
    title: string;
    message: string;
  }>(null);
  const methods = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const {
    formState: { isSubmitted },
  } = methods;

  // Signup API
  // const { mutate, isPending } = useMutation({
  //   mutationKey: ["signup"],
  //   mutationFn: async (
  //     data: Omit<z.infer<typeof SignUpSchema>, "terms" | "confirmPassword">,
  //   ) => await register(data),
  //   onSuccess: () => {
  //     toast({
  //       title: "Success",
  //       description: "Signup successfull",
  //     });
  //     router.push("/");
  //   },
  //   onError: (err: any) => {
  //     toast({
  //       title: "Error",
  //       description: err?.response?.data?.msg || "Something went wrong",
  //     });
  //   },
  // });
  const signupMutation = apiClient.auth.signup.useMutation();
  const isPending = methods.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    try {
      setServerError(null);
      const res = await signupMutation.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        callbackUrl: new URL("/auth/verify", window.location.origin).toString(),
      });
      console.log(res, data);
      const redirectSearchParams = new URLSearchParams();
      redirectSearchParams.set("type", "SIGNUP");
      redirectSearchParams.set("redirectTo", redirectTo);
      redirectSearchParams.set("identifier", data.email);

      router.replace(`/auth/otp?${redirectSearchParams.toString()}`);
    } catch (err) {
      console.log(err);

      setServerError({
        title: t("auth.signup.hints.signupFailed.title"),
        message: t("auth.signup.hints.signupFailed.message"),
      });
    }
  };

  return (
    <div className="w-full md:w-5/12">
      <h2 className={`text-title text-2xl font-bold md:text-4xl`}>
        {t("auth.signup.title")}
      </h2>

      <Form {...methods}>
        <form
          className="mt-12 w-full"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {isSubmitted && serverError && (
            <Alert variant="error">
              <Icon.warning className="h-4 w-4" />
              <AlertTitle>{serverError.title}</AlertTitle>
              <AlertDescription>{serverError.message}</AlertDescription>
            </Alert>
          )}
          <div className="flex w-full flex-col gap-6">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <InputField label="First Name" name="firstName" />
              <InputField label="Last Name" name="lastName" />
            </div>

            <InputField label="Email address" name="email" />
            <InputField
              label="Create a password"
              name="password"
              type="password"
            />
            <InputField
              label="Re-type Password"
              name="confirmPassword"
              type="password"
            />

            <CheckBoxField
              label="Agree with Terms & Privacy Policy"
              name="terms"
            />

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
              loading={isPending}
            >
              {isPending ? <LoadingIcon size={20} color="#fff" /> : "Sign Up"}
            </PrimaryButton>

            <p className="text-grayText text-sm">
              Are you a member?{" "}
              <Link href="/auth/login" className="text-primary font-semibold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
