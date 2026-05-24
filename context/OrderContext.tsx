"use client";

import * as React from "react";
import type { AddOn, MenuItem } from "@/data/menu";

export interface OrderLine {
  lineId: string;
  item: MenuItem;
  qty: number;
  addOns: AddOn[];
  /** True when the customer picked the +fries+drink price tier. */
  mealdeal: boolean;
}

interface OrderContextValue {
  lines: OrderLine[];
  addLine: (
    item: MenuItem,
    qty: number,
    addOns: AddOn[],
    mealdeal: boolean,
  ) => void;
  updateQty: (lineId: string, qty: number) => void;
  removeLine: (lineId: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const OrderContext = React.createContext<OrderContextValue | null>(null);

function makeLineId(
  item: MenuItem,
  addOns: AddOn[],
  mealdeal: boolean,
): string {
  const addOnKey = addOns
    .map((a) => a.name)
    .sort()
    .join("|");
  return `${item.id}::${mealdeal ? "md" : "base"}::${addOnKey}`;
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = React.useState<OrderLine[]>([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const addLine = React.useCallback(
    (item: MenuItem, qty: number, addOns: AddOn[], mealdeal: boolean) => {
      if (qty <= 0) return;
      const effectiveMealdeal = mealdeal && Boolean(item.mealdealPrice);
      const lineId = makeLineId(item, addOns, effectiveMealdeal);
      setLines((prev) => {
        const existing = prev.find((l) => l.lineId === lineId);
        if (existing) {
          return prev.map((l) =>
            l.lineId === lineId ? { ...l, qty: l.qty + qty } : l,
          );
        }
        return [
          ...prev,
          { lineId, item, qty, addOns, mealdeal: effectiveMealdeal },
        ];
      });
    },
    [],
  );

  const updateQty = React.useCallback((lineId: string, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => l.lineId !== lineId);
      return prev.map((l) => (l.lineId === lineId ? { ...l, qty } : l));
    });
  }, []);

  const removeLine = React.useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  }, []);

  const clear = React.useCallback(() => setLines([]), []);
  const openDrawer = React.useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = React.useCallback(() => setDrawerOpen(false), []);

  const value = React.useMemo(
    () => ({
      lines,
      addLine,
      updateQty,
      removeLine,
      clear,
      drawerOpen,
      openDrawer,
      closeDrawer,
    }),
    [
      lines,
      addLine,
      updateQty,
      removeLine,
      clear,
      drawerOpen,
      openDrawer,
      closeDrawer,
    ],
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = React.useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
