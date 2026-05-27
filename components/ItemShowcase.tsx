"use client";

import * as React from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MenuImage } from "@/components/MenuImage";
import { SpiceLevel } from "@/components/SpiceLevel";
import { VegDot } from "@/components/VegDot";
import { useOrder } from "@/context/OrderContext";
import { buildOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { cn, formatNpr } from "@/lib/utils";
import { config } from "@/data/config";
import type { AddOn, MenuItem } from "@/data/menu";

export function ItemShowcase({ item }: { item: MenuItem }) {
  const { addLine } = useOrder();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [qty, setQty] = React.useState(1);
  const [selectedAddOns, setSelectedAddOns] = React.useState<AddOn[]>([]);
  const [mealdeal, setMealdeal] = React.useState(false);
  const [liked, setLiked] = React.useState(false);

  const hasMealdeal = Boolean(item.mealdealPrice);

  React.useEffect(() => {
    setQty(1);
    setSelectedAddOns([]);
    setMealdeal(false);
    setLiked(false);
    // Reset the internal scroll so a new item always opens at the photo,
    // not at wherever the previous item happened to be scrolled to.
    if (rootRef.current) {
      rootRef.current.scrollTop = 0;
    }
  }, [item.id]);

  const unitPrice =
    mealdeal && item.mealdealPrice ? item.mealdealPrice : item.price;
  const addOnTotal = selectedAddOns.reduce((s, a) => s + a.price, 0);
  const total = (unitPrice + addOnTotal) * qty;

  const toggle = (a: AddOn) =>
    setSelectedAddOns((prev) =>
      prev.some((x) => x.name === a.name)
        ? prev.filter((x) => x.name !== a.name)
        : [...prev, a],
    );

  const onWhatsApp = () => {
    const msg = buildOrderMessage([
      {
        lineId: "preview",
        item,
        qty,
        addOns: selectedAddOns,
        mealdeal: mealdeal && Boolean(item.mealdealPrice),
      },
    ]);
    window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={rootRef}
      data-showcase-scroll
      className="relative flex h-full flex-col overflow-y-auto bg-cream"
    >
      <div className="absolute inset-0 bg-grain opacity-30" aria-hidden />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-4 sm:gap-6 sm:px-10 sm:py-10">
        {/* Image */}
        <div className="relative">
          <div
            className="absolute -inset-6 -z-10 rounded-full bg-mustard/30 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto aspect-square w-full max-w-[260px] overflow-hidden rounded-[1.75rem] shadow-[0_25px_55px_-20px_rgba(26,22,20,0.4)] sm:max-w-md sm:rounded-[2rem]">
            <MenuImage
              key={item.id}
              id={item.id}
              src={item.photo}
              alt={item.name}
              className="h-full w-full"
              imgClassName="animate-fade-in"
              priority
              sizes="(max-width: 768px) 100vw, 480px"
            />
            <button
              onClick={() => setLiked((v) => !v)}
              aria-label="Save for later"
              className={cn(
                "absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-cream/90 backdrop-blur transition hover:bg-cream",
                liked ? "text-tomato" : "text-charcoal/60",
              )}
            >
              <Heart className={cn("h-5 w-5", liked && "fill-tomato")} />
            </button>

            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {item.isBestseller && (
                <Badge variant="bestseller">★ Bestseller</Badge>
              )}
              {item.isNew && <Badge variant="new">New</Badge>}
              {item.isHalal && <Badge variant="halal">Halal</Badge>}
              {item.originalPrice && (
                <Badge variant="new">
                  Save Rs. {item.originalPrice - item.price}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Title + price */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h2 className="font-display text-[2rem] leading-[0.95] tracking-tight text-charcoal sm:text-5xl">
              {item.name}
            </h2>
            {item.nameNp && (
              <p className="mt-1 text-sm uppercase tracking-[0.2em] text-charcoal/55">
                {item.nameNp}
              </p>
            )}
            <div className="mt-2 flex items-center gap-2 sm:hidden">
              <VegDot isVeg={item.isVeg} />
              <SpiceLevel level={item.spiceLevel} />
            </div>
          </div>
          <div className="flex flex-row items-baseline justify-between gap-2 sm:flex-col sm:items-end">
            <div className="flex items-baseline gap-2">
              {item.originalPrice && (
                <span className="font-display text-base text-charcoal/50 line-through sm:text-lg">
                  Rs. {item.originalPrice}
                </span>
              )}
              <span className="font-display text-3xl text-charcoal sm:text-4xl">
                {formatNpr(unitPrice)}
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <VegDot isVeg={item.isVeg} />
              <SpiceLevel level={item.spiceLevel} />
            </div>
          </div>
        </div>

        <p className="max-w-prose text-sm leading-relaxed text-charcoal/75 sm:text-base">
          {item.longDesc}
        </p>

        {/* Mealdeal toggle */}
        {hasMealdeal && <MealdealToggle item={item} value={mealdeal} onChange={setMealdeal} />}

        {/* "Comes with combo" notice */}
        {item.comesWithCombo && !hasMealdeal && (
          <div className="rounded-2xl border-2 border-dashed border-mustard/70 bg-mustard/10 px-4 py-3 text-sm text-charcoal/85">
            <span className="font-bold uppercase tracking-wide text-mustard-600">
              Combo:
            </span>{" "}
            this comes with {config.mealdealIncludes} included.
          </div>
        )}

        {/* Family Pack contents */}
        {item.originalPrice && item.ingredients.length > 0 && (
          <div className="rounded-2xl bg-sunshine/40 p-4">
            <p className="mb-2 font-display text-lg text-charcoal">
              What's in the {item.name}
            </p>
            <ul className="grid grid-cols-1 gap-1 text-sm text-charcoal/85 sm:grid-cols-2">
              {item.ingredients.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-tomato" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Layers */}
        {item.layers.length > 0 && (
          <Section title="What's inside" subtitle="top → bottom">
            <BurgerLayers layers={item.layers} />
          </Section>
        )}

        {/* Ingredients */}
        {item.ingredients.length > 0 && !item.originalPrice && (
          <Section title="Ingredients">
            <div className="flex flex-wrap gap-1.5">
              {item.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="rounded-full border border-charcoal/15 bg-cream-200 px-2.5 py-1 text-xs text-charcoal/75"
                >
                  {ing}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Add-ons */}
        {item.addOns && item.addOns.length > 0 && (
          <Section title="Add-ons">
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {item.addOns.map((a) => {
                const checked = selectedAddOns.some((x) => x.name === a.name);
                return (
                  <li key={a.name}>
                    <label
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 transition-all",
                        checked
                          ? "border-mustard bg-mustard/15"
                          : "border-charcoal/10 bg-cream-200/60 hover:border-charcoal/20",
                      )}
                    >
                      <span className="flex items-center gap-2.5 text-sm font-semibold text-charcoal">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(a)}
                          className="h-4 w-4 accent-mustard"
                        />
                        {a.name}
                      </span>
                      <span className="text-sm font-semibold text-charcoal/80">
                        +{formatNpr(a.price)}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </Section>
        )}

        <div className="h-24" />
      </div>

      {/* Sticky bottom bar */}
      <div className="sticky bottom-0 z-10 mt-auto border-t border-charcoal/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-10 sm:py-4">
          <QtyStepper qty={qty} setQty={setQty} />

          {/* Desktop: separate subtotal + 2 buttons */}
          <div className="ml-2 hidden flex-1 items-center justify-end gap-3 sm:flex">
            <div className="leading-tight">
              <p className="text-[10px] uppercase tracking-widest text-charcoal/55">
                Subtotal
              </p>
              <p className="font-display text-2xl text-charcoal">
                {formatNpr(total)}
              </p>
            </div>
            <Button
              variant="mustard"
              size="lg"
              onClick={() => {
                addLine(item, qty, selectedAddOns, mealdeal);
                setQty(1);
                setSelectedAddOns([]);
              }}
            >
              Add to order
            </Button>
            <Button variant="whatsapp" size="lg" onClick={onWhatsApp}>
              WhatsApp
            </Button>
          </div>

          {/* Mobile: combined Add (price baked in) + WA icon */}
          <button
            onClick={() => {
              addLine(item, qty, selectedAddOns, mealdeal);
              setQty(1);
              setSelectedAddOns([]);
            }}
            className="flex flex-1 items-center justify-between gap-2 rounded-full bg-mustard px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-charcoal shadow-md transition-all hover:bg-mustard-600 active:scale-[0.98] sm:hidden"
          >
            <span>Add</span>
            <span className="font-display text-lg normal-case tracking-normal">
              {formatNpr(total)}
            </span>
          </button>
          <button
            onClick={onWhatsApp}
            aria-label="Order on WhatsApp"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#25D366] text-white shadow-md transition hover:bg-[#1ebe57] active:scale-[0.98] sm:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M19.05 4.91A10 10 0 0 0 12 2C6.5 2 2 6.5 2 12c0 1.78.47 3.45 1.27 4.9L2 22l5.25-1.38A10 10 0 0 0 12 22c5.5 0 10-4.5 10-10 0-2.67-1.04-5.18-2.95-7.09ZM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.12.82.84-3.04-.2-.31A8.13 8.13 0 1 1 20.13 12c0 4.49-3.65 8.13-8.13 8.13Zm4.45-6.08c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.65 1.97.86 2.37.69 2.8.65.42-.04 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function MealdealToggle({
  item,
  value,
  onChange,
}: {
  item: MenuItem;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="rounded-2xl border-2 border-charcoal/10 bg-cream p-1">
      <div className="grid grid-cols-2 gap-1">
        <ToggleOption
          active={!value}
          onClick={() => onChange(false)}
          title="Just the item"
          price={item.price}
          subtitle="À la carte"
        />
        <ToggleOption
          active={value}
          onClick={() => onChange(true)}
          title="Mealdeal"
          price={item.mealdealPrice!}
          subtitle={`+ ${config.mealdealIncludes}`}
          highlight
        />
      </div>
    </div>
  );
}

function ToggleOption({
  active,
  onClick,
  title,
  subtitle,
  price,
  highlight,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
  price: number;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex min-w-0 flex-col items-start gap-0.5 rounded-xl px-3 py-2.5 text-left transition-all sm:gap-1 sm:px-4 sm:py-3",
        active
          ? "bg-charcoal text-cream shadow-md"
          : "bg-transparent text-charcoal/70 hover:bg-cream-200",
      )}
    >
      <span className="flex w-full items-center gap-1 truncate font-display text-sm tracking-wide sm:text-base">
        <span className="truncate">{title}</span>
        {highlight && (
          <span
            className={cn(
              "ml-auto hidden rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest sm:inline-block",
              active ? "bg-sunshine text-charcoal" : "bg-mustard text-charcoal",
            )}
          >
            +Combo
          </span>
        )}
      </span>
      <span className="line-clamp-1 text-[9px] uppercase tracking-widest opacity-70 sm:text-[10px]">
        {subtitle}
      </span>
      <span className="font-display text-lg sm:text-xl">{formatNpr(price)}</span>
    </button>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <h3 className="font-display text-xl text-charcoal">{title}</h3>
        {subtitle && (
          <span className="text-[10px] uppercase tracking-widest text-charcoal/45">
            {subtitle}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function QtyStepper({
  qty,
  setQty,
}: {
  qty: number;
  setQty: (n: number) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-charcoal/15 bg-cream p-1">
      <button
        onClick={() => setQty(Math.max(1, qty - 1))}
        className="grid h-9 w-9 place-items-center rounded-full text-charcoal hover:bg-charcoal/10"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-7 text-center font-display text-lg">{qty}</span>
      <button
        onClick={() => setQty(qty + 1)}
        className="grid h-9 w-9 place-items-center rounded-full bg-charcoal text-cream hover:bg-charcoal-800"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function BurgerLayers({ layers }: { layers: string[] }) {
  const colorFor = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("top bun") || n.includes("bottom bun") || n.includes("bun"))
      return "bg-[#e3a96b] text-charcoal";
    if (n.includes("cheese")) return "bg-mustard text-charcoal";
    if (n.includes("bacon")) return "bg-[#a52a2a] text-cream";
    if (
      n.includes("patty") ||
      n.includes("chicken") ||
      n.includes("pork") ||
      n.includes("sekuwa") ||
      n.includes("paneer") ||
      n.includes("tikki")
    )
      return "bg-[#6b3a1f] text-cream";
    if (
      n.includes("sauce") ||
      n.includes("mayo") ||
      n.includes("achar") ||
      n.includes("chutney") ||
      n.includes("glaze") ||
      n.includes("mustard")
    )
      return "bg-tomato text-cream";
    if (
      n.includes("lettuce") ||
      n.includes("slaw") ||
      n.includes("romaine") ||
      n.includes("coriander")
    )
      return "bg-[#5b8a3a] text-cream";
    if (n.includes("tomato") || n.includes("pickle"))
      return "bg-[#a52a2a] text-cream";
    if (n.includes("onion")) return "bg-[#dfb6c2] text-charcoal";
    return "bg-charcoal-700 text-cream";
  };

  const sizeFor = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("top bun")) return "rounded-t-[36px] rounded-b-md h-9 mx-2";
    if (n.includes("bottom bun"))
      return "rounded-b-[28px] rounded-t-md h-8 mx-2";
    if (
      n.includes("patty") ||
      n.includes("chicken") ||
      n.includes("pork") ||
      n.includes("sekuwa") ||
      n.includes("paneer") ||
      n.includes("tikki")
    )
      return "rounded-md h-8";
    return "rounded-sm h-6 mx-1";
  };

  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-charcoal/5 p-3">
      {layers.map((layer, idx) => (
        <div
          key={`${layer}-${idx}`}
          className={`flex items-center justify-center text-[11px] font-bold uppercase tracking-wider shadow-sm ${colorFor(
            layer,
          )} ${sizeFor(layer)}`}
        >
          {layer}
        </div>
      ))}
    </div>
  );
}
