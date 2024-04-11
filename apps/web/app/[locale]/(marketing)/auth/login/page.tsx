import AuthContainer from "@marketing/auth/AuthContainer";
import LoginForm from "@marketing/auth/LoginForm";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t("auth.login.title"),
    description: t("auth.login.subtitle"),
  };
}

const LoginPage = () => {
  return (
    <>
      {/* <PageBanner title="Login" /> */}
      <AuthContainer>
        <LoginForm />
      </AuthContainer>
    </>
  );
};

export default LoginPage;
