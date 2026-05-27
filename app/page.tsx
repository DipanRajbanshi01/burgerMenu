"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { MenuList } from "@/components/MenuList";
import { ItemShowcase } from "@/components/ItemShowcase";
import { OrderBar } from "@/components/OrderBar";
import { useOrder } from "@/context/OrderContext";
import { menu, type MenuItem } from "@/data/menu";

export default function Page() {
  const { closeDrawer } = useOrder();
  const [activeId, setActiveId] = React.useState<string>(menu[0].id);
  const [itemOpen, setItemOpen] = React.useState(false);

  const activeItem: MenuItem =
    menu.find((m) => m.id === activeId) ?? menu[0];

  const handleSelect = (item: MenuItem) => {
    setActiveId(item.id);
    // The full-screen item overlay only exists on mobile. On desktop the
    // showcase is already visible in the side-by-side grid, so we keep
    // itemOpen=false — otherwise the body-scroll-lock effect below would
    // lock desktop scrolling on the first tap and never release it.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches
    ) {
      setItemOpen(true);
    }
  };

  const handleGoHome = () => {
    setItemOpen(false);
    setActiveId(menu[0].id);
    closeDrawer();

    // Scroll the window and every internal scroller back to the top.
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    document
      .querySelectorAll<HTMLElement>(
        "[data-menu-scroll], [data-showcase-scroll]",
      )
      .forEach((el) => el.scrollTo({ top: 0, behavior: "smooth" }));
  };

  // Lock body scroll while the mobile item overlay is open
  React.useEffect(() => {
    if (itemOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [itemOpen]);

  // Close the overlay automatically if the viewport crosses into desktop mode
  React.useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setItemOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header onGoHome={handleGoHome} />

      <main className="flex-1 md:grid md:h-[calc(100vh-4rem)] md:grid-cols-[minmax(300px,38%)_1fr] md:overflow-hidden">
        {/* Menu — always rendered. On mobile this is the default view. */}
        <div className="h-[calc(100vh-3.5rem)] md:h-full">
          <MenuList activeId={activeId} onSelect={handleSelect} />
        </div>

        {/* Desktop showcase — side-by-side with the menu on md+.
            Keying on activeItem.id forces a remount per item so the
            showcase always opens at the photo, never at the previous
            item's scroll position. */}
        <div className="hidden md:block md:h-full md:overflow-hidden">
          <ItemShowcase key={activeItem.id} item={activeItem} />
        </div>
      </main>

      {/* Mobile item overlay — slides up over the menu when an item is tapped */}
      {itemOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-14 z-30 flex animate-sheet-up flex-col bg-cream shadow-2xl md:hidden"
          role="dialog"
          aria-modal
          aria-label={activeItem.name}
        >
          <div className="flex h-12 shrink-0 items-center gap-3 border-b border-charcoal/10 bg-cream/95 px-3 backdrop-blur">
            <button
              onClick={() => setItemOpen(false)}
              aria-label="Back to menu"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-charcoal pl-2 pr-3 text-cream shadow-sm transition hover:bg-charcoal-800 active:scale-[0.97]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wide">
                Menu
              </span>
            </button>
            <span className="truncate font-display text-base text-charcoal/85">
              {activeItem.name}
            </span>
          </div>
          <div className="min-h-0 flex-1">
            <ItemShowcase item={activeItem} />
          </div>
        </div>
      )}

      <OrderBar />
    </div>
  );
}
