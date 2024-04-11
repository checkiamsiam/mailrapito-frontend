import AuthContainer from "@marketing/auth/AuthContainer";
import SignUpForm from "@marketing/auth/SignUpForm";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t("auth.signup.title"),
    description: t("auth.signup.message"),
  };
}

const SignUpPage = () => {
  return (
    <>
      {/* <PageBanner title="Sign Up" /> */}
      <AuthContainer>
        <SignUpForm />
      </AuthContainer>
    </>
  );
};

export default SignUpPage;
