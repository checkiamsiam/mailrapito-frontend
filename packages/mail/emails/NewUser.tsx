import { Link, Text } from "@react-email/components";
import PrimaryButton from "./components/PrimaryButton";
import Wrapper from "./components/Wrapper";

export function NewUser({
  url,
  name,
  otp,
}: {
  url: string;
  name: string;
  otp: string;
}): JSX.Element {
  return (
    <Wrapper>
      <Text>
        Hey {name}, <br /> you requested a login email from Mailrapido.
        <br />
        <br /> You can either enter the one-time password below manually in the
        application
      </Text>

      <Text>
        One-time password:
        <br />
        <strong className="text-2xl font-bold">{otp}</strong>
      </Text>

      <Text>or use this link:</Text>

      <PrimaryButton href={url}>Confirm email &rarr;</PrimaryButton>

      <Text className="text-muted-foreground text-sm">
        If you want to open the link in a different browser than your default
        one, copy and paste this link:
        <Link href={url}>{url}</Link>
      </Text>
    </Wrapper>
  );
}

NewUser.subjects = {
  en: "Welcome to Mailrapido!",
  de: "Willkommen bei Mailrapido!",
};

export default NewUser;
