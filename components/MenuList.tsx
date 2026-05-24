"use client";

import * as React from "react";
import { Search, Sparkles } from "lucide-react";
import { menu, type Category, type MenuItem } from "@/data/menu";
import { config } from "@/data/config";
import { formatNpr, cn } from "@/lib/utils";
import { getKitchenStatus, type KitchenStatus } from "@/lib/hours";
import { VegDot } from "@/components/VegDot";

const sectionOrder: { id: Category; label: string }[] = [
  { id: "buff", label: "Buff Burgers" },
  { id: "chicken", label: "Chicken Burgers" },
  { id: "pork", label: "Pork" },
  { id: "rolls", label: "Rolls" },
  { id: "combo", label: "Family & Combos" },
];

export function MenuList({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (item: MenuItem) => void;
}) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<KitchenStatus | null>(null);

  React.useEffect(() => {
    setStatus(getKitchenStatus());
    const id = setInterval(() => setStatus(getKitchenStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  const q = query.trim().toLowerCase();
  const grouped = sectionOrder
    .map((sec) => ({
      ...sec,
      items: menu.filter((m) => {
        if (m.category !== sec.id) return false;
        if (!q) return true;
        return (
          m.name.toLowerCase().includes(q) ||
          m.shortDesc.toLowerCase().includes(q) ||
          m.ingredients.some((i) => i.toLowerCase().includes(q))
        );
      }),
    }))
    .filter((s) => s.items.length > 0);

  const hasAnyMealdeal = grouped.some((s) =>
    s.items.some((it) => Boolean(it.mealdealPrice)),
  );

  return (
    <aside className="relative flex h-full flex-col overflow-hidden bg-mustard text-charcoal">
      <div
        className="pointer-events-none absolute inset-0 bg-grain opacity-25"
        aria-hidden
      />

      {/* Hero brand block */}
      <div className="relative shrink-0 px-5 pt-5 sm:px-8 sm:pt-8">
        <h1
          className="font-display leading-[0.82] tracking-tight text-charcoal"
          style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)" }}
        >
          {config.brandName.split(" ")[0]}
          <span className="block text-cream drop-shadow-[2px_2px_0_rgba(26,22,20,0.5)]">
            BURGER
          </span>
        </h1>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/75">
          <span>
            {config.hours.open}–{config.hours.close}
          </span>
          {status && (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 tracking-[0.18em]",
                status.isOpen
                  ? "bg-emerald-700 text-cream"
                  : "bg-charcoal text-cream",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  status.isOpen ? "bg-cream animate-pulse" : "bg-cream/60",
                )}
              />
              {status.label}
            </span>
          )}
        </div>

        {/* Family pack feature card */}
        <FamilyPackCard
          onClick={() => {
            const fp = menu.find((m) => m.id === "family-pack");
            if (fp) onSelect(fp);
          }}
          isActive={activeId === "family-pack"}
        />

        {/* Search */}
        <label className="mt-4 flex items-center gap-2 rounded-full border border-charcoal/30 bg-mustard-600/40 px-4 py-2 text-sm focus-within:border-charcoal focus-within:bg-charcoal/10">
          <Search className="h-4 w-4 text-charcoal/60" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the menu…"
            className="flex-1 bg-transparent text-charcoal placeholder:text-charcoal/50 focus:outline-none"
          />
        </label>

        {hasAnyMealdeal && (
          <div className="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal/65">
            <span>Note: each mealdeal has {config.mealdealIncludes}.</span>
            <span className="rounded-full bg-charcoal px-2 py-0.5 text-cream">
              Mealdeal
            </span>
          </div>
        )}
      </div>

      {/* Scrollable list */}
      <div className="relative mt-4 flex-1 overflow-y-auto px-5 pb-6 sm:px-8">
        {grouped.length === 0 ? (
          <p className="py-12 text-center text-sm text-charcoal/60">
            Nothing matches "{query}".
          </p>
        ) : (
          <div className="space-y-6">
            {grouped
              .filter((s) => s.id !== "combo")
              .map((section) => (
                <section key={section.id}>
                  <h2 className="mb-2 font-display text-xl tracking-wider">
                    <span className="border-b-2 border-charcoal pb-0.5 pr-1">
                      {section.label.toUpperCase()}
                    </span>
                  </h2>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <MenuRow
                        key={item.id}
                        item={item}
                        active={item.id === activeId}
                        onClick={() => onSelect(item)}
                      />
                    ))}
                  </ul>
                </section>
              ))}
          </div>
        )}
      </div>

      {/* Footer block */}
      <div className="relative shrink-0 border-t border-charcoal/15 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-charcoal/65 sm:px-8">
        Delivers to {config.deliveryZones.slice(0, 2).join(", ")}+ · ~
        {config.etaMinutes} min · Min Rs. {config.minOrder}
      </div>
    </aside>
  );
}

