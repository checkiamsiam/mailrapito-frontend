"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryButton from "@shared/components/Button/PrimaryButton";
import CheckBoxField from "@shared/components/Form/CheckBoxField";
import InputField from "@shared/components/Form/InputField";
import MessageField from "@shared/components/Form/MessageField";
import PhoneField from "@shared/components/Form/PhoneField";
import { ContactSchema } from "@shared/lib/formSchema";
import { Form } from "@ui/components/form";
import Image from "next/image";
import { useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import type { z } from "zod";

const ContactForm = () => {
  const methods = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = (data: z.infer<typeof ContactSchema>) => {
    console.log(data);
  };

  return (
    <section className="relative">
      <div className="container py-12 md:py-20">
        <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
          {/* Left Side  */}
          <div className="w-full md:w-5/12">
            <div>
              <h2 className={`text-primary text-3xl  font-bold md:text-5xl`}>
                Get in touch
              </h2>
              <p className="mt-6 text-lg font-medium">
                Our friendly team would love to hear from you.
              </p>
            </div>

            <Form {...methods}>
              <form
                className="mt-12 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <div className="flex w-full flex-col gap-4">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <InputField label="First Name" name="firstName" />
                    <InputField label="Last Name" name="lastName" />
                  </div>

                  <PhoneField label="Phone" name="phone" />
                  <MessageField label="Message" name="message" rows={5} />
                  <CheckBoxField
                    label="You agree to our friendly privacy policy."
                    name="terms"
                  />

                  <PrimaryButton type="submit" className="w-full py-6">
                    Send Message
                  </PrimaryButton>
                </div>
              </form>
            </Form>
          </div>

          <div>
            <Image
              className="mw-100"
              data-aos="fade-up"
              src={"/images/contact.svg"}
              alt="Contact Image"
              width={554}
              height={314}
            />
          </div>
        </div>
      </div>

      {/* Bg Element */}
      <div className="bg-primary blur_element absolute left-[-192px] top-36 z-[-1] h-[434px] w-[434px] rounded-full blur-[340px] "></div>
    </section>
  );
};

export default ContactForm;
