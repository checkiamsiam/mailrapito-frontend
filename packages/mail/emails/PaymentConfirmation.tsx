import { Container, Heading, Section, Text } from "@react-email/components";
import Wrapper from "./components/Wrapper";

export function PaymentConfirmation(): JSX.Element {
  return (
    <Wrapper>
      <Section className="bg-card p-8">
        <Container>
          <Heading as="h1">Congratulations!</Heading>
          <Text>Your payment has been confirmed</Text>
        </Container>
      </Section>
    </Wrapper>
  );
}

PaymentConfirmation.subjects = {
  en: "Payment confirmation!",
};

export default PaymentConfirmation;
