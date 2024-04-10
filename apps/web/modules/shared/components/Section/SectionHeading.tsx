interface IProps {
  title: string;
  subtitle?: string;
  description?: string;
  leftAlign?: boolean;
  className?: string;
  color?: string;
}

const SectionHeading = ({
  title,
  subtitle,
  description,
  leftAlign,
  className,
  color,
}: IProps) => {
  const textColor = color ? color : "";
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        !leftAlign ? "mx-auto text-center" : "text-left"
      } ${className ? className : ""}`}
      data-aos="fade-up"
    >
      {subtitle && (
        <h5
          className={`${textColor ? textColor : "text-primary-dark"} text-xl font-semibold md:text-2xl`}
        >
          {subtitle}
        </h5>
      )}
      {title && (
        <h2
          className={`${textColor ? textColor : "text-title"} text-3xl  font-bold md:text-5xl`}
        >
          {title}
        </h2>
      )}
      {description && (
        <p
          className={`${textColor ? textColor : "text-title"} max-w-2xl text-base font-medium md:text-lg`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