function MenuRow({
  item,
  active,
  onClick,
}: {
  item: MenuItem;
  active: boolean;
  onClick: () => void;
}) {
  const hasMealdeal = Boolean(item.mealdealPrice);

  return (
    <li>
      <button
        onClick={onClick}
        className={cn(
          "group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-all",
          active
            ? "bg-charcoal text-cream shadow-lg"
            : "hover:bg-charcoal/10",
        )}
      >
        <VegDot isVeg={item.isVeg} />
        <span className="min-w-0 flex-1 leading-tight">
          <span
            className={cn(
              "block truncate font-display text-base tracking-wide",
              active ? "text-cream" : "text-charcoal",
            )}
          >
            {item.name}
          </span>
          {(item.isBestseller || item.isNew) && (
            <span
              className={cn(
                "text-[9px] font-bold uppercase tracking-[0.15em]",
                active ? "text-sunshine" : "text-tomato",
              )}
            >
              {item.isBestseller && "★ Bestseller"}
              {item.isBestseller && item.isNew && " · "}
              {item.isNew && "New"}
            </span>
          )}
        </span>

        <PriceCol label="Base" value={item.price} active={active} />
        {hasMealdeal ? (
          <PriceCol
            label="Mealdeal"
            value={item.mealdealPrice!}
            active={active}
            accent
          />
        ) : item.comesWithCombo ? (
          <span
            className={cn(
              "shrink-0 self-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em]",
              active
                ? "bg-sunshine text-charcoal"
                : "bg-charcoal text-cream",
            )}
          >
            Combo
          </span>
        ) : (
          <span className="w-[60px] shrink-0" aria-hidden />
        )}
      </button>
    </li>
  );
}

function PriceCol({
  label,
  value,
  active,
  accent,
}: {
  label: string;
  value: number;
  active: boolean;
  accent?: boolean;
}) {
  return (
    <span className="flex w-[60px] shrink-0 flex-col items-end leading-tight sm:w-[78px]">
      <span
        className={cn(
          "text-[8px] font-bold uppercase tracking-[0.15em]",
          active ? "text-cream/55" : "text-charcoal/45",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "font-display tabular-nums text-[13px] sm:text-[15px]",
          accent
            ? active
              ? "text-sunshine"
              : "text-charcoal"
            : active
              ? "text-cream"
              : "text-charcoal/80",
        )}
      >
        {formatNpr(value).replace("Rs. ", "")}
      </span>
    </span>
  );
}

function FamilyPackCard({
  onClick,
  isActive,
}: {
  onClick: () => void;
  isActive: boolean;
}) {
  const fp = config.familyPack;
  return (
    <button
      onClick={onClick}
      className={cn(
        "mt-5 flex w-full items-stretch gap-3 rounded-2xl border-2 border-charcoal bg-sunshine p-3 text-left shadow-[3px_3px_0_0_rgba(26,22,20,0.85)] transition-transform hover:-translate-y-0.5",
        isActive && "translate-x-0.5 translate-y-0.5 shadow-none",
      )}
    >
      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-cream text-3xl">
        🍔
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-display text-lg uppercase leading-none tracking-wide text-charcoal">
            {fp.title}
          </p>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-tomato text-[9px] font-bold uppercase text-cream">
            -{fp.discountPct}%
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-[10px] font-semibold uppercase tracking-wider text-charcoal/75">
          {fp.includes.slice(0, 3).join(" · ")}…
        </p>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[11px] font-bold text-charcoal/60 line-through">
            Rs. {fp.originalPrice}
          </span>
          <span className="font-display text-xl text-charcoal">
            Rs. {fp.price}
          </span>
          <Sparkles className="h-3.5 w-3.5 text-tomato" />
        </div>
      </div>
    </button>
  );
}
