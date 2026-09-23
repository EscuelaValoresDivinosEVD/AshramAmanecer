"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cloudflare Stream background video that only exists while its section is
 * near the viewport, so it never decodes during the cloud intro or elsewhere.
 */
export default function LazyVideo({ src, title }: { src: string; title: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: "300px 0px" });
    io.observe(box.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} style={{ position: "absolute", inset: 0 }}>
      {on && <iframe title={title} src={src} allow="autoplay; encrypted-media" />}
    </div>
  );
}
