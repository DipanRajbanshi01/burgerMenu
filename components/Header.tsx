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

export function Header() {
  const { lines, openDrawer } = useOrder();
  const count = orderCount(lines);
  const total = orderTotal(lines);

  return (
    <header className="sticky top-0 z-40 h-16 shrink-0 border-b border-charcoal/10 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-charcoal font-display text-base text-mustard shadow-md">
            Jy
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-lg text-charcoal">
              {config.brandName}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/50">
              Cloud kitchen · Kathmandu
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button asChild variant="whatsapp" size="sm" className="hidden sm:inline-flex">
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
            className="group relative inline-flex h-11 items-center gap-2 rounded-full border border-charcoal/15 bg-cream px-3 pr-4 text-sm font-bold uppercase tracking-wide text-charcoal shadow-sm transition hover:border-charcoal/30 hover:shadow-md sm:px-4"
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
