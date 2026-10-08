"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted looping background video served from this site (public/video/).
 * It only loads and plays while its section is near the viewport, so it never
 * competes with the cloud intro or decodes off-screen.
 */
export default function LazyVideo({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        setNear(e.isIntersecting);
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="lazy-video"
      src={near ? src : undefined}
      title={title}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-hidden
    />
  );
}
