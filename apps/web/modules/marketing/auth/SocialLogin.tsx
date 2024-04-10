import { Button } from "@ui/components/button";
import { Icon } from "@ui/components/icon";
import Image from "next/image";

const SocialLogin = () => {
  return (
    <div className="flex w-full flex-col gap-1">
      <p className="font-medium text-gray-900">Sign in with</p>

      <div className="flex w-full items-center justify-between gap-2">
        <a href={`/api/oauth/google`} className="w-full">
          <Button
            className="w-full border bg-white !py-5 hover:bg-gray-50"
            type="button"
          >
            <Image
              src="/images/auth/google.svg"
              width={20}
              height={20}
              alt="Google"
            />
          </Button>
        </a>
        <Button
          className="w-full border bg-white !py-5 hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
          type="button"
          disabled
        >
          <Image
            src="/images/auth/facebook.svg"
            width={20}
            height={20}
            alt="Facebook"
          />
        </Button>
        <a href={`/api/oauth/github`} className="w-full">
          <Button
            className="w-full border bg-white !py-5 hover:bg-gray-50"
            type="button"
          >
            <Icon.github className="h-5 w-5 text-black" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default SocialLogin;
