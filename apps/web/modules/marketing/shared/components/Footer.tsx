import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const data = [
  {
    icon: (
      <svg
        width="29"
        height="25"
        viewBox="0 0 29 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.0311 6.60511C26.0488 6.86549 26.0487 7.12588 26.0487 7.38866C26.0487 15.3958 20.0638 24.6304 9.12001 24.6304V24.6256C5.88718 24.6304 2.72151 23.6872 0 21.9089C0.470079 21.9665 0.942515 21.9953 1.41613 21.9965C4.09523 21.9989 6.69774 21.0834 8.80544 19.3975C6.25948 19.3483 4.02689 17.6576 3.24696 15.1894C4.13882 15.3646 5.05777 15.3286 5.93313 15.085C3.15742 14.5138 1.16047 12.03 1.16047 9.14535C1.16047 9.11895 1.16047 9.09375 1.16047 9.06855C1.98753 9.53772 2.91355 9.79811 3.86078 9.82691C1.24648 8.04742 0.440626 4.50524 2.01934 1.73582C5.0401 5.52158 9.49701 7.82303 14.2815 8.06662C13.802 5.96195 14.457 3.75649 16.0027 2.27698C18.3991 -0.0172731 22.1679 0.10032 24.4206 2.53977C25.753 2.27218 27.0301 1.77421 28.1989 1.06866C27.7547 2.47137 26.8251 3.66289 25.5834 4.42005C26.7627 4.27846 27.9149 3.95688 29 3.46611C28.2012 4.68523 27.1951 5.74716 26.0311 6.60511Z"
          fill="white"
        />
      </svg>
    ),
    link: "#",
  },
  {
    icon: (
      <svg
        width="28"
        height="24"
        viewBox="0 0 28 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.2637 0.701276C26.1433 0.740159 23.4732 1.7574 20.3301 2.96173C17.1869 4.16606 11.6129 6.30046 7.94334 7.70478C4.27381 9.1091 1.1137 10.3328 0.920868 10.4242C0.302954 10.717 -0.0847804 11.1859 0.0158446 11.5188C0.0718446 11.7041 0.311102 11.9381 0.587876 12.0784C0.818384 12.1952 7.13616 14.1858 7.31444 14.1978C7.35956 14.2008 10.7297 12.1166 14.8036 9.56617C18.8775 7.01577 22.2912 4.89537 22.3897 4.85424C22.6249 4.75597 22.9789 4.75838 23.0623 4.85884C23.2109 5.03799 23.8604 4.43413 14.1504 13.1454C12.6916 14.4542 11.3817 15.6358 11.2394 15.7713L10.9808 16.0177L10.7609 19.1451C10.64 20.8652 10.541 22.3244 10.541 22.3878C10.541 22.491 10.5625 22.4993 10.7461 22.4671C11.2076 22.3859 11.403 22.2404 12.6573 21.0438C13.3431 20.3895 14.1288 19.6344 14.4032 19.3658L14.9021 18.8775L18.1705 21.2715C20.7996 23.1974 21.5074 23.6905 21.7893 23.7929C22.7605 24.1454 23.3746 23.717 23.6651 22.4841C23.7235 22.2362 24.7105 17.6406 25.8585 12.2716C28.1375 1.61324 28.0894 1.87919 27.8393 1.33412C27.7772 1.19877 27.6706 1.02984 27.6024 0.958745C27.3094 0.653589 26.7461 0.545253 26.2637 0.701276Z"
          fill="white"
        />
      </svg>
    ),
    link: "#",
  },
  {
    icon: (
      <svg
        width="18"
        height="33"
        viewBox="0 0 18 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.9892 18.5998L16.876 12.8183H11.3288V9.06652C11.3288 7.48482 12.1036 5.94308 14.5883 5.94308H17.1104V1.02101C17.1104 1.02101 14.8215 0.630371 12.6332 0.630371C8.06446 0.630371 5.07842 3.39923 5.07842 8.41192V12.8183H0V18.5998H5.07842V32.5761C6.09672 32.7359 7.14042 32.8191 8.20361 32.8191C9.26679 32.8191 10.3105 32.7359 11.3288 32.5761V18.5998H15.9892Z"
          fill="white"
        />
      </svg>
    ),
    link: "#",
  },
  {
    icon: (
      <svg
        width="33"
        height="32"
        viewBox="0 0 33 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.5 2.66667C8.90608 2.66667 2.75 8.6362 2.75 16C2.75 23.3638 8.90608 29.3333 16.5 29.3333C24.0939 29.3333 30.25 23.3638 30.25 16C30.25 8.6362 24.0939 2.66667 16.5 2.66667ZM0 16C0 7.16347 7.38733 0 16.5 0C25.6127 0 33 7.16347 33 16C33 24.8365 25.6127 32 16.5 32C7.38733 32 0 24.8365 0 16Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.1885 30.3145C13.0555 30.148 13.0555 28.6649 13.1885 25.8654C11.7641 25.9131 10.8641 25.8173 10.4887 25.5779C9.92544 25.2187 9.36162 24.1112 8.86125 23.3307C8.36096 22.5501 7.25058 22.4267 6.80216 22.2523C6.35375 22.0777 6.24119 21.3665 8.03777 21.9044C9.83427 22.4423 9.92193 23.9072 10.4887 24.2497C11.0554 24.5923 12.4104 24.4424 13.0245 24.168C13.6388 23.8936 13.5935 22.8719 13.703 22.4672C13.8415 22.0894 13.3535 22.0056 13.3428 22.0025C12.7432 22.0025 9.5933 21.3383 8.72815 18.3805C7.86294 15.4227 8.97744 13.4895 9.57199 12.6584C9.9684 12.1043 9.93334 10.9235 9.4668 9.11588C11.1605 8.90601 12.4676 9.42294 13.388 10.6668C13.3889 10.6739 14.5946 9.97154 16.5002 9.97154C18.4057 9.97154 19.0818 10.5437 19.6035 10.6668C20.1253 10.7899 20.5425 8.48948 23.7647 9.11588C23.092 10.398 22.5286 12.0001 22.9586 12.6584C23.3886 13.3167 25.0762 15.4099 24.0395 18.3805C23.3485 20.3609 21.9899 21.5683 19.9639 22.0025C19.7316 22.0744 19.6154 22.1904 19.6154 22.3504C19.6154 22.5905 19.9295 22.6167 20.382 23.7412C20.6836 24.4909 20.7054 26.6321 20.4473 30.1647C19.7935 30.3261 19.2849 30.4345 18.9214 30.4899C18.277 30.5881 17.5772 30.6431 16.8897 30.6644C16.2022 30.6857 15.9635 30.6833 15.0129 30.5975C14.3793 30.5403 13.7712 30.4459 13.1885 30.3145Z"
          fill="white"
        />
      </svg>
    ),
    link: "#",
  },
];

