"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Header } from "@/components/Header";
import { MenuList } from "@/components/MenuList";
import { ItemShowcase } from "@/components/ItemShowcase";
import { OrderBar } from "@/components/OrderBar";
import { menu, type MenuItem } from "@/data/menu";

export default function Page() {
  const [activeId, setActiveId] = React.useState<string>(menu[0].id);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const activeItem: MenuItem =
    menu.find((m) => m.id === activeId) ?? menu[0];

  const handleSelect = (item: MenuItem) => {
    setActiveId(item.id);
    setMenuOpen(false);
  };

  // Lock body scroll while the mobile menu sheet is open
  React.useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header onOpenMenu={() => setMenuOpen(true)} />

      <main className="flex-1 md:grid md:h-[calc(100vh-4rem)] md:grid-cols-[minmax(300px,38%)_1fr] md:overflow-hidden">
        {/* Desktop menu — always visible side-by-side */}
        <div className="hidden md:block md:h-full">
          <MenuList activeId={activeId} onSelect={handleSelect} />
        </div>

        {/* Showcase fills the rest (full-height on mobile and desktop) */}
        <div className="h-[calc(100vh-3.5rem)] md:h-full md:overflow-hidden">
          <ItemShowcase item={activeItem} />
        </div>
      </main>

      {/* Mobile menu sheet */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 animate-fade-in md:hidden"
          role="dialog"
          aria-modal
        >
          <div
            className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 top-12 flex flex-col overflow-hidden rounded-t-3xl shadow-2xl animate-slide-up">
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-charcoal/80 text-cream backdrop-blur transition hover:bg-charcoal"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="h-full overflow-hidden">
              <MenuList activeId={activeId} onSelect={handleSelect} />
            </div>
          </div>
        </div>
      )}

      <OrderBar />
    </div>
  );
}
