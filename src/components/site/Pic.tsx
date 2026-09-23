import { img } from "@/lib/img";

type Props = {
  src: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** Content image; photos from the old site get a small + full WebP srcset. */
export default function Pic({ src, alt, sizes = "100vw", priority, className }: Props) {
  if (!src) return null; // an optional image left empty in the CMS
  const i = img(src, alt);
  const srcSet = i.sm && i.w && i.w > 600 ? `${i.sm} 600w, ${i.src} ${i.w}w` : undefined;
  return (
    <img
      className={className}
      src={i.src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={i.w}
      height={i.h}
      alt={i.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
