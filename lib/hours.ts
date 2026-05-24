import { config } from "@/data/config";

function parseHM(hm: string): { h: number; m: number } {
  const [h, m] = hm.split(":").map(Number);
  return { h, m };
}

function minutesNow(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

function minutesOf(hm: string): number {
  const { h, m } = parseHM(hm);
  return h * 60 + m;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function formatClock(hm: string): string {
  const { h, m } = parseHM(hm);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}:${pad(m)} ${period}`;
}

export interface KitchenStatus {
  isOpen: boolean;
  label: string;
  helper: string;
}

export function getKitchenStatus(now: Date = new Date()): KitchenStatus {
  const open = minutesOf(config.hours.open);
  const close = minutesOf(config.hours.close);
  const cur = minutesNow(now);
  const isOpen = cur >= open && cur < close;

  if (isOpen) {
    return {
      isOpen: true,
      label: "Open now",
      helper: `Closes at ${formatClock(config.hours.close)}`,
    };
  }
  return {
    isOpen: false,
    label: "Closed",
    helper:
      cur < open
        ? `Opens at ${formatClock(config.hours.open)}`
        : `Opens tomorrow at ${formatClock(config.hours.open)}`,
  };
}
