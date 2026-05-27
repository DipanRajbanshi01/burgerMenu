"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { config } from "@/data/config";
import { useOrder } from "@/context/OrderContext";
import {
  buildOrderMessage,
  orderCount,
  orderTotal,
  whatsappUrl,
} from "@/lib/whatsapp";
import { formatNpr } from "@/lib/utils";

export function Header({ onGoHome }: { onGoHome?: () => void }) {
  const { lines, openDrawer } = useOrder();
  const count = orderCount(lines);
  const total = orderTotal(lines);

  return (
    <header className="sticky top-0 z-40 h-14 shrink-0 border-b border-charcoal/10 bg-cream/90 backdrop-blur-md sm:h-16">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-2 px-3 sm:gap-4 sm:px-8">
        <button
          type="button"
          onClick={onGoHome}
          aria-label={`${config.brandName} — back to menu`}
          className="flex items-center gap-2 rounded-full transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-charcoal font-display text-base text-mustard shadow-md sm:h-10 sm:w-10">
            Jy
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className="font-display text-base text-charcoal sm:text-lg">
              {config.brandName}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-charcoal/50 sm:block">
              Cloud kitchen · Kathmandu
            </span>
          </span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            asChild
            variant="whatsapp"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <a
              href={whatsappUrl(buildOrderMessage(lines))}
              target="_blank"
              rel="noopener noreferrer"
            >
              Order on WhatsApp
            </a>
          </Button>
          <button
            onClick={openDrawer}
            className="group relative inline-flex h-10 items-center gap-2 rounded-full border border-charcoal/15 bg-cream pl-2 pr-3 text-sm font-bold uppercase tracking-wide text-charcoal shadow-sm transition hover:border-charcoal/30 hover:shadow-md sm:h-11 sm:pl-3 sm:pr-4"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-charcoal text-cream">
              <ShoppingBag className="h-3.5 w-3.5" />
            </span>
            <span className="hidden sm:inline">My Order</span>
            {count > 0 && (
              <>
                <span className="ml-1 hidden text-charcoal/40 sm:inline">·</span>
                <span className="hidden font-display text-base text-charcoal sm:inline">
                  {formatNpr(total)}
                </span>
                <span className="absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-tomato px-1 text-[10px] font-bold text-cream shadow">
                  {count}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
