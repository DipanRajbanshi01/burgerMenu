"use client";

import * as React from "react";
import { Header } from "@/components/Header";
import { MenuList } from "@/components/MenuList";
import { ItemShowcase } from "@/components/ItemShowcase";
import { OrderBar } from "@/components/OrderBar";
import { menu, type MenuItem } from "@/data/menu";

export default function Page() {
  const [activeId, setActiveId] = React.useState<string>(menu[0].id);
  const showcaseRef = React.useRef<HTMLDivElement>(null);

  const activeItem: MenuItem =
    menu.find((m) => m.id === activeId) ?? menu[0];

  const handleSelect = (item: MenuItem) => {
    setActiveId(item.id);
    if (window.matchMedia("(max-width: 767px)").matches) {
      requestAnimationFrame(() => {
        showcaseRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />

      <main className="flex-1 md:grid md:h-[calc(100vh-4rem)] md:grid-cols-[minmax(300px,38%)_1fr] md:overflow-hidden">
        <div className="h-[60vh] md:h-full">
          <MenuList activeId={activeId} onSelect={handleSelect} />
        </div>
        <div ref={showcaseRef} className="h-full md:overflow-hidden">
          <ItemShowcase item={activeItem} />
        </div>
      </main>

      <OrderBar />
    </div>
  );
}
