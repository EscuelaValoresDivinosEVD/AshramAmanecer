"use client";

import type { AnchorHTMLAttributes } from "react";
import { usePageTransition } from "../Providers";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean };

/** Internal links go through the page veil transition; external ones open normally. */
export default function TLink({ href, external, onClick, children, ...rest }: Props) {
  const { navigate } = usePageTransition();
  if (external || /^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
