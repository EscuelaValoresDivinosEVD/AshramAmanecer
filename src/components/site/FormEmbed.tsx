"use client";

import Script from "next/script";

/** GoHighLevel / LeadConnector form, same forms as the previous site. */
export default function FormEmbed({ src, title, height }: { src: string; title: string; height: number }) {
  const id = src.split("/").pop();
  return (
    <div className="form-embed">
      <iframe
        src={src}
        id={`inline-${id}`}
        title={title}
        style={{ height }}
        loading="lazy"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-activation-type="alwaysActivated"
        data-deactivation-type="neverDeactivate"
        data-form-name={title}
        data-height={height}
        data-form-id={id}
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}
