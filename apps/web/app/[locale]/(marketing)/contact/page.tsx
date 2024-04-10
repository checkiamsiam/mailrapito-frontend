import ContactForm from "@marketing/contact/ContactForm";
import PageBanner from "@marketing/shared/components/PageBanner";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t("contact.title"),
    description: t("contact.desc"),
  };
}

const ContactPage = () => {
  const t = useTranslations();
  return (
    <>
      <PageBanner title={t("contact.title")} description={t("contact.desc")} />
      <ContactForm />
    </>
  );
};

export default ContactPage;
