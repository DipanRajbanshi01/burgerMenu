"use client";

import { Minus, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/context/OrderContext";
import {
  buildOrderMessage,
  lineSubtotal,
  orderCount,
  orderTotal,
  whatsappUrl,
} from "@/lib/whatsapp";
import { config } from "@/data/config";
import { formatNpr } from "@/lib/utils";

export function OrderBar() {
  const {
    lines,
    updateQty,
    removeLine,
    clear,
    drawerOpen,
    closeDrawer,
  } = useOrder();

  const count = orderCount(lines);
  const total = orderTotal(lines);
  const underMin = total < config.minOrder;

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 animate-fade-in" role="dialog" aria-modal>
      <div
        className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
        onClick={closeDrawer}
      />
      <div className="absolute inset-x-0 bottom-0 flex max-h-[90vh] flex-col rounded-t-3xl border-t border-charcoal/10 bg-cream shadow-2xl animate-slide-up sm:inset-y-0 sm:right-0 sm:left-auto sm:max-h-none sm:w-full sm:max-w-md sm:rounded-l-3xl sm:rounded-tr-none">
        <div className="flex shrink-0 items-center justify-between border-b border-charcoal/10 px-5 py-4">
          <div>
            <h3 className="font-display text-2xl">My Order</h3>
            <p className="text-xs text-charcoal/55">
              {count === 0
                ? "Pick something from the menu."
                : "Confirm details on WhatsApp."}
            </p>
          </div>
          <button
            onClick={closeDrawer}
            className="grid h-9 w-9 place-items-center rounded-full bg-charcoal/10 text-charcoal hover:bg-charcoal/15"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {count === 0 ? (
          <div className="grid flex-1 place-items-center px-6 py-16 text-center">
            <div>
              <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-mustard/30 text-4xl">
                🍔
              </div>
              <p className="font-display text-xl text-charcoal">
                Your order is empty.
              </p>
              <p className="mt-1 text-sm text-charcoal/55">
                Tap any item on the left to add it.
              </p>
              <Button
                onClick={closeDrawer}
                variant="mustard"
                className="mt-6"
              >
                Browse the menu
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-charcoal/10 overflow-y-auto px-2">
              {lines.map((line) => (
                <li
                  key={line.lineId}
                  className="flex items-start gap-3 px-3 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-charcoal">
                      {line.item.name}
                    </p>
                    {line.mealdeal && (
                      <p className="text-[10px] font-bold uppercase tracking-widest text-mustard-600">
                        Mealdeal
                      </p>
                    )}
                    {line.addOns.length > 0 && (
                      <p className="mt-1 text-xs text-charcoal/65">
                        + {line.addOns.map((a) => a.name).join(", ")}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-semibold text-charcoal">
                      {formatNpr(lineSubtotal(line))}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="inline-flex items-center gap-1 rounded-full border border-charcoal/15 bg-cream p-0.5">
                      <button
                        onClick={() => updateQty(line.lineId, line.qty - 1)}
                        className="grid h-7 w-7 place-items-center rounded-full hover:bg-charcoal/10"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-5 text-center font-display text-sm">
                        {line.qty}
                      </span>
                      <button
                        onClick={() => updateQty(line.lineId, line.qty + 1)}
                        className="grid h-7 w-7 place-items-center rounded-full bg-mustard text-charcoal hover:bg-mustard-600"
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeLine(line.lineId)}
                      className="text-[11px] uppercase tracking-wide text-charcoal/45 hover:text-tomato"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="shrink-0 border-t border-charcoal/10 bg-cream-200/70 px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm uppercase tracking-widest text-charcoal/55">
                  Total
                </span>
                <span className="font-display text-2xl">
                  {formatNpr(total)}
                </span>
              </div>
              {underMin && (
                <p className="mb-3 rounded-lg bg-mustard/30 px-3 py-2 text-xs text-charcoal/80">
                  Add {formatNpr(config.minOrder - total)} more to reach the
                  Rs. {config.minOrder} minimum order.
                </p>
              )}
              <div className="flex gap-2">
                <Button variant="outline" onClick={clear} className="flex-none">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button asChild variant="whatsapp" className="flex-1">
                  <a
                    href={whatsappUrl(buildOrderMessage(lines))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Send order on WhatsApp
                  </a>
                </Button>
              </div>
              <p className="mt-3 text-center text-[11px] text-charcoal/50">
                You'll confirm name &amp; address in the WhatsApp chat.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
