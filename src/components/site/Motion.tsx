"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Declarative scroll motion, set up per page from data attributes:
 * - data-reveal          fade + rise when entering (children stagger with ="stagger")
 * - data-clip            image grows from an inset rounded frame to full bleed
 * - data-parallax        inner <img> drifts slower than the page
 * - data-fill            words (.fill-word) go from faint to solid while scrolling
 * Runs after page components (so pins like the map's are created first).
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const targets = el.dataset.reveal === "stagger" ? Array.from(el.children) : [el];
        if (el.dataset.reveal === "stagger") gsap.set(el, { opacity: 1 });
        gsap.fromTo(
          targets,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 769px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(6% 4% round 8px)" },
            { clipPath: "inset(0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: el, start: "top 90%", end: "top 20%", scrub: true } },
          );
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const target = el.querySelector("img") ?? el;
        gsap.fromTo(
          target,
          { yPercent: -8 },
          { yPercent: 8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-fill]").forEach((el) => {
        gsap.to(el.querySelectorAll(".fill-word"), {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
        });
      });
    });

    // Images load after layout: keep trigger positions accurate.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 400);
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
