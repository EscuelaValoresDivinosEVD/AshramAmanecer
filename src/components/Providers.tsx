"use client";

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

/** ScrollTrigger id of the map's cloud reveal (see InteractiveMap). */
export const MAP_REVEAL_ID = "map-reveal";

type NavigateOptions = { revealMap?: boolean };
type TransitionCtx = { navigate: (href: string, opts?: NavigateOptions) => void };

const Ctx = createContext<TransitionCtx>({ navigate: () => {} });
export const usePageTransition = () => useContext(Ctx);

export default function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const veil = useRef<HTMLDivElement>(null);
  const leaving = useRef(false);
  const revealMap = useRef(false);

  // Smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis?.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  const navigate = useCallback(
    (href: string, opts?: NavigateOptions) => {
      if (leaving.current) return;
      leaving.current = true;
      revealMap.current = !!opts?.revealMap;
      lenis?.stop();
      gsap.to(veil.current, {
        autoAlpha: 1,
        duration: 0.9,
        ease: "power2.inOut",
        onComplete: () => router.push(href),
      });
    },
    [router],
  );

  // New route rendered: reset scroll under the veil, then lift it.
  useEffect(() => {
    if (!leaving.current) return;
    leaving.current = false;
    lenis?.start();
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      // Coming back to the map: land with the clouds already open.
      const st = revealMap.current ? ScrollTrigger.getById(MAP_REVEAL_ID) : null;
      const top = st ? st.end : 0;
      window.scrollTo(0, top);
      lenis?.scrollTo(top, { immediate: true, force: true });
      ScrollTrigger.update();
      gsap.to(veil.current, { autoAlpha: 0, duration: 1.1, delay: 0.15, ease: "power2.out" });
    });
  }, [pathname]);

  return (
    <Ctx.Provider value={{ navigate }}>
      {children}
      <div ref={veil} className="page-veil" aria-hidden />
    </Ctx.Provider>
  );
}
