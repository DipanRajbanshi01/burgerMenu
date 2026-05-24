"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const seedFromId = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
};

const fallbackHues = ["#f5b400", "#e23b2e", "#d99a00", "#8b3a1f", "#c1281b"];

function FallbackArt({
  id,
  label,
  className,
}: {
  id: string;
  label: string;
  className?: string;
}) {
  const seed = seedFromId(id);
  const bg = fallbackHues[seed % fallbackHues.length];
  const initials = label
    .replace(/[^a-zA-Z ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div
      aria-hidden
      className={cn(
        "relative grid h-full w-full place-items-center overflow-hidden bg-grain",
        className,
      )}
      style={{ background: `radial-gradient(circle at 30% 30%, ${bg}, #1a1614 75%)` }}
    >
      <div className="grid h-24 w-24 place-items-center rounded-full bg-cream/95 font-display text-3xl text-charcoal shadow-lg">
        {initials || "BB"}
      </div>
      <div className="absolute bottom-3 right-3 rounded-full bg-charcoal/70 px-2 py-0.5 text-[10px] uppercase tracking-widest text-cream">
        photo soon
      </div>
    </div>
  );
}

export function MenuImage({
  src,
  alt,
  id,
  className,
  imgClassName,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  id: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [errored, setErrored] = React.useState(false);
  return (
    <div className={cn("relative overflow-hidden bg-charcoal", className)}>
      {!errored ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          sizes={sizes}
          onError={() => setErrored(true)}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]",
            imgClassName,
          )}
        />
      ) : (
        <FallbackArt id={id} label={alt} className={imgClassName} />
      )}
    </div>
  );
}
