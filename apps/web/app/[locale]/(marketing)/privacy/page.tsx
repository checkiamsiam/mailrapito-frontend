import PageBanner from "@marketing/shared/components/PageBanner";

const PrivacyPolicyPage = () => {
  const data = [
    {
      title: "01. Acceptance of Terms",
      points: [
        "using the Platform or availing the Services provided through the Platform in any way; or  browsing the Platform, the client is deemed to have read, understood and accepted the T&C as well as any privacy policy that may be available on the Platform.",
        "The Client acknowledges that by accessing and using the Platform and availing any of the Services, it agrees to be bound by the T&Cs. The T&C establish a contractual relationship between CAPL and the Client",
        "In the event the Client is not agreeable to the T&C, it shall not access the Platform or avail the Services.(d)The T&C contained herein expressly supersede all prior agreements or arrangements between CAPL and the Client.",
        "The Client understands that the access to the Platform and the offer of Services is conditional upon the Client’s irrevocable consent and acceptance of all the terms, conditions and obligations contained in the T&C (as may be amended from time to time).",
      ],
    },
    {
      title: "02. Use of Platform and Services",
      points: [
        "using the Platform or availing the Services provided through the Platform in any way; or  browsing the Platform, the client is deemed to have read, understood and accepted the T&C as well as any privacy policy that may be available on the Platform.",
        "The Client acknowledges that by accessing and using the Platform and availing any of the Services, it agrees to be bound by the T&Cs. The T&C establish a contractual relationship between CAPL and the Client",
        "In the event the Client is not agreeable to the T&C, it shall not access the Platform or avail the Services.(d)The T&C contained herein expressly supersede all prior agreements or arrangements between CAPL and the Client.",
        "The Client understands that the access to the Platform and the offer of Services is conditional upon the Client’s irrevocable consent and acceptance of all the terms, conditions and obligations contained in the T&C (as may be amended from time to time).",
      ],
    },
    {
      title: "03. Acceptance of Terms",
      points: [
        "using the Platform or availing the Services provided through the Platform in any way; or  browsing the Platform, the client is deemed to have read, understood and accepted the T&C as well as any privacy policy that may be available on the Platform.",
        "The Client acknowledges that by accessing and using the Platform and availing any of the Services, it agrees to be bound by the T&Cs. The T&C establish a contractual relationship between CAPL and the Client",
        "In the event the Client is not agreeable to the T&C, it shall not access the Platform or avail the Services.(d)The T&C contained herein expressly supersede all prior agreements or arrangements between CAPL and the Client.",
        "The Client understands that the access to the Platform and the offer of Services is conditional upon the Client’s irrevocable consent and acceptance of all the terms, conditions and obligations contained in the T&C (as may be amended from time to time).",
      ],
    },
    {
      title: "04. Acceptance of Terms",
      points: [
        "using the Platform or availing the Services provided through the Platform in any way; or  browsing the Platform, the client is deemed to have read, understood and accepted the T&C as well as any privacy policy that may be available on the Platform.",
        "The Client acknowledges that by accessing and using the Platform and availing any of the Services, it agrees to be bound by the T&Cs. The T&C establish a contractual relationship between CAPL and the Client",
        "In the event the Client is not agreeable to the T&C, it shall not access the Platform or avail the Services.(d)The T&C contained herein expressly supersede all prior agreements or arrangements between CAPL and the Client.",
        "The Client understands that the access to the Platform and the offer of Services is conditional upon the Client’s irrevocable consent and acceptance of all the terms, conditions and obligations contained in the T&C (as may be amended from time to time).",
      ],
    },
    {
      title: "05. Acceptance of Terms",
      points: [
        "using the Platform or availing the Services provided through the Platform in any way; or  browsing the Platform, the client is deemed to have read, understood and accepted the T&C as well as any privacy policy that may be available on the Platform.",
        "The Client acknowledges that by accessing and using the Platform and availing any of the Services, it agrees to be bound by the T&Cs. The T&C establish a contractual relationship between CAPL and the Client",
        "In the event the Client is not agreeable to the T&C, it shall not access the Platform or avail the Services.(d)The T&C contained herein expressly supersede all prior agreements or arrangements between CAPL and the Client.",
        "The Client understands that the access to the Platform and the offer of Services is conditional upon the Client’s irrevocable consent and acceptance of all the terms, conditions and obligations contained in the T&C (as may be amended from time to time).",
      ],
    },
    {
      title: "06. Acceptance of Terms",
      points: [
        "using the Platform or availing the Services provided through the Platform in any way; or  browsing the Platform, the client is deemed to have read, understood and accepted the T&C as well as any privacy policy that may be available on the Platform.",
        "The Client acknowledges that by accessing and using the Platform and availing any of the Services, it agrees to be bound by the T&Cs. The T&C establish a contractual relationship between CAPL and the Client",
        "In the event the Client is not agreeable to the T&C, it shall not access the Platform or avail the Services.(d)The T&C contained herein expressly supersede all prior agreements or arrangements between CAPL and the Client.",
        "The Client understands that the access to the Platform and the offer of Services is conditional upon the Client’s irrevocable consent and acceptance of all the terms, conditions and obligations contained in the T&C (as may be amended from time to time).",
      ],
    },
    {
      title: "07. Acceptance of Terms",
      points: [
        "using the Platform or availing the Services provided through the Platform in any way; or  browsing the Platform, the client is deemed to have read, understood and accepted the T&C as well as any privacy policy that may be available on the Platform.",
        "The Client acknowledges that by accessing and using the Platform and availing any of the Services, it agrees to be bound by the T&Cs. The T&C establish a contractual relationship between CAPL and the Client",
        "In the event the Client is not agreeable to the T&C, it shall not access the Platform or avail the Services.(d)The T&C contained herein expressly supersede all prior agreements or arrangements between CAPL and the Client.",
        "The Client understands that the access to the Platform and the offer of Services is conditional upon the Client’s irrevocable consent and acceptance of all the terms, conditions and obligations contained in the T&C (as may be amended from time to time).",
      ],
    },
    {
      title: "08. Acceptance of Terms",
      points: [
        "using the Platform or availing the Services provided through the Platform in any way; or  browsing the Platform, the client is deemed to have read, understood and accepted the T&C as well as any privacy policy that may be available on the Platform.",
        "The Client acknowledges that by accessing and using the Platform and availing any of the Services, it agrees to be bound by the T&Cs. The T&C establish a contractual relationship between CAPL and the Client",
        "In the event the Client is not agreeable to the T&C, it shall not access the Platform or avail the Services.(d)The T&C contained herein expressly supersede all prior agreements or arrangements between CAPL and the Client.",
        "The Client understands that the access to the Platform and the offer of Services is conditional upon the Client’s irrevocable consent and acceptance of all the terms, conditions and obligations contained in the T&C (as may be amended from time to time).",
      ],
    },
  ];
  return (
    <div className="relative overflow-hidden">
      <PageBanner title="Privacy Policy" />
      <div className="container py-20 md:py-28">
        <div className="flex flex-col gap-8 md:gap-16">
          {data.map((item, index) => (
            <div key={index}>
              <h3 className="text-title text-2xl font-semibold md:text-3xl">
                {item.title}
              </h3>
              <div className="bg-primary-dark mt-4 h-1 w-[105px]"></div>
              <div className="mt-6 grid grid-cols-1 gap-4">
                {item.points.map((point, i) => (
                  <div
                    className="flex items-start gap-2 text-[#303133]"
                    key={i + 5}
                  >
                    <span>{i + 1}.</span>
                    <p className="text-grayText text-base">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bg Elements */}
      {/* Bg Element */}
      <div className="bg-primary-gradient blur_element absolute right-[-250px] top-[1000px] z-0 h-[435px] w-[435px]  rounded-3xl blur-[335px]"></div>
      <div className="bg-primary blur_element absolute bottom-36 right-0 z-[-1] h-[434px] w-[434px] rounded-full blur-[340px]"></div>
    </div>
  );
};

export default PrivacyPolicyPage;
