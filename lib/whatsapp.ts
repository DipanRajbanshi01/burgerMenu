import { config } from "@/data/config";
import type { OrderLine } from "@/context/OrderContext";
import { formatNpr } from "@/lib/utils";

export function effectiveUnitPrice(line: OrderLine): number {
  const base =
    line.mealdeal && line.item.mealdealPrice
      ? line.item.mealdealPrice
      : line.item.price;
  const addOnsTotal = line.addOns.reduce((sum, a) => sum + a.price, 0);
  return base + addOnsTotal;
}

export function lineSubtotal(line: OrderLine): number {
  return effectiveUnitPrice(line) * line.qty;
}

export function orderTotal(lines: OrderLine[]): number {
  return lines.reduce((sum, line) => sum + lineSubtotal(line), 0);
}

export function orderCount(lines: OrderLine[]): number {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}

export function buildOrderMessage(lines: OrderLine[]): string {
  if (lines.length === 0) {
    return `Hi ${config.brandName}! I'd like to place an order.`;
  }

  const intro = `Hi ${config.brandName}! I'd like to order:`;
  const body = lines
    .map((line) => {
      const tag = line.mealdeal ? " [Mealdeal]" : "";
      const addOns =
        line.addOns.length > 0
          ? ` (${line.addOns.map((a) => a.name).join(", ")})`
          : "";
      return `• ${line.qty} × ${line.item.name}${tag}${addOns} — ${formatNpr(
        lineSubtotal(line),
      )}`;
    })
    .join("\n");
  const total = orderTotal(lines);

  const footer = [
    "",
    `Total: ${formatNpr(total)}`,
    "",
    "Name: ",
    "Delivery address: ",
    "Notes: ",
  ].join("\n");

  return `${intro}\n${body}\n${footer}`;
}

export function whatsappUrl(message: string, number = config.whatsapp): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