const quickLinks = [
  {
    title: "Privacy",
    link: "/privacy",
  },
  {
    title: "Terms",
    link: "/",
  },
  {
    title: "Blog",
    link: "/blog",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

const Footer = () => {
  const t = useTranslations();
  return (
    <footer
      className="text-white"
      style={{
        background: `url(${"/images/footer-bg.svg"}) no-repeat center center / cover`,
      }}
    >
      <div className="container py-12 md:py-24">
        <div className="grid grid-cols-12 gap-y-6 md:gap-8 md:gap-y-0">
          {/* 1st Column */}
          <div className="col-span-12 md:col-span-6">
            <Link href={"/"} className="logo">
              <Image
                src={"/images/footer-logo.svg"}
                alt="Footer Logo"
                width={63}
                height={65}
              />
            </Link>

            <p className="my-8 max-w-md text-sm font-medium md:text-base">
              {t("footer.description")}
            </p>

            <div>
              <h5 className="mb-4 text-2xl font-semibold">Follow Us:</h5>
              <ul className="flex items-center gap-8">
                {data.map(({ icon, link }, i) => (
                  <li key={i} className="cursor-pointer">
                    <Link href={link}>{icon}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2nd Column */}
          <div className="col-span-6 md:col-span-3">
            <h5 className="mb-8 text-2xl font-semibold">Quick Link</h5>
            <ul className="flex flex-col gap-4">
              {quickLinks.map(({ title, link }, i) => (
                <li key={i} className="cursor-pointer  text-sm md:text-xl">
                  <Link href={link}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3rd Column */}
          <div className="col-span-6 md:col-span-3">
            <div>
              <h5 className="mb-4 text-2xl font-semibold">Contact us</h5>
              <a
                href="mailto:info@temporary-email.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-xl"
              >
                info@temporary-email.org
              </a>
            </div>
            <div className="mt-8">
              <h5 className="mb-4 text-2xl font-semibold">About Us:</h5>
              <p className="max-w-xs text-sm md:text-xl">
                We are bla bla temporary email service provider based on europe
                lot of words here will be edited.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white py-8 text-center md:py-16">
        <div className="container">
          <p className="text-sm md:text-lg">
            Copyright &copy;2022 - Temporary Email
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
