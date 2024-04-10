import { OtpForm } from "@saas/auth/components/OtpForm";
import { Card } from "@ui/components/card";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t("auth.verifyOtp.title"),
  };
}

export default function OtpPage() {
  return (
    <>
      <div className="grid min-h-[70vh] place-items-center">
        <div className="max-w-md">
          <Card className="bg-gray-50 p-8">
            <OtpForm />
          </Card>
        </div>
      </div>
    </>
  );
}
