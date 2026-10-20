import Image from "next/image";

type MuraleProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  invert?: boolean;
  decorative?: boolean;
};

export function Murale({ src, alt, width, height, className, priority, invert, decorative }: MuraleProps) {
  const classes = [invert ? "inv" : "", className].filter(Boolean).join(" ");

  return (
    <Image
      src={src}
      alt={decorative ? "" : alt}
      aria-hidden={decorative ? true : undefined}
      width={width}
      height={height}
      className={classes}
      {...(priority ? { priority: true } : { loading: "lazy" as const })}
    />
  );
}
