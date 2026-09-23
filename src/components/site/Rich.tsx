import { Fragment } from "react";

/** Renders `**bold**` markup from the content files. */
export default function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

export const plain = (text: string) => text.replace(/\*\*/g, "");
