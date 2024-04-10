import { VerifyTokenView } from "@saas/auth/components/VerifyTokenView";
import { Card } from "@ui/components/card";

export default function VerifyTokenPage() {
  return (
    <>
      <div className="grid min-h-[70vh] place-items-center">
        <div className="max-w-md">
          <Card className="bg-gray-50 p-8">
            <VerifyTokenView />
          </Card>
        </div>
      </div>
    </>
  );
}
