import AuthContainer from "@marketing/auth/AuthContainer";
import ForgotPasswordForm from "@marketing/auth/ForgotPasswordForm";
import PageBanner from "@marketing/shared/components/PageBanner";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t("auth.forgotPassword.title"),
  };
}

const ForgotPassword = () => {
  return (
    <>
      <PageBanner title="Forgot Password" />
      <AuthContainer>
        <ForgotPasswordForm />
      </AuthContainer>
    </>
  );
};

export default ForgotPassword;
