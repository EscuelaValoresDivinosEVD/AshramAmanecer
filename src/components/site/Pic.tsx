import { img } from "@/lib/img";

type Props = {
  src: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** Content image from the old site, with a small + full WebP srcset. */
export default function Pic({ src, alt, sizes = "100vw", priority, className }: Props) {
  const i = img(src, alt);
  const smW = Math.min(600, i.w);
  return (
    <img
      className={className}
      src={i.src}
      srcSet={i.w > 600 ? `${i.sm} ${smW}w, ${i.src} ${i.w}w` : undefined}
      sizes={sizes}
      width={i.w}
      height={i.h}
      alt={i.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
